import { ServicesSection } from "@/components/services-section"

export default function Servicios() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Servicios Municipales</h1>
        <p className="text-xl text-muted-foreground">
          Descubre todos los servicios que ofrecemos para mejorar la calidad de vida de nuestros vecinos.
        </p>
      </div>
      <ServicesSection />
    </div>
  )
}

