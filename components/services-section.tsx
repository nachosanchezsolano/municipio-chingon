import { ServiceCard } from "@/components/ui/service-card"
import { Building2, FileText, Users, Truck } from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: "Registro Civil",
    description: "Tramitación de DNI, pasaporte, cambios de domicilio",
    href: "/servicios/registro-civil"
  },
  {
    icon: Building2,
    title: "Obras Particulares",
    description: "Permisos de construcción y habilitaciones comerciales",
    href: "/servicios/obras-particulares"
  },
  {
    icon: Users,
    title: "Atención al Vecino",
    description: "Consultas, reclamos y solicitudes generales",
    href: "/servicios/atencion-vecino"
  },
  {
    icon: Truck,
    title: "Servicios Urbanos",
    description: "Mantenimiento de espacios públicos y recolección",
    href: "/servicios/servicios-urbanos"
  }
]

interface ServicesSectionProps {
  className?: string
}

export function ServicesSection({ className }: ServicesSectionProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
            href={service.href}
          />
        ))}
      </div>
    </div>
  )
}

