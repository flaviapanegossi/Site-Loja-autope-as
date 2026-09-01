import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="eyebrow"><span /> Rafa Auto Peças</p>
      <h1>Página não encontrada.</h1>
      <p>O endereço acessado não existe ou foi movido. Volte ao início para continuar encontrando peças para motor.</p>
      <Link className="button button-primary" href="/">Voltar ao início <span>→</span></Link>
    </main>
  );
}
