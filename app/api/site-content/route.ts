import { env } from 'cloudflare:workers';
import { contentKeys, mergeSiteContent, type ContentKey } from '@/app/content';
import { siteContentSchema } from '@/db/schema';

export const dynamic = 'force-dynamic';

async function ensureTable() {
  await env.DB.prepare(siteContentSchema).run();
}

async function readContent() {
  await ensureTable();
  const result = await env.DB.prepare('SELECT content_key, content_value FROM site_content').all<{ content_key: string; content_value: string }>();
  const values: Record<string, string> = {};
  for (const row of result.results ?? []) values[row.content_key] = row.content_value;
  return mergeSiteContent(values);
}

export async function GET() {
  return Response.json({ content: await readContent() }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function PUT(request: Request) {
  const payload = await request.json().catch(() => null) as { content?: Record<string, unknown> } | null;
  if (!payload?.content) return Response.json({ error: 'Conteúdo inválido.' }, { status: 400 });

  const updates = contentKeys.flatMap((key) => {
    const value = payload.content?.[key];
    return typeof value === 'string' && value.trim().length <= 5000 ? [[key, value.trim()] as const] : [];
  });
  if (!updates.length) return Response.json({ error: 'Nenhum campo válido foi enviado.' }, { status: 400 });

  await ensureTable();
  await env.DB.batch(updates.map(([key, value]) => env.DB.prepare(
    'INSERT INTO site_content (content_key, content_value, updated_at) VALUES (?, ?, unixepoch()) ON CONFLICT(content_key) DO UPDATE SET content_value = excluded.content_value, updated_at = unixepoch()'
  ).bind(key as ContentKey, value)));
  return Response.json({ content: await readContent() }, { headers: { 'Cache-Control': 'no-store' } });
}
