'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Product = { name: string; category: string; application: string; image: string };

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
  { name: 'Tampa dianteira do motor c/bomba de Óleo', category: 'Motor', application: 'Tampa dianteira do motor com bomba de óleo integrada', image: 'biela-motor-std.png' },
  { name: 'Tampa de Válvulas', category: 'Motor', application: 'Consulte aplicação e disponibilidade', image: 'tampa-valvulas.png' },
  { name: 'Jogo de Anéis de Pistão', category: 'Motor', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'anel-pistao.png' },
  { name: 'Arruela de Encosto', category: 'Motor', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'arruela-encosto.png' },
  { name: 'Bico Injetor Completo', category: 'Injeção', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'bico-injetor.png' },
  { name: "Bomba d'Água", category: 'Arrefecimento', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'bomba-agua.png' },
  { name: 'Bomba de Vácuo', category: 'Motor', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'bomba-vacuo.png' },
  { name: 'Camisa de Cilindro', category: 'Motor', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'camisa-cilindro.png' },
  { name: 'Cárter de Óleo', category: 'Lubrificação', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'carter-oleo.png' },
  { name: 'Bronzina Biela (móvel) Std', category: 'Motor', application: 'Bronzina de biela (móvel) padrão STD', image: 'casquilho-biela.png' },
  { name: 'Jogo de Casquilhos de Mancal', category: 'Motor', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'casquilho-mancal.png' },
  { name: 'Coletor de Admissão', category: 'Motor', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'coletor-admissao.png' },
  { name: 'Pistão com Pino e Travas', category: 'Motor', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'pistao.png' },
  { name: 'Turbina de Motor Completa', category: 'Turbo', application: 'Consulte aplicações e disponibilidade para seu veículo', image: 'turbina-motor.png' },
];

const filters = ['Todos', ...Array.from(new Set(products.map((product) => product.category)))];
const whatsappUrl = (piece: string) => `https://wa.me/5567998278414?text=${encodeURIComponent(`Olá! Gostaria de consultar a peça: ${piece}.`)}`;

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeFilter === 'Todos' || product.category === activeFilter;
    const query = search.trim().toLocaleLowerCase('pt-BR');
    return matchesCategory && (!query || product.name.toLocaleLowerCase('pt-BR').includes(query));
  }), [activeFilter, search]);

  return (
    <main className="catalog-page">
      <div className="topbar">
        <p>Autopeças em Campo Grande/MS • Atendimento em todo Mato Grosso do Sul</p>
        <a className="whatsapp-link" href={whatsappUrl('atendimento geral')} target="_blank" rel="noreferrer">WhatsApp: (67) 99827-8414 <span>↗</span></a>
      </div>
      <header className="catalog-header">
        <Link className="brand brand-logo" href="/" aria-label="Rafa Auto Peças — início"><Image src="/rafa-auto-pecas-logo.png" alt="Rafa Auto Peças" width={1003} height={1259} priority /></Link>
        <nav id="catalog-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Navegação do catálogo"><Link href="/" onClick={() => setMenuOpen(false)}>Início</Link><a href="/sobre" onClick={() => setMenuOpen(false)}>Quem somos</a><a href="/contato" onClick={() => setMenuOpen(false)}>Contato</a></nav>
        <a className="header-cta whatsapp-button" href={whatsappUrl('atendimento geral')} target="_blank" rel="noreferrer">Falar no WhatsApp <span>↗</span></a>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls="catalog-navigation" onClick={() => setMenuOpen((open) => !open)}><i /><i /></button>
      </header>

      <section className="catalog-hero">
        <div className="catalog-banner-copy">
          <p className="eyebrow"><span /> Catálogo de peças</p>
          <h1>Catálogo<br />de peças<br />disponíveis</h1>
          <p>Encontre peças para motor, direção, vedação, lubrificação e arrefecimento com atendimento para oficinas, mecânicas e retíficas.</p>
        </div>
      </section>

      <section className="catalog-products" aria-label="Produtos do catálogo">
        <label className="catalog-search-label" htmlFor="catalog-search">Buscar uma peça</label>
        <input className="catalog-search-input" id="catalog-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex.: bomba de óleo, pistão, cabeçote..." />
        <div className="filter-row" role="group" aria-label="Filtrar catálogo por categoria">
          {filters.map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <p className="catalog-count">{visibleProducts.length} {visibleProducts.length === 1 ? 'peça encontrada' : 'peças encontradas'}</p>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image"><Image src={`/products/mando/${product.image}`} alt={product.name} width={1254} height={1254} loading="lazy" sizes="(max-width: 760px) 100vw, (max-width: 1060px) 50vw, 33vw" /></div>
              <div className="product-info"><span>{product.category} · MANDO</span><h2>{product.name}</h2><p>{product.application}</p><a className="catalog-whatsapp-button whatsapp-button" href={whatsappUrl(product.name)} target="_blank" rel="noreferrer">Consultar no WhatsApp <b>↗</b></a></div>
            </article>
          ))}
        </div>
        {visibleProducts.length === 0 && <div className="catalog-empty"><h2>Nenhuma peça encontrada.</h2><p>Fale com nossa equipe: podemos consultar outras aplicações em estoque.</p><a className="catalog-whatsapp-button whatsapp-button" href={whatsappUrl(search || 'outra peça')} target="_blank" rel="noreferrer">Consultar no WhatsApp ↗</a></div>}
      </section>
    </main>
  );
}
