'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function Turismo() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div ref={ref} className="space-y-6">
      <motion.div 
        className="relative h-[50vh] overflow-hidden"
        style={{ y }}
      >
        <Image
          src="https://sjc.microlink.io/fxSBcR9PPHaxrsPcSnuVMTi5qxJpr2jnVqDdh6IruJ2sHGKYd7A2Gv-g_XturpfTSHA8CMIGgTxA64PjyW4dqA.jpeg"
          alt="Paisaje de Valle Hermoso"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Turismo en Chingón City</h1>
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 py-12">
        <p className="text-lg mb-8">Descubre las maravillas naturales y culturales de nuestra hermosa ciudad.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Lugares de interés</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Parque Nacional Los Terrones</li>
          <li>Río San Miguel</li>
          <li>Plaza Central</li>
          <li>Museo Histórico Municipal</li>
          <li>Mirador Cerro de la Cruz</li>
        </ul>
      </div>
    </div>
  )
}

