import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nós | Rafa Auto Peças',
  description: 'Conheça a Rafa Auto Peças, especialista em peças para motor e linha mecânica e revendedora Mando em Campo Grande/MS.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre Nós | Rafa Auto Peças',
    description: 'Conheça a Rafa Auto Peças, especialista em peças para motor e linha mecânica em Campo Grande/MS.',
    url: '/sobre',
    type: 'website',
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
