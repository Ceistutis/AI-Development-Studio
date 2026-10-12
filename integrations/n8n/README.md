# ADS — Notion → GitHub Dry Run v0.3

## Escopo
Workflow **somente leitura**. Importação do JSON em `integrations/n8n/ads-notion-github-dry-run-v0.3.json`. Não altera Notion, não cria issues, não executa commits, e não substitui Intake v0.1 ou Approval Gate v0.2.

## Importar e configurar no n8n
1. n8n → Workflows → Import from File; selecione o arquivo JSON.
2. Abra `Notion — Read Source` e selecione a credencial OAuth2 **Notion account**. O nó usa HTTP Request com autenticação predefinida `notionOAuth2Api`; caso a instância não aceite esse tipo de credencial em HTTP Request, adapte o nó para o node nativo Notion que já funciona na v0.2, preservando a saída de API `{results:[...]}` ou use uma credencial segura compatível.
3. Abra `GitHub — Search marker (read only)` e selecione a credencial GitHub já configurada. O node usa `githubApi`; se indisponível em HTTP Request, utilize uma credencial HTTP autorizada, sem expor tokens em campos fixos.
4. Execute **manualmente**. Não ative o workflow para execução recorrente.
5. Confirme a URL da data source Notion (`b0b01fc0-30d3-49cf-9b4e-1d60a9d8476d`), o repositório autorizado (`Ceistutis/AI-Development-Studio`) e a versão da API Notion (`2025-09-03`).

## Regras
- Só processa `Status == Aprovado`, todos os campos mínimos presentes, repositório autorizado e `Issue GitHub` vazio.
- Consulta issues por marcador exato `NOTION_BRIEFING_ID:<uuid>` no corpo; ignora PRs.
- Emite `SIMULACAO_PRONTA` ou `BLOQUEADO_ISSUE_EXISTENTE` e proposta de título/corpo. Não cria issue.
- Se não há elegíveis, emite resumo.
- A leitura consulta no máximo 100 páginas de Notion por execução. **Se houver paginação** (`has_more: true`) o workflow **não cobre todos os registros**; implementar paginação antes de produção.
- A busca de issues do GitHub pode apresentar atraso de indexação, e não é barreira de idempotência atômica. **Não habilitar escrita com base apenas nela**.

## Critérios de aceite
- Um aprovado completo e não vinculado recebe `SIMULACAO_PRONTA`.
- Um aprovado já vinculado é bloqueado antes de consultar GitHub.
- Pendentes, rejeitados e registros incompletos não geram requisições GitHub.
- Nenhum node usa POST/PUT/PATCH/DELETE no GitHub, nem POST de mutação no Notion (o POST para `/query` é leitura).
- Falhas de autenticação/API encerram execução em erro, sem avançar.

## Antes de v0.4 com escrita
Implementar verificação de concorrência/lock por Notion Page ID, checagem de existência real da issue, paginação, recuperação de falhas após criação, atualização idempotente do vínculo no Notion, e executar testes controlados com aprovação humana. Revisar compatibilidade dos nós do workflow com a versão específica do n8n. **Este JSON não foi importado nem testado na sua instância do n8n.**
