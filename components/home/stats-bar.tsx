"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 40, suffix: "+", label: "Clients satisfaits" },
  { value: 4, suffix: "", label: "Domaines d'expertise" },
  { value: 100, suffix: "%", label: "Sur mesure" },
  { value: 24, suffix: "/7", label: "Support disponible" },
]

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, start])

  return count
}

export function StatsBar() {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-dark py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible)

  return (
    <div className="text-center">
      <p className="text-4xl lg:text-5xl font-display font-bold text-accent mb-2">
        {count}{stat.suffix}
      </p>
      <p className="text-text-muted-light text-sm lg:text-base">{stat.label}</p>
    </div>
  )
}
