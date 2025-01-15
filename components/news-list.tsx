import Link from "next/link"
import { getPosts } from "@/lib/wordpress"
import type { Post } from "@/types/wordpress"

export async function NewsList() {
  const posts = await getPosts("noticias")

  if (posts.length === 0) {
    return <p className="text-center text-gray-500">No hay noticias disponibles en este momento.</p>
  }

  return (
    <ul className="space-y-4">
      {posts.map((post: Post) => (
        <li key={post.id} className="border-b pb-4">
          <Link href={`/noticias/${post.slug}`} className="text-lg font-semibold hover:underline">
            {post.title?.rendered || 'Título no disponible'}
          </Link>
          <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
        </li>
      ))}
    </ul>
  )
}

