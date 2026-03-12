"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { SlideIn, FadeUp, BlurReveal, Parallax } from "@/components/motion"

const metrics = [
  "6+ ans d'expérience",
  "40+ clients accompagnés",
  "4 domaines maîtrisés",
]

export function AboutSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <SlideIn direction="left">
            <div className="relative">
              <Parallax speed={0.15}>
                <div className="aspect-[4/3] rounded-3xl bg-surface overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Équipe Numilex travaillant ensemble"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Parallax>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
            </div>
          </SlideIn>

          {/* Content */}
          <div>
            <FadeUp>
              <span className="section-label text-accent mb-4 inline-flex">
                Qui sommes-nous
              </span>
            </FadeUp>

            <BlurReveal delay={0.1}>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
                <span className="text-balance">
                  Vos idées,
                  <br />
                  notre expertise.
                </span>
              </h2>
            </BlurReveal>

            <FadeUp delay={0.2}>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {"Chez Numilex, nous croyons au pouvoir du digital pour transformer les entreprises. Forts de notre expertise en informatique, marketing et gestion des réseaux sociaux, nous accompagnons nos clients dans leur évolution numérique depuis Paris."}
              </p>
            </FadeUp>

            {/* Metrics */}
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-6 mb-8">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{metric}</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* CTA */}
            <FadeUp delay={0.4}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
              >
                En savoir plus
                <ArrowRight className="w-5 h-5" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
