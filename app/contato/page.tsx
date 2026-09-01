'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useSiteContent } from '../use-site-content';

const phone = '(67) 3043-6362';
const whatsapp = '(67) 99827-8414';
const whatsappUrl = (message: string) => `https://wa.me/5567998278414?text=${encodeURIComponent(message)}`;

export default function ContactPage() {
  const content = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('nome') || '').trim();
    const vehicle = String(data.get('veiculo') || '').trim();
    const piece = String(data.get('peca') || '').trim();
    const details = String(data.get('detalhes') || '').trim();
    const message = [`Olá! Meu nome é ${name}.`, vehicle && `Veículo: ${vehicle}.`, piece && `Peça procurada: ${piece}.`, details && `Detalhes: ${details}`].filter(Boolean).join('\n');
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="contact-page">
      <div className="topbar"><p>Autopeças em Campo Grande/MS • Atendimento em todo Mato Grosso do Sul</p><a className="whatsapp-link" href={whatsappUrl('Olá! Gostaria de falar com a Rafa Auto Peças.')} target="_blank" rel="noreferrer">WhatsApp: {whatsapp} <span>↗</span></a></div>
      <header className="catalog-header">
        <Link className="brand brand-logo" href="/" aria-label="Rafa Auto Peças — início"><Image src="/rafa-auto-pecas-logo.png" alt="Rafa Auto Peças" width={1003} height={1259} priority /></Link>
        <nav id="contact-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Navegação principal"><Link href="/" onClick={() => setMenuOpen(false)}>Início</Link><a href="/catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a><a href="/sobre" onClick={() => setMenuOpen(false)}>Quem somos</a></nav>
        <a className="header-cta whatsapp-button" href={whatsappUrl('Olá! Gostaria de falar com a Rafa Auto Peças.')} target="_blank" rel="noreferrer">Falar no WhatsApp <span>↗</span></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="contact-navigation" onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
      </header>

      <section className="contact-hero">
        <div className="contact-copy">
          <p className="eyebrow light-eyebrow"><span /> Entre em contato</p>
          <h1>{content.contactTitle}</h1>
          <p>{content.contactDescription}</p>
          <div className="contact-direct">
            <a href="tel:+556730436362"><span>Telefone</span><strong>{content.phone || phone}</strong></a>
            <a className="whatsapp-button" href={whatsappUrl('Olá! Gostaria de consultar uma peça.')} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{content.whatsapp || whatsapp}</strong></a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-heading"><span>01</span><div><h2>Consulte uma peça</h2><p>Preencha os campos para iniciar o atendimento.</p></div></div>
          <label htmlFor="nome">Seu nome</label><input id="nome" name="nome" type="text" required placeholder="Como podemos chamar você?" />
          <label htmlFor="veiculo">Veículo</label><input id="veiculo" name="veiculo" type="text" required placeholder="Marca, modelo, ano e motorização" />
          <label htmlFor="peca">Peça procurada</label><input id="peca" name="peca" type="text" required placeholder="Qual peça você precisa?" />
          <label htmlFor="detalhes">Detalhes adicionais</label><textarea id="detalhes" name="detalhes" rows={4} placeholder="Inclua outras informações, se necessário." />
          <button className="whatsapp-button" type="submit">Enviar pelo WhatsApp <span>↗</span></button>
        </form>
      </section>

      <section className="contact-info">
        <article><span>01</span><h2>Endereço</h2><p>{content.address}<br />Campo Grande/MS</p><a href="https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Santiago+52+Campo+Grande+MS" target="_blank" rel="noreferrer">Abrir no mapa ↗</a></article>
        <article><span>02</span><h2>Segunda a sexta</h2><p>{content.weekdayHours}</p></article>
        <article><span>03</span><h2>Sábado</h2><p>{content.saturdayHours}</p></article>
        <article><span>04</span><h2>Região atendida</h2><p>Campo Grande e todo Mato Grosso do Sul.</p></article>
      </section>

      <footer className="about-footer"><span>© 2026 Rafa Auto Peças.</span><span><a href="/catalogo">Ver catálogo →</a> · <a href="/sobre">Quem somos →</a></span></footer>
    </main>
  );
}
