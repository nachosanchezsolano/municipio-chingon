import { Inter } from 'next/font/google'
import { SiteHeader } from "@/components/site-header"
import { SWRConfig } from 'swr'

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
          <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
            <SiteHeader />
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
            <footer className="bg-gray-100 py-4 text-center">
              <p className="text-sm sm:text-base">&copy; 2024 Municipalidad Bien chingona. Todos los derechos reservados.</p>
            </footer>
          </div>
      </body>
    </html>
  )
}



import './globals.css'