'use client';

import { useEffect, useState } from 'react';
import { defaultSiteContent, mergeSiteContent, type ContentKey, type SiteContent } from '@/app/content';

const sections: { title: string; fields: { key: ContentKey; label: string; multiline?: boolean }[] }[] = [
  { title: 'Página inicial', fields: [
    { key: 'homeHeroTitle', label: 'Título principal' },
    { key: 'homeHeroLocation', label: 'Localidade' },
    { key: 'homeHeroDescription', label: 'Descrição', multiline: true },
  ] },
  { title: 'Catálogo', fields: [
    { key: 'catalogTitle', label: 'Título' },
    { key: 'catalogDescription', label: 'Descrição', multiline: true },
  ] },
  { title: 'Sobre nós', fields: [
    { key: 'aboutTitle', label: 'Título' },
    { key: 'aboutDescription', label: 'Descrição', multiline: true },
  ] },
  { title: 'Contato e horário', fields: [
    { key: 'contactTitle', label: 'Título de contato' },
    { key: 'contactDescription', label: 'Descrição de contato', multiline: true },
    { key: 'phone', label: 'Telefone' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'address', label: 'Endereço', multiline: true },
    { key: 'weekdayHours', label: 'Segunda a sexta' },
    { key: 'saturdayHours', label: 'Sábado' },
  ] },
];

export default function AdminEditor() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [status, setStatus] = useState('Carregando conteúdo…');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/site-content').then((response) => response.json()).then((result) => {
      setContent(mergeSiteContent(result.content));
      setStatus('');
    }).catch(() => setStatus('Não foi possível carregar o conteúdo agora.'));
  }, []);

  async function save() {
    setSaving(true);
    setStatus('Salvando alterações…');
    try {
      const response = await fetch('/api/site-content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Não foi possível salvar.');
      setContent(mergeSiteContent(result.content));
      setStatus('Alterações salvas e já publicadas no site.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Não foi possível salvar.');
    } finally { setSaving(false); }
  }

  return <main className="admin-page"><header className="admin-header"><a href="/">← Voltar ao site</a><span>Rafa Auto Peças</span></header><section className="admin-card"><p className="eyebrow"><span /> Edição do site</p><h1>Edite os textos publicados</h1><p>Altere os campos abaixo e clique em salvar. As mudanças aparecem imediatamente para os visitantes.</p>{sections.map((section) => <fieldset key={section.title}><legend>{section.title}</legend>{section.fields.map((field) => <label key={field.key}>{field.label}{field.multiline ? <textarea value={content[field.key]} rows={field.key.includes('Description') ? 4 : 2} onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))} /> : <input value={content[field.key]} onChange={(event) => setContent((current) => ({ ...current, [field.key]: event.target.value }))} />}</label>)}</fieldset>)}<div className="admin-save"><button type="button" className="whatsapp-button" disabled={saving} onClick={save}>{saving ? 'Salvando…' : 'Salvar alterações'}</button>{status && <p role="status">{status}</p>}</div></section></main>;
}
