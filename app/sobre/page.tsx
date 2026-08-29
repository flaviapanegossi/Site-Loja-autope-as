import Image from 'next/image';

const whatsappUrl = `https://wa.me/5567998278414?text=${encodeURIComponent('Olá! Conheci a Rafa Auto Peças pelo site e gostaria de falar com a equipe.')}`;

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="topbar">
        <p>Autopeças em Campo Grande/MS • Atendimento em todo Mato Grosso do Sul</p>
        <a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp: (67) 99827-8414 <span>↗</span></a>
      </div>
      <header className="catalog-header">
        <a className="brand brand-logo" href="/" aria-label="Rafa Auto Peças — início"><Image src="/rafa-auto-pecas-logo.png" alt="Rafa Auto Peças" width={1003} height={1259} priority /></a>
        <nav aria-label="Navegação principal"><a href="/">Início</a><a href="/catalogo">Catálogo</a><a href="/contato">Contato</a></nav>
        <a className="header-cta whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp <span>↗</span></a>
      </header>

      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow light-eyebrow"><span /> Sobre nossa empresa</p>
          <h1>Especialistas em peças para motor e linha mecânica.</h1>
          <p>Autopeças em Campo Grande/MS especializada em peças para motor e linha mecânica. Somos revendedores Mando e contamos com um amplo estoque de componentes para diferentes motores e aplicações, atendendo mecânicos, oficinas, retíficas e clientes de todo Mato Grosso do Sul.</p>
          <a className="about-whatsapp whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">Falar com nossa equipe <span>↗</span></a>
        </div>
        <div className="about-hero-image"><Image src="/rafa-auto-pecas-fachada.jpg" alt="Fachada da Rafa Auto Peças em Campo Grande, Mato Grosso do Sul" width={2976} height={1984} priority sizes="(max-width: 760px) 100vw, 52vw" /></div>
      </section>

      <section className="about-values">
        <div className="about-intro"><p className="eyebrow"><span /> Nosso compromisso</p><h2>Atendimento especializado para encontrar a peça certa.</h2></div>
        <div className="about-value-grid">
          <article><span>01</span><h3>Especialização</h3><p>Conhecimento em peças para motor e linha mecânica para diferentes veículos, motores e aplicações.</p></article>
          <article><span>02</span><h3>Aplicação correta</h3><p>Conferimos modelo, ano e motorização para ajudar você a identificar o componente correspondente.</p></article>
          <article><span>03</span><h3>Estoque Mando</h3><p>Somos revendedores Mando e trabalhamos com um amplo estoque de componentes para manutenção e reparação.</p></article>
          <article><span>04</span><h3>Atendimento regional</h3><p>Atendemos mecânicos, oficinas, retíficas e clientes de Campo Grande e de todo Mato Grosso do Sul.</p></article>
        </div>
      </section>

      <section className="about-service">
        <div><p className="eyebrow light-eyebrow"><span /> Atendimento</p><h2>Estamos prontos para atender você.</h2><p>Rua José Santiago, 52 – Vila Santa Dorotheia<br />Campo Grande/MS</p></div>
        <div className="about-hours"><article><strong>Segunda a sexta</strong><span>7h30 às 11h</span><span>13h às 17h30</span></article><article><strong>Sábado</strong><span>7h30 às 11h</span></article></div>
        <a className="about-whatsapp whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">Consultar pelo WhatsApp <span>↗</span></a>
      </section>

      <footer className="about-footer"><span>© 2026 Rafa Auto Peças.</span><a href="/catalogo">Ver catálogo completo →</a></footer>
    </main>
  );
}

