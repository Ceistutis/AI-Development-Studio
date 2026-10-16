#!/usr/bin/env node
// Run locally: node integrations/n8n/test-v0.4.cjs
// Unit/static tests only. They do NOT call n8n, GitHub, Notion or PostgreSQL.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const flow = JSON.parse(fs.readFileSync(path.join(__dirname, 'ads-notion-github-controlled-v0.4.json'),'utf8'));
const get = id => { const n=flow.nodes.find(n=>n.id===id); assert(n, 'Missing node '+id); return n; };
const execute = (id, input, refs={}) => new Function('$input','$',get(id).parameters.jsCode)(
  {first:()=>({json:input})}, name => ({first:()=>({json:refs[name]})})
);
const C='3f7bcc86-4422-8103-bb75-d08f6e7446f4';
const REPO='Ceistutis/AI-Development-Studio';
const edited='2026-10-12T23:38:00.000Z';
const prop=(type,value)=>({type,...(type==='url'?{url:value}:type==='select'?{select:{name:value}}:{[type]:[{plain_text:value}]})});
const page=(id,status,link='',objective='Objetivo claro')=>({
  id,last_edited_time:edited,properties:{
    'Briefing':prop('title','Website de teste'),
    'Status':prop('select',status),
    'Projeto':prop('rich_text','AI Development Studio'),
    'Objetivo':prop('rich_text',objective),
    'Critérios de aceite':prop('rich_text','Critérios definidos'),
    'Repositório':prop('url','https://github.com/'+REPO),
    'Issue GitHub':prop('url',link)
  }
});
const source={has_more:false,results:[
  page(C,'Aprovado'),
  page('3f7bcc86-4422-8133-bac3-f6172624b773','Aprovado','https://github.com/'+REPO+'/issues/999999'),
  page('3f7bcc86-4422-81c7-9c36-ef4420637da0','Pronto para triagem')
]};
const b=execute('candidate',source)[0].json;
assert.equal(b.notion_id,C);assert.equal(b.run_enabled,false);
assert(b.issue_body.includes('\n\nObjetivo:'));
assert(b.issue_body.endsWith('NOTION_BRIEFING_ID:'+C));
assert.equal(execute('candidate',{has_more:false,results:[]})[0].json.run_enabled,false);
assert.throws(()=>execute('candidate',{has_more:true,results:[]}),/paginação/i);
assert.throws(()=>execute('candidate',{has_more:false,results:[page(C,'Aprovado'),page('3f7bcc86-4422-8103-bb75-d08f6e7446f5','Aprovado')]}),/Mais de um/);
const ref={'Selecionar briefing aprovado':b};
function decision(status, acquired, issue_url=null) {
 return execute('decision',{repository:REPO,notion_id:C,acquired,status,issue_url},ref)[0].json;
}
assert.equal(decision('RESERVED',true).action,'CREATE');
assert.equal(decision('CREATE_STARTED',false).action,'HALT');
assert.equal(decision('RESERVED',false).action,'HALT');
assert.equal(decision('LINKED',false,'https://github.com/'+REPO+'/issues/12').action,'HALT');
assert.equal(decision('CREATED',false,'https://github.com/'+REPO+'/issues/12').action,'RECOVER_LINK');
assert.throws(()=>execute('search-check',{items:[],total_count:0,incomplete_results:true},ref),/incompleta/);
assert.throws(()=>execute('search-check',{items:[{body:'NOTION_BRIEFING_ID:'+C}],total_count:1,incomplete_results:false},ref),/já existe/);
assert.equal(execute('search-check',{items:[],total_count:0,incomplete_results:false},ref)[0].json.search_checked,true);
assert.equal(execute('revalidate',page(C,'Aprovado'),ref)[0].json.approved_now,true);
assert.throws(()=>execute('revalidate',{...page(C,'Aprovado'),last_edited_time:'2026-10-12T23:39:00.000Z'},ref),/alterado/);
assert.throws(()=>execute('revalidate',page(C,'Rejeitado'),ref),/alterado/);
assert.equal(flow.active,false);
assert.equal(flow.nodes.filter(n=>n.parameters.method==='POST'&&n.parameters.url?.endsWith('/issues')).length,1);
assert.equal(get('candidate').parameters.jsCode.includes('ENABLE_REAL_WRITES = false'),true);
assert.equal(flow.nodes.filter(n=>n.type==='n8n-nodes-base.postgres').length,5);
assert(flow.nodes.every(n=>!JSON.stringify(n).includes('ghp_')));
const names=new Set(flow.nodes.map(n=>n.name));
for(const [from,c] of Object.entries(flow.connections)) {
  assert(names.has(from),'Unknown edge source '+from);
  for(const targets of c.main) for(const e of targets) assert(names.has(e.node),'Unknown target '+e.node);
}
console.log('v0.4: unit/static checks passed (no external integration calls).');
