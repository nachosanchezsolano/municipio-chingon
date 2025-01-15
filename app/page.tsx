import Image from 'next/image'
import Link from 'next/link'
import { ServicesSection } from "@/components/services-section"
import { LatestNews } from "@/components/latest-news"
import { CalendarioEventos } from "@/components/calendario-eventos"
import { getEventos } from "@/lib/wordpress"

export default async function Home() {
  const eventos = await getEventos()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/turismo.jpg-JTRWjEYcjCq7yIUeIMPTDzFGzaWJj2.jpeg"
          alt="Vista panorámica de Chingón City"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="container h-full flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
              Bienvenidos a Chingón City
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mb-8">
              Descubre la belleza y la calidez de nuestra comunidad en el corazón de Argentina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/servicios" 
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-center hover:bg-primary/90 transition inline-flex items-center justify-center"
              >
                Nuestros Servicios
              </Link>
              <Link 
                href="/turismo" 
                className="bg-white text-primary px-6 py-3 rounded-lg text-center hover:bg-white/90 transition inline-flex items-center justify-center"
              >
                Descubre Chingón City
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calendario de Eventos */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Próximos Eventos</h2>
          <CalendarioEventos eventos={eventos} />
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-12">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Servicios Destacados</h2>
          <ServicesSection />
          <div className="mt-8 text-center">
            <Link 
              href="/servicios" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <LatestNews />
    </div>
  )
}

