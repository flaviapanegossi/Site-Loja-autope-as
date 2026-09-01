import type { Metadata } from 'next';
import './globals.css';
import RevealOnScroll from './reveal-on-scroll';

const configuredSiteUrl = process.env.SITE_URL?.trim();
export const siteUrl = configuredSiteUrl && /^https?:\/\//i.test(configuredSiteUrl)
  ? configuredSiteUrl.replace(/\/+$/, '')
  : 'https://motoria-autopecas.flavia-panegossi.chatgpt.site';

export const metadata: Metadata = {
  title: 'Peças para Motor em Campo Grande/MS | Rafa Auto Peças',
  description: 'Peças para motor e linha mecânica em Campo Grande/MS. Consulte componentes, aplicação e disponibilidade. Atendimento em Campo Grande e todo Mato Grosso do Sul.',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rafa Auto Peças',
    description: 'Peças para motor e linha mecânica em Campo Grande/MS. Atendimento em todo Mato Grosso do Sul.',
    url: siteUrl,
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
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutoPartsStore',
        '@id': `${siteUrl}/#business`,
        name: 'Rafa Auto Peças',
        url: siteUrl,
        description: 'Peças para motor e linha mecânica em Campo Grande/MS, com atendimento em todo Mato Grosso do Sul.',
        telephone: '+55-67-3043-6362',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Rua José Santiago, 52 – Vila Santa Dorotheia',
          addressLocality: 'Campo Grande',
          addressRegion: 'MS',
          addressCountry: 'BR',
        },
        areaServed: ['Campo Grande', 'Mato Grosso do Sul'],
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '11:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '17:30' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:30', closes: '11:00' },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'Rafa Auto Peças',
        url: siteUrl,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${siteUrl}/#business` },
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <body>
        {children}
        <RevealOnScroll />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
