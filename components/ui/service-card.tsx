import { Card } from "@/components/ui/card"
import { TypeIcon as type, type LucideIcon } from 'lucide-react'
import Link from "next/link"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ServiceCard({ icon: Icon, title, description, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <Card className="relative h-[280px] overflow-hidden group p-6">
        {/* Icono - Se mueve y cambia opacidad en hover */}
        <div className="absolute transition-all duration-300 ease-in-out transform group-hover:translate-x-24 group-hover:opacity-20">
          <Icon className="h-16 w-16 text-primary" />
        </div>
        
        {/* Contenedor del contenido - Se mueve hacia arriba en hover */}
        <div className="absolute left-6 transition-all duration-300 ease-in-out transform translate-y-32 group-hover:translate-y-6">
          {/* Título */}
          <h3 className="text-2xl font-semibold text-primary mb-4">
            {title}
          </h3>
          
          {/* Descripción - Visible solo en hover */}
          <p className="text-muted-foreground mb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {description}
          </p>
          
          {/* Enlace "Leer más" - Visible solo en hover */}
          <span className="text-primary inline-flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Leer más 
            <svg 
              className="ml-2 h-4 w-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </span>
        </div>
      </Card>
    </Link>
  )
}

