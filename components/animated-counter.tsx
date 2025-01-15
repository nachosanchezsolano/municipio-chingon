'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface CounterProps {
  end: number
  duration: number
  label: string
}

export function AnimatedCounter({ end, duration, label }: CounterProps) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      let startTime: number
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = timestamp - startTime
        const percentage = Math.min(progress / duration, 1)
        setCount(Math.floor(end * percentage))
        if (percentage < 1) {
          requestAnimationFrame(animateCount)
        }
      }
      requestAnimationFrame(animateCount)
      controls.start({ opacity: 1, y: 0 })
    }
  }, [inView, end, duration, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      className="text-center"
    >
      <span className="text-4xl font-bold">{count}</span>
      <p className="text-lg">{label}</p>
    </motion.div>
  )
}

