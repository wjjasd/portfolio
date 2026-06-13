'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform, type HTMLMotionProps } from 'framer-motion'

type TiltCardProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode
}

export default function TiltCard({ children, style, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [0, 1], [6, -6])
  const rotateY = useTransform(springX, [0, 1], [-6, 6])

  const spotlightX = useTransform(springX, (v) => `${v * 100}%`)
  const spotlightY = useTransform(springY, (v) => `${v * 100}%`)
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(129, 140, 248, 0.15), transparent 60%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      {...props}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightBackground }}
      />
    </motion.div>
  )
}
