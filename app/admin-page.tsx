import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminEditor from './editor';

export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'flavia.panegossi@gmail.com';

export default async function AdminPage() {
  const requestHeaders = await headers();
  const email = requestHeaders.get('oai-authenticated-user-email')?.toLowerCase();
  if (!email) redirect('/signin-with-chatgpt?return_to=/admin');
  if (email !== ADMIN_EMAIL) return <main className="admin-page"><section className="admin-card"><p className="eyebrow"><span /> Área restrita</p><h1>Esta conta não tem acesso à edição.</h1><p>Entre com a conta que administra este site.</p></section></main>;
  return <AdminEditor />;
}
