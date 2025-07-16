"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedIconProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedIcon({ children, delay = 0 }: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
