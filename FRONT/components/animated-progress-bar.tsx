"use client"

import { useState, useEffect } from "react"

interface AnimatedProgressBarProps {
  percentage: number
  color?: string
  height?: string
  duration?: number
  className?: string
}

export default function AnimatedProgressBar({
  percentage,
  color = "bg-amber-500",
  height = "h-2",
  duration = 1000,
  className = "",
}: AnimatedProgressBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Reset animation when percentage changes
    setWidth(0)

    // Small delay to ensure the reset is visible
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, 50)

    return () => clearTimeout(timer)
  }, [percentage])

  return (
    <div className={`w-full bg-black/30 rounded-full overflow-hidden ${height} ${className}`}>
      <div className={`${color} ${height} transition-all duration-1000 ease-out`} style={{ width: `${width}%` }}></div>
    </div>
  )
}
