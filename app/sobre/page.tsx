'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSiteContent } from '../use-site-content';

const whatsappUrl = `https://wa.me/5567998278414?text=${encodeURIComponent('Olá! Conheci a Rafa Auto Peças pelo site e gostaria de falar com a equipe.')}`;

export default function AboutPage() {
  const content = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="about-page">
      <div className="topbar">
        <p>Autopeças em Campo Grande/MS • Atendimento em todo Mato Grosso do Sul</p>
        <a className="whatsapp-link" href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp: (67) 99827-8414 <span>↗</span></a>
      </div>
      <header className="catalog-header">
        <Link className="brand brand-logo" href="/" aria-label="Rafa Auto Peças — início"><Image src="/rafa-auto-pecas-logo.png" alt="Rafa Auto Peças" width={1003} height={1259} priority /></Link>
        <nav id="about-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Navegação principal"><Link href="/" onClick={() => setMenuOpen(false)}>Início</Link><a href="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a><a href="/contato" onClick={() => setMenuOpen(false)}>Contato</a></nav>
        <a className="header-cta whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">Falar no WhatsApp <span>↗</span></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="about-navigation" onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
      </header>

      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow light-eyebrow"><span /> Sobre nossa empresa</p>
          <h1>{content.aboutTitle}</h1>
          <p>{content.aboutDescription}</p>
          <a className="about-whatsapp whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">Falar com nossa equipe <span>↗</span></a>
        </div>
        <div className="about-hero-image"><Image src="/rafa-auto-pecas-fachada.jpg" alt="Fachada da Rafa Auto Peças em Campo Grande, Mato Grosso do Sul" width={2976} height={1984} priority sizes="(max-width: 760px) 100vw, 52vw" /></div>
      </section>

      <section className="about-values">
        <div className="about-intro"><p className="eyebrow"><span /> Nosso compromisso</p><h2>Atendimento especializado</h2></div>
        <div className="about-value-grid">
          <article><span>01</span><h3><span className="title-line">Especialistas em</span><span className="title-line">peças para motor</span></h3><p>Trabalhamos com autopeças para linha mecânica, com foco em peças para motor e componentes para diferentes veículos e aplicações.</p></article>
          <article><span>02</span><h3><span className="title-line">Aplicação correta</span><span className="title-line">da peça</span></h3><p>Conferimos marca, modelo, ano e motorização para ajudar na identificação da peça correta para cada necessidade.</p></article>
          <article><span>03</span><h3>Revendedor Mando</h3><p>Somos uma autopeças revendedora Mando em Campo Grande/MS, com estoque de componentes para manutenção, reposição e linha mecânica.</p></article>
          <article><span>04</span><h3><span className="title-line">Atendimento em</span><span className="title-line">Campo Grande e MS</span></h3><p>Atendemos empresas e profissionais do setor automotivo em Campo Grande/MS e em todo o estado de Mato Grosso do Sul.</p></article>
        </div>
      </section>

      <section className="about-service">
        <div><p className="eyebrow light-eyebrow"><span /> Atendimento</p><h2>Estamos prontos para atender você.</h2><p>{content.address}<br />Campo Grande/MS</p></div>
        <div className="about-hours"><article><strong>Segunda a sexta</strong><span>{content.weekdayHours}</span></article><article><strong>Sábado</strong><span>{content.saturdayHours}</span></article></div>
        <a className="about-whatsapp whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">Consultar pelo WhatsApp <span>↗</span></a>
      </section>

      <footer className="about-footer"><span>© 2026 Rafa Auto Peças.</span><a href="/catalogo">Ver catálogo completo →</a></footer>
    </main>
  );
}
