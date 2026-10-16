-- AI Development Studio v0.4: execute ONCE with a PostgreSQL administrator.
-- Use a separate durable PostgreSQL database/schema. Do not treat the GitHub search index as an atomic lock.
CREATE TABLE IF NOT EXISTS public.ads_issue_ledger (
    repository      text        NOT NULL CHECK (repository = 'Ceistutis/AI-Development-Studio'),
    notion_id       uuid        NOT NULL,
    notion_edited_at timestamptz NOT NULL,
    status          text        NOT NULL CHECK (status IN ('RESERVED', 'CREATE_STARTED', 'CREATED', 'LINKED')),
    issue_url       text,
    issue_number    integer,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (repository, notion_id),
    CONSTRAINT ads_issue_lifecycle_check CHECK (
      (status IN ('RESERVED', 'CREATE_STARTED') AND issue_url IS NULL AND issue_number IS NULL)
      OR
      (status IN ('CREATED', 'LINKED') AND issue_url IS NOT NULL AND issue_number IS NOT NULL)
    ),
    CONSTRAINT ads_issue_url_format_check CHECK (
      issue_url IS NULL OR issue_url ~ '^https://github[.]com/Ceistutis/AI-Development-Studio/issues/[0-9]+$'
    )
);
CREATE UNIQUE INDEX IF NOT EXISTS ads_issue_ledger_url_unique
  ON public.ads_issue_ledger(issue_url) WHERE issue_url IS NOT NULL;

-- After creating a dedicated restricted DB role, grant only:
-- GRANT USAGE ON SCHEMA public TO ads_n8n;
-- GRANT SELECT, INSERT, UPDATE ON public.ads_issue_ledger TO ads_n8n;
-- Do not grant DELETE to the workflow credential.
