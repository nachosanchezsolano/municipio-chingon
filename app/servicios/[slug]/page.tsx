import { notFound } from "next/navigation"

const services = {
  "atencion-vecino": {
    title: "Atención al Vecino",
    description: "Centro de atención y consultas para los vecinos de Valle Hermoso",
    content: `
      <p>La Municipalidad de Valle Hermoso ofrece diversos canales de atención para resolver sus consultas y reclamos:</p>
      <ul>
        <li>Atención presencial: Lunes a Viernes de 8:00 a 14:00 hs</li>
        <li>Teléfono: 0800-999-9999</li>
        <li>Email: atencion@vallehermoso.gob.ar</li>
        <li>WhatsApp: +54 9 11 1234-5678</li>
      </ul>
    `
  },
  // Aquí se pueden agregar más servicios
}

export default function ServicioPage({ params }: { params: { slug: string } }) {
  const service = services[params.slug as keyof typeof services]

  if (!service) {
    notFound()
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
      <p className="text-xl text-muted-foreground mb-8">{service.description}</p>
      <div 
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: service.content }}
      />
    </div>
  )
}

