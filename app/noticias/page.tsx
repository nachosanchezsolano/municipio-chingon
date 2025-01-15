import { NewsList } from "@/components/news-list"

export default function Noticias() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Noticias de Chingón City</h1>
      <NewsList />
    </div>
  )
}

