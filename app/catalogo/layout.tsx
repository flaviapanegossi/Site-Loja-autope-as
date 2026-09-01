import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Peças | Rafa Auto Peças',
  description: 'Consulte o catálogo de peças para motor e linha mecânica da Rafa Auto Peças em Campo Grande/MS e solicite atendimento pelo WhatsApp.',
  alternates: { canonical: '/catalogo' },
  openGraph: {
    title: 'Catálogo de Peças | Rafa Auto Peças',
    description: 'Consulte peças para motor e linha mecânica em Campo Grande/MS e fale com a equipe pelo WhatsApp.',
    url: '/catalogo',
    type: 'website',
  },
};

export default function CatalogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
