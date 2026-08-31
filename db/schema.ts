export const siteContentSchema = `
CREATE TABLE IF NOT EXISTS site_content (
  content_key TEXT PRIMARY KEY,
  content_value TEXT NOT NULL,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
)
`;
