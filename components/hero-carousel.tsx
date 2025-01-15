'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/turismo.jpg-JTRWjEYcjCq7yIUeIMPTDzFGzaWJj2.jpeg",
    alt: "Vista panorámica de Chingón City"
  },
  {
    src: "/placeholder.jpg",
    alt: "Plaza central de Chingón City"
  },
  {
    src: "/placeholder.jpg",
    alt: "Parque natural de Chingón City"
  }
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  )
}

