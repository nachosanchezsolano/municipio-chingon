// SiteHeader: Componente que representa el encabezado del sitio, incluyendo el logo y el menú de navegación.
import Image from "next/image"
import Link from "next/link"
import { NavMenu } from "@/components/nav-menu"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 sm:h-16">
          <Link href="/" className="flex items-center mb-4 sm:mb-0">
            <div className="relative w-[120px] h-[40px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-iBhdNML0xwO1PFx4z6t4W9Pg6LqDHi.svg"
                alt="Municipio Chingón City Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <NavMenu />
        </div>
      </div>
    </header>
  )
}

