export const defaultSiteContent = {
  homeHeroTitle: 'Peças para motor',
  homeHeroLocation: 'em Campo Grande/MS',
  homeHeroDescription: 'Peças nacionais e importadas para mecânicas, oficinas e retíficas em todo Mato Grosso do Sul.',
  catalogTitle: 'Peças para motor e linha mecânica em Campo Grande/MS',
  catalogDescription: 'Encontre virabrequim, cabeçote, bomba de óleo, corrente de comando, tampa de válvula e outras peças para motor. Trabalhamos também com itens de distribuição, lubrificação, direção, vedação, injeção, arrefecimento e turbo, com atendimento para mecânicas, oficinas e retíficas em Campo Grande e todo Mato Grosso do Sul.',
  aboutTitle: 'Rafa Autopeças',
  aboutDescription: 'Somos uma autopeças revendedora Mando em Campo Grande/MS, especializada em peças automotivas para linha mecânica e atendimento profissional. Trabalhamos com peças para oficinas, mecânicos, retíficas e empresas do setor automotivo, com atendimento em Campo Grande e em todo o estado de Mato Grosso do Sul.',
  contactTitle: 'Consulte a disponibilidade das peças que procura',
  contactDescription: 'Envie os dados do veículo e da peça que procura. Nossa equipe verifica a aplicação e a disponibilidade em estoque.',
  phone: '(67) 3043-6362',
  whatsapp: '(67) 99827-8414',
  address: 'Rua José Santiago, 52 – Vila Santa Dorotheia',
  weekdayHours: '7h30 às 11h • 13h às 17h30',
  saturdayHours: '7h30 às 11h',
  accentColor: '#25D366',
  surfaceColor: '#ECECEC',
  headingScale: '1',
} as const;

export type ContentKey = keyof typeof defaultSiteContent;
export type SiteContent = Record<ContentKey, string>;

export const contentKeys = Object.keys(defaultSiteContent) as ContentKey[];

export function mergeSiteContent(values: Record<string, string> | null | undefined): SiteContent {
  return { ...defaultSiteContent, ...(values ?? {}) };
}
