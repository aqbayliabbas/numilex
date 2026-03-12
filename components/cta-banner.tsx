"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlurReveal, FadeUp, ScaleIn } from "@/components/motion"

export function CTABanner() {
  return (
    <section className="bg-dark py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center max-w-3xl mx-auto">
          <BlurReveal>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-text-light mb-6 leading-tight">
              <span className="text-balance">
                Prêt à transformer
                <br />
                votre entreprise ?
              </span>
            </h2>
          </BlurReveal>

          <FadeUp delay={0.15}>
            <p className="text-text-muted-light text-lg lg:text-xl mb-10 leading-relaxed">
              Ensemble pour propulser votre succès en ligne.
              <br />
              Obtenez votre devis gratuit dès aujourd&apos;hui.
            </p>
          </FadeUp>

          <ScaleIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-text-light font-semibold hover:bg-accent-hover transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              >
                Démarrer un projet
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-text-light text-text-light font-semibold hover:bg-white/10 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  )
}
