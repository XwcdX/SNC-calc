"use client"

import { motion, useTransform, animate, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"

interface AnimatedNumberProps {
  value: number
  duration?: number
  formatFn?: (value: number) => string
  className?: string
}

export default function AnimatedNumber({ value, duration = 1, formatFn, className = "" }: AnimatedNumberProps) {
  const [isClient, setIsClient] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayed = useTransform(rounded, (latest) => (formatFn ? formatFn(latest) : latest.toString()))

  useEffect(() => {
    setIsClient(true)
    const controls = animate(count, value, { duration })
    return controls.stop
  }, [count, value, duration])

  if (!isClient) {
    return <span className={className}>{formatFn ? formatFn(0) : "0"}</span>
  }

  return <motion.span className={className}>{displayed}</motion.span>
}
