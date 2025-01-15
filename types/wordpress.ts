export interface Post {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  slug: string
  date: string
  featured_media: number
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface Evento {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  acf: {
    inicio: string
    fin: string
    ubicacion: string
    orgeniza: string
    costo: number
    categorias: number[]
    link_de_registro: string
  }
}

