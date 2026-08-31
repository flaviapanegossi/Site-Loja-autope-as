export const defaultSiteContent = {
  homeHeroTitle: 'Especialistas em peças para motor',
  homeHeroLocation: 'em Campo Grande MS.',
  homeHeroDescription: 'Peças para motores nacionais e importados, com atendimento para mecânicas, oficinas e retíficas.',
  catalogTitle: 'Todas as peças em um só lugar.',
  catalogDescription: 'Consulte nossa linha de componentes para motor e linha mecânica. Selecione uma peça para falar diretamente com nossa equipe pelo WhatsApp.',
  aboutTitle: 'Especialistas em peças para motor e linha mecânica.',
  aboutDescription: 'Autopeças em Campo Grande/MS especializada em peças para motor e linha mecânica. Somos revendedores Mando e contamos com um amplo estoque de componentes para diferentes motores e aplicações, atendendo mecânicos, oficinas, retíficas e clientes de todo Mato Grosso do Sul.',
  contactTitle: 'Vamos encontrar a peça certa para o seu veículo.',
  contactDescription: 'Envie os dados do veículo e da peça que procura. Nossa equipe verifica a aplicação e a disponibilidade em estoque.',
  phone: '(67) 3043-6362',
  whatsapp: '(67) 99827-8414',
  address: 'Rua José Santiago, 52 – Vila Santa Dorotheia',
  weekdayHours: '7h30 às 11h • 13h às 17h30',
  saturdayHours: '7h30 às 11h',
} as const;

export type ContentKey = keyof typeof defaultSiteContent;
export type SiteContent = Record<ContentKey, string>;

export const contentKeys = Object.keys(defaultSiteContent) as ContentKey[];

export function mergeSiteContent(values: Record<string, string> | null | undefined): SiteContent {
  return { ...defaultSiteContent, ...(values ?? {}) };
}
