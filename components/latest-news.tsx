"use client"

import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/types/wordpress"
import { usePosts } from "@/hooks/use-posts"

function isPost(post: any): post is Post {
  return post && typeof post === 'object' && 'id' in post && 'slug' in post;
}

export function LatestNews() {
  const { posts, isLoading, isError } = usePosts("noticias")

  if (isLoading) return <div className="text-center py-12">Cargando noticias...</div>
  if (isError) return <div className="text-center py-12">Error al cargar las noticias</div>
  if (!posts || posts.length === 0) return null

  const latestPosts = posts.slice(0, 5) // Get only the latest 5 posts

  return (
    <section className="bg-gray-50 py-12">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">Últimas Noticias</h2>
        <ul className="space-y-8">
          {latestPosts.map((post) => {
            if (!isPost(post)) return null;
            return (
              <li key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Link href={`/noticias/${post.slug}`} className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 relative h-48 sm:h-auto">
                    <Image
                      src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
                      alt={post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || 'Imagen de la noticia'}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="sm:w-2/3 p-6">
                    <time className="text-sm font-medium text-primary mb-2 block">
                      {new Date(post.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                      {post.title?.rendered || 'Título no disponible'}
                    </h3>
                    <div 
                      className="text-gray-700 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || 'Contenido no disponible' }} 
                    />
                    <span className="text-primary font-medium mt-2 inline-block hover:underline">
                      Leer más →
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 text-center">
          <Link 
            href="/noticias" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
          >
            Ver todas las noticias
          </Link>
        </div>
      </div>
    </section>
  )
}

