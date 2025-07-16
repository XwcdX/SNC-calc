"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTitleProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedTitle({ children, delay = 0, className = "" }: AnimatedTitleProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
