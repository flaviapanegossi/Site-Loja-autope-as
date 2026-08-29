import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Peças | Rafa Auto Peças',
  description: 'Consulte o catálogo de peças para motor e linha mecânica da Rafa Auto Peças em Campo Grande/MS e solicite atendimento pelo WhatsApp.',
};

export default function CatalogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

