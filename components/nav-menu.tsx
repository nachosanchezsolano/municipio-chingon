'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Menu } from 'lucide-react'

const menuItems = [
  { title: "Inicio", url: "/" },
  { title: "Municipio", url: "/municipio" },
  { title: "Servicios", url: "/servicios" },
  { title: "Trámites", url: "/tramites" },
  { title: "Turismo", url: "/turismo" },
  { title: "Noticias", url: "/noticias" },
]

export function NavMenu() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="w-full sm:w-auto">
      <button 
        className="sm:hidden w-full flex items-center justify-center p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
        <span className="ml-2">Menu</span>
      </button>
      <ul className={cn(
        "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0",
        isOpen ? "block" : "hidden sm:flex"
      )}>
        {menuItems.map((item) => (
          <li key={item.title}>
            <Link
              href={item.url}
              className={cn(
                "block py-2 px-4 sm:px-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                pathname === item.url
                  ? "text-primary-foreground"
                  : "text-primary-foreground/60"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

