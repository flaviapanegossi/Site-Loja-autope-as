import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Peças para Motor em Campo Grande/MS | Rafa Auto Peças',
  description: 'Peças para motor e linha mecânica em Campo Grande/MS. Consulte componentes, aplicação e disponibilidade. Atendimento em Campo Grande e todo Mato Grosso do Sul.',
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'Rafa Auto Peças',
    description: 'Peças para motor e linha mecânica em Campo Grande/MS. Atendimento em todo Mato Grosso do Sul.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1792, height: 896, alt: 'Rafa Auto Peças — peças para motor em Campo Grande/MS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafa Auto Peças',
    description: 'Peças para motor e linha mecânica em Campo Grande/MS. Atendimento em todo Mato Grosso do Sul.',
    images: ['/og.png'],
  },
  icons: { icon: '/rafa-auto-pecas-logo.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

