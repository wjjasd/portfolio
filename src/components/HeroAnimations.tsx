'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { AnchorHTMLAttributes, ReactNode } from 'react'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export function HeroContainer({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="max-w-6xl mx-auto w-full py-24"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

export function HeroItem({ as = 'div', className, children }: { as?: 'p' | 'h1' | 'div'; className?: string; children: ReactNode }) {
  const MotionTag = motion[as]
  return (
    <MotionTag variants={item} className={className}>
      {children}
    </MotionTag>
  )
}

const MAGNETIC_SPRING = { stiffness: 150, damping: 15, mass: 0.2 }

type MagneticButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> & {
  children: ReactNode
}

export function MagneticButton({ className, children, ...props }: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, MAGNETIC_SPRING)
  const springY = useSpring(y, MAGNETIC_SPRING)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    x.set(offsetX * 0.18)
    y.set(offsetY * 0.18)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      {...props}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  )
}
