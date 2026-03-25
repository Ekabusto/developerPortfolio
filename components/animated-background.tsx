"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "./theme-provider"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Colors for the gradient based on theme
    const lightModeColors = [
      { r: 240, g: 240, b: 245 }, // Light blue-white
      { r: 245, g: 240, b: 255 }, // Light purple-white
      { r: 230, g: 245, b: 250 }, // Light cyan-white
      { r: 250, g: 245, b: 240 }, // Light orange-white
    ]

    const darkModeColors = [
      { r: 15, g: 15, b: 30 }, // Dark blue
      { r: 20, g: 15, b: 35 }, // Dark purple
      { r: 10, g: 20, b: 30 }, // Dark cyan
      { r: 25, g: 15, b: 25 }, // Dark magenta
    ]

    const colors = theme === "dark" ? darkModeColors : lightModeColors

    let colorIndex = 0
    let nextColorIndex = 1
    let progress = 0
    const transitionSpeed = 0.003 // Speed of color transition

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Interpolate between current color and next color
      const currentColor = colors[colorIndex]
      const nextColor = colors[nextColorIndex]

      const r = Math.floor(currentColor.r + (nextColor.r - currentColor.r) * progress)
      const g = Math.floor(currentColor.g + (nextColor.g - currentColor.g) * progress)
      const b = Math.floor(currentColor.b + (nextColor.b - currentColor.b) * progress)

      // Create gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )

      if (theme === "dark") {
        // Less blurry for dark mode, more defined colors
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.95)`)
        gradient.addColorStop(0.5, `rgba(${r - 5}, ${g - 5}, ${b - 5}, 0.6)`)
        gradient.addColorStop(1, `rgba(${r - 10}, ${g - 10}, ${b - 10}, 0.3)`)
      } else {
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.8)`)
        gradient.addColorStop(1, `rgba(${r - 10}, ${g - 10}, ${b - 10}, 0.2)`)
      }

      // Fill canvas with gradient
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update progress
      progress += transitionSpeed
      if (progress >= 1) {
        progress = 0
        colorIndex = nextColorIndex
        nextColorIndex = (nextColorIndex + 1) % colors.length
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
