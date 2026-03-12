"use client"

import { BlurReveal, FadeUp, Parallax } from "@/components/motion"

interface PageHeroProps {
  label: string
  title: string
  description: string
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="bg-dark pt-[72px] relative overflow-hidden">
      <Parallax speed={0.2}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      </Parallax>

      <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-40 relative z-10">
        <div className="max-w-3xl">
          <FadeUp>
            <span className="text-accent text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block">
              {label}
            </span>
          </FadeUp>

          <BlurReveal delay={0.1}>
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.1] mb-8">
              <span className="text-balance">{title}</span>
            </h1>
          </BlurReveal>

          <FadeUp delay={0.25}>
            <p className="text-text-muted-light text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
              {description}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
