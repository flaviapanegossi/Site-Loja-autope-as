import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato | Rafa Auto Peças',
  description: 'Entre em contato com a Rafa Auto Peças em Campo Grande/MS. Consulte peças, aplicações e disponibilidade pelo WhatsApp.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato | Rafa Auto Peças',
    description: 'Consulte peças, aplicações e disponibilidade com a Rafa Auto Peças em Campo Grande/MS.',
    url: '/contato',
    type: 'website',
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
