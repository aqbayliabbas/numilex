"use client"

import { BlurReveal, FadeUp, SlideIn, motion, staggerContainer, staggerItemBlur } from "@/components/motion"

const features = [
  {
    title: "Équipe passionnée et polyvalente",
    description: "Une équipe d'experts couvrant 4 domaines complémentaires, entièrement dédiée à vos objectifs.",
  },
  {
    title: "Solutions 100% personnalisées",
    description: "Chaque mission est traitée sur mesure, sans solution toute faite.",
  },
  {
    title: "Transparence & résultats mesurables",
    description: "Reporting régulier, KPIs clairs, communication directe.",
  },
  {
    title: "Support 24h/24, 7j/7",
    description: "Disponibles à tout moment pour répondre à vos urgences.",
  },
]

export function WhyUsSection() {
  return (
    <section className="bg-dark py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <FadeUp>
              <span className="section-label text-text-muted-light mb-4 inline-flex">
                Engagement Excellence
              </span>
            </FadeUp>

            <BlurReveal delay={0.1}>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-text-light mb-6 leading-tight">
                <span className="text-balance">
                  Votre levier de transformation stratégique.
                </span>
              </h2>
            </BlurReveal>

            <FadeUp delay={0.2}>
              <p className="text-text-muted-light text-lg leading-relaxed">
                {"Au-delà du simple prestataire, Numilex se positionne comme le partenaire de confiance de votre direction générale. Nous nous engageons sur la durée pour garantir l'agilité et la pérennité de votre entreprise dans l'économie numérique."}
              </p>
            </FadeUp>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-3">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-0"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={staggerItemBlur}
                  className="py-6 border-b border-border-dark last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-accent mt-2 shrink-0" />
                    <div>
                      <h3 className="font-display font-semibold text-lg lg:text-xl text-text-light mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-text-muted-light leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
