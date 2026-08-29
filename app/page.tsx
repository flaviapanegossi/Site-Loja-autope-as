'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

type Product = {
  name: string;
  category: string;
  application: string;
  image: string;
  badge?: string;
};

const products: Product[] = [
  { name: 'Virabrequim S10', category: 'Motor', application: 'Consulte aplicação e disponibilidade', image: 'virabrequim-eixo-s10.png' },
  { name: 'Bloco Motor STD Amarok', category: 'Motor', application: 'Consulte aplicação e disponibilidade', image: 'bloco-motor-std-amarok.png' },
  { name: 'Bomba de Óleo', category: 'Lubrificação', application: 'Consulte aplicação e disponibilidade', image: 'bomba-oleo.png' },
  { name: 'Cabeçote de Motor', category: 'Motor', application: 'Consulte aplicação e disponibilidade', image: 'cabecote.png' },
  { name: 'Bomba de Direção Hidráulica', category: 'Direção', application: 'Consulte aplicação e disponibilidade', image: 'bomba-direcao-hidraulica.png' },
  { name: 'Jogo de Juntas do Motor', category: 'Vedação', application: 'Consulte aplicação e disponibilidade', image: 'junta-motor.png' },
  { name: 'Engrenagem do Comando de Válvulas', category: 'Distribuição', application: 'Consulte aplicação e disponibilidade', image: 'engrenagem-comando-valvula.png' },
  { name: 'Comando de Válvulas', category: 'Distribuição', application: 'Consulte aplicação e disponibilidade', image: 'comando-valvulas-escape.png' },
  { name: 'Kit Completo de Distribuição', category: 'Distribuição', application: 'Consulte aplicação e disponibilidade', image: 'kit-completo-distribuicao-15-pecas.png' },
  { name: 'Biela Motor', category: 'Motor', application: 'Consulte aplicação e disponibilidade', image: 'biela-motor.png' },
  { name: 'Biela Motor STD', category: 'Motor', application: 'Consulte aplicação e disponibilidade', image: 'biela-motor-std.png' },
  { name: 'Tampa de Válvulas', category: 'Motor', application: 'Consulte aplicação e disponibilidade', image: 'tampa-valvulas.png' },
  { name: 'Jogo de Anéis de Pistão', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'anel-pistao.png' },
  { name: 'Arruela de Encosto', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'arruela-encosto.png' },
  { name: 'Bico Injetor Completo', category: 'Injeção', application: 'Variações consolidadas da planilha', image: 'bico-injetor.png' },
  { name: "Bomba d'Água", category: 'Arrefecimento', application: 'Variações consolidadas da planilha', image: 'bomba-agua.png' },
  { name: 'Bomba de Vácuo', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'bomba-vacuo.png' },
  { name: 'Camisa de Cilindro', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'camisa-cilindro.png' },
  { name: 'Cárter de Óleo', category: 'Lubrificação', application: 'Variações consolidadas da planilha', image: 'carter-oleo.png' },
  { name: 'Jogo de Casquilhos de Biela', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'casquilho-biela.png' },
  { name: 'Jogo de Casquilhos de Mancal', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'casquilho-mancal.png' },
  { name: 'Coletor de Admissão', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'coletor-admissao.png' },
  { name: 'Pistão com Pino e Travas', category: 'Motor', application: 'Variações consolidadas da planilha', image: 'pistao.png' },
  { name: 'Turbina de Motor Completa', category: 'Turbo', application: 'Variações consolidadas da planilha', image: 'turbina-motor.png' },
];

const filters = ['Todos', 'Motor', 'Distribuição', 'Lubrificação', 'Direção', 'Vedação', 'Injeção', 'Arrefecimento', 'Turbo'];

const vehicleBrands = ['Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Toyota', 'Honda', 'Hyundai', 'Renault', 'Nissan', 'Jeep'];
const vehicleModels = ['S10', 'Onix', 'Tracker', 'Amarok', 'Gol', 'Saveiro', 'Strada', 'Toro', 'Ranger', 'Hilux', 'Corolla', 'HB20', 'Duster', 'Frontier', 'Renegade'];
const engineOptions = ['1.0', '1.0 Turbo', '1.3', '1.4', '1.5', '1.6', '1.8', '2.0', '2.0 Turbo', '2.2 Diesel', '2.4', '2.5', '2.8 Diesel', '3.0 Diesel', '3.2 Diesel', '4.0'];
const heroParts = [
  { name: 'Virabrequim', image: 'virabrequim-eixo-s10.png' },
  { name: 'Cabeçote', image: 'cabecote.png' },
  { name: 'Bloco do motor', image: 'bloco-motor-std-amarok.png' },
  { name: 'Bomba de óleo', image: 'bomba-oleo.png' },
];

const WHATSAPP_PHONE = '5567998278414';
const whatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

const benefits = [
  { value: 'Estoque especializado', label: 'Peças para linha mecânica' },
  { value: 'Peças para motor', label: 'Ampla variedade de componentes' },
  { value: 'Atendimento em todo MS', label: 'Campo Grande e interior' },
  { value: 'Compra rápida', label: 'Consulte direto pelo WhatsApp' },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [quoteItems, setQuoteItems] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [compatibilityMessage, setCompatibilityMessage] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [activePart, setActivePart] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const navigatePart = useCallback((next: number) => {
    if (isAnimating || next === activePart) return;
    setIsAnimating(true);
    setActivePart((next + heroParts.length) % heroParts.length);
    window.setTimeout(() => setIsAnimating(false), 700);
  }, [activePart, isAnimating]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    heroParts.forEach((part) => { const image = new window.Image(); image.src = `/products/mando/${part.image}`; });
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!pageVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => navigatePart(activePart + 1), 6500);
    return () => window.clearTimeout(timer);
  }, [activePart, navigatePart, pageVisible]);

  const visibleProducts = useMemo(
    () => activeFilter === 'Todos' ? products : products.filter((product) => product.category === activeFilter),
    [activeFilter],
  );

  function toggleQuote(productName: string) {
    setQuoteItems((current) => current.includes(productName)
      ? current.filter((name) => name !== productName)
      : [...current, productName]);
  }

  function handleCompatibility(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const piece = form.get('peca');
    const details = [form.get('marca'), form.get('modelo'), form.get('ano'), form.get('motor')].filter(Boolean).join(' • ');
    const message = `Olá! Gostaria de consultar a peça ${piece} para o veículo: ${details}.`;
    setCompatibilityMessage('Abrindo o WhatsApp para consultar aplicação e disponibilidade.');
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const piece = String(form.get('peca') ?? '').trim();
    setNewsletterSent(true);
    window.open(whatsappUrl(`Olá! Gostaria de consultar ${piece}.`), '_blank', 'noopener,noreferrer');
  }

  return (
    <main>
      <div className="topbar">
        <p>Autopeças em Campo Grande/MS • Atendimento em todo Mato Grosso do Sul</p>
        <a className="whatsapp-link" href={whatsappUrl('Olá! Gostaria de falar com um especialista em peças para motor.')} target="_blank" rel="noreferrer">WhatsApp: (67) 99827-8414 <span>↗</span></a>
      </div>

      <header className="site-header">
        <a className="brand brand-logo" href="#inicio" aria-label="Rafa Auto Peças — início">
          <Image src="/rafa-auto-pecas-logo.png" alt="Rafa Auto Peças — especialista em peças para motor" width={1003} height={1259} priority />
        </a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Navegação principal">
          <a href="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
          <a href="#compatibilidade" onClick={() => setMenuOpen(false)}>Aplicação</a>
          <a href="/sobre" onClick={() => setMenuOpen(false)}>Sobre nós</a>
          <a href="/contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <div className="header-actions">
          <button className="icon-action" type="button" aria-label="Buscar" aria-expanded={searchOpen} onClick={() => setSearchOpen((open) => !open)}>⌕</button>
          <span className="quote-count" aria-label={`${quoteItems.length} itens na cotação`}>{quoteItems.length}</span>
          <a className="header-cta whatsapp-button" href={whatsappUrl('Olá! Gostaria de consultar uma peça para motor.')} target="_blank" rel="noreferrer">Consultar no WhatsApp <span>↗</span></a>
          <button className="menu-button" type="button" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
        </div>
      </header>

      {searchOpen && (
        <form className="search-panel" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="site-search">Qual peça você está procurando?</label>
          <input id="site-search" autoFocus placeholder="Ex.: virabrequim S10, bomba de óleo..." />
          <button type="submit">Pesquisar</button>
        </form>
      )}

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="hero-badge"><i /><i /><i /><span>Autopeças</span></p>
          <h1>Especialistas<br /><em>em peças para<br />motor</em><small>em Campo Grande MS.</small></h1>
          <span className="hero-rule" />
          <p className="hero-description">Peças para motores nacionais e importados, com atendimento para mecânicas, oficinas e retíficas.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/catalogo"><span>→</span> Ver catálogo</a>
            <a className="button button-secondary whatsapp-button" href={whatsappUrl('Olá! Gostaria de consultar uma peça para motor.')} target="_blank" rel="noreferrer"><b>◉</b> Falar no WhatsApp</a>
          </div>
        </div>

        <div className="hero-visual" aria-live="polite">
          <strong className={`hero-backdrop-word ${heroParts[activePart].name.length > 11 ? 'word-long' : heroParts[activePart].name.length > 8 ? 'word-medium' : 'word-short'}`}>{heroParts[activePart].name}</strong>
          <div className="hero-spec"><b>＋</b><span>Precisão<br />Resistência<br />Desempenho</span></div>
          <span className="hero-dot-field" aria-hidden="true" />
          <div className="hero-product-stage">
            <div className="hero-product-spin" key={heroParts[activePart].name}><Image src={`/products/mando/${heroParts[activePart].image}`} alt={heroParts[activePart].name} width={1536} height={1024} priority /></div>
            <span className="hero-product-shadow" aria-hidden="true" />
            <span className="hero-platform" aria-hidden="true" />
          </div>
        </div>
        <div className="hero-carousel">
          <button className="carousel-arrow" type="button" aria-label="Peça anterior" onClick={() => navigatePart(activePart - 1)}>‹</button>
          <div className="carousel-progress"><strong>0{activePart + 1}</strong><span>/ 04</span><i><b style={{ width: `${(activePart + 1) * 25}%` }} /></i></div>
          <div className="carousel-tabs">{heroParts.map((part, index) => <button className={activePart === index ? 'active' : ''} type="button" key={part.name} onClick={() => navigatePart(index)}><small>0{index + 1}</small><strong>{part.name}</strong></button>)}</div>
          <p className="drag-label">☝ <span>Arraste para<br />navegar</span></p>
          <button className="carousel-arrow" type="button" aria-label="Próxima peça" onClick={() => navigatePart(activePart + 1)}>›</button>
        </div>
      </section>

      <section className="benefit-rail" aria-label="Vantagens da Rafa Auto Peças">
        {benefits.map((benefit, index) => (
          <article key={benefit.value}>
            <span className="benefit-number">0{index + 1}</span>
            <p><strong>{benefit.value}</strong><small>{benefit.label}</small></p>
          </article>
        ))}
      </section>

      <section className="compatibility-section" id="compatibilidade">
        <div className="compatibility-copy">
          <p className="eyebrow light-eyebrow"><span /> Consulte sua aplicação</p>
          <h2>Consulte a aplicação da peça<br />para o seu veículo.</h2>
          <p>Informe os dados do veículo para nossa equipe verificar a aplicação e disponibilidade da peça.</p>
          <div className="compatibility-note"><b>✓</b><span><strong>Mais segurança na identificação da peça.</strong><small>Modelo, ano e motorização ajudam a identificar o componente correspondente.</small></span></div>
        </div>
        <form className="vehicle-form" onSubmit={handleCompatibility}>
          <div className="form-intro"><span>01</span><div><strong>Encontre a peça para o seu veículo</strong><small>Preencha os campos abaixo</small></div></div>
          <label className="piece-field">Qual peça?<select name="peca" required defaultValue=""><option value="" disabled>Selecione a peça</option>{products.map((product) => <option key={product.name}>{product.name}</option>)}<option>Outra peça</option></select></label>
          <label>Marca<select name="marca" required defaultValue=""><option value="" disabled>Selecione a marca</option>{vehicleBrands.map((brand) => <option key={brand}>{brand}</option>)}<option>Outra marca</option></select></label>
          <label>Modelo<select name="modelo" required defaultValue=""><option value="" disabled>Selecione o modelo</option>{vehicleModels.map((model) => <option key={model}>{model}</option>)}<option>Outro modelo</option></select></label>
          <label>Ano<select name="ano" required defaultValue=""><option value="" disabled>Selecione o ano</option>{Array.from({ length: 27 }, (_, index) => <option key={2026 - index}>{2026 - index}</option>)}</select></label>
          <label>Motorização<select name="motor" required defaultValue=""><option value="" disabled>Selecione a motorização</option>{engineOptions.map((engine) => <option key={engine}>{engine}</option>)}<option>Outra motorização</option></select></label>
          <button className="button vehicle-submit whatsapp-button" type="submit">Consultar peça no WhatsApp <span>→</span></button>
          {compatibilityMessage && <p className="form-result" role="status">{compatibilityMessage}</p>}
        </form>
      </section>

      <section className="section products-section" id="produtos">
        <div className="section-heading product-heading">
          <div><p className="eyebrow"><span /> Estoque selecionado</p><h2>Peças para motor em destaque</h2></div>
          <p>Confira alguns dos componentes disponíveis. Consulte nossa equipe para confirmar aplicação, preço e disponibilidade.</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filtrar produtos">
          {filters.map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => {
            const selected = quoteItems.includes(product.name);
            return (
              <article className="product-card" key={product.name}>
                <div className="product-image">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <Image src={`/products/mando/${product.image}`} alt={product.name} width={1254} height={1254} loading="lazy" sizes="(max-width: 760px) 100vw, (max-width: 1060px) 50vw, 33vw" />
                  <button type="button" aria-label={`${selected ? 'Remover' : 'Adicionar'} ${product.name} da cotação`} className={selected ? 'quote-button selected' : 'quote-button'} onClick={() => toggleQuote(product.name)}>{selected ? '✓' : '+'}</button>
                </div>
                <div className="product-info"><span>{product.category} · MANDO</span><h3>{product.name}</h3><p>{product.application}</p><a className="whatsapp-link" href={whatsappUrl(`Olá! Gostaria de consultar o ${product.name}.`)} target="_blank" rel="noreferrer">Consultar esta peça <b>→</b></a></div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="performance-band" id="sobre">
        <div className="performance-visual">
          <Image src="/rafa-auto-pecas-fachada.jpg" alt="Fachada da Rafa Auto Peças em Campo Grande, Mato Grosso do Sul" width={2976} height={1984} sizes="(max-width: 760px) 100vw, 50vw" />
          <span>RAFA AUTO PEÇAS<br /><small>CAMPO GRANDE / MS</small></span>
        </div>
        <div className="performance-copy">
          <p className="eyebrow light-eyebrow"><span /> Sobre nossa empresa</p>
          <h2>Especialistas em peças para motor e linha mecânica.</h2>
          <p>Autopeças em Campo Grande/MS especializada em peças para motor e linha mecânica. Somos revendedores Mando e contamos com um amplo estoque de componentes para diferentes motores e aplicações, atendendo mecânicos, oficinas, retíficas e clientes de todo Mato Grosso do Sul.</p>
          <div className="performance-stats"><div><strong>PEÇAS</strong><span>Linha<br />especializada</span></div><div><strong>APLICAÇÃO</strong><span>Consulta<br />por veículo</span></div><div><strong>ATENDIMENTO</strong><span>Todo Mato<br />Grosso do Sul</span></div></div>
        </div>
      </section>

      <section className="newsletter" id="atendimento">
        <div className="newsletter-image"><Image src="/products/mando/bomba-direcao-hidraulica.png" alt="Bomba de direção hidráulica" width={1254} height={1254} sizes="330px" /></div>
        <div className="newsletter-copy"><p className="eyebrow"><span /> Consulte nosso estoque</p><h2>Está procurando uma peça para motor?</h2><p>Envie o modelo do veículo, ano, motorização e a peça que precisa. Nossa equipe consulta a aplicação e a disponibilidade em estoque.</p></div>
        <form onSubmit={handleNewsletter}><label htmlFor="newsletter-email">Qual peça você está procurando?</label><div><input id="newsletter-email" name="peca" type="text" required placeholder="Qual peça você está procurando?" /><button className="whatsapp-button" type="submit">{newsletterSent ? 'WhatsApp aberto ✓' : 'Consultar pelo WhatsApp'}</button></div>{newsletterSent && <p role="status">WhatsApp: (67) 99827-8414</p>}</form>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><a className="brand brand-light footer-logo" href="#inicio" aria-label="Rafa Auto Peças — início"><Image src="/rafa-auto-pecas-logo.png" alt="Rafa Auto Peças — especialista em peças para motor" width={1003} height={1259} /></a><p>Autopeças especializada em peças para motor e linha mecânica em Campo Grande/MS, com atendimento para clientes de todo Mato Grosso do Sul.</p><span>WhatsApp: (67) 99827-8414</span></div>
          <div><h3>Comprar</h3><a href="/catalogo">Catálogo completo</a><a href="#compatibilidade">Consultar aplicação</a><a href="/catalogo">Linha MANDO</a></div>
          <div><h3>Contato</h3><a href="/contato">Fale conosco</a><a href="tel:+556730436362">(67) 3043-6362</a><a className="whatsapp-link" href={whatsappUrl('Olá! Gostaria de consultar uma peça.')} target="_blank" rel="noreferrer">(67) 99827-8414</a><a href="#compatibilidade">Consultar aplicação</a></div>
          <div><h3>Endereço e horários</h3><a href="#atendimento">Rua José Santiago, 52 – Vila Santa Dorotheia</a><a href="#atendimento">Campo Grande/MS</a><p className="footer-hours"><strong>Segunda a sexta</strong>7h30 às 11h · 13h às 17h30<strong>Sábado</strong>7h30 às 11h</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Rafa Auto Peças.</span><span>Peças para motor e linha mecânica em Campo Grande/MS.</span></div>
      </footer>
    </main>
  );
}

