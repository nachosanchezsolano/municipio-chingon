import { getPost } from "@/lib/wordpress"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function NoticiaPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || 'Imagen de la noticia'}
              fill
              className="object-cover"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title?.rendered || 'Título no disponible'}</h1>
        <time className="text-sm font-medium text-primary mb-6 block">
          {new Date(post.date).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </time>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content?.rendered || 'Contenido no disponible' }} 
        />
      </div>
    </article>
  )
}

