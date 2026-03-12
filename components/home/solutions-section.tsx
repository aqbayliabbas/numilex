"use client"

import Link from "next/link"
import { Monitor, Megaphone, Share2, Briefcase, ArrowUpRight, ArrowRight } from "lucide-react"
import { BlurReveal, FadeUp, motion, staggerContainer, staggerItem } from "@/components/motion"

const solutions = [
  {
    icon: Monitor,
    title: "Expertise Informatique",
    description: "Sécurisez vos actifs et optimisez vos processus avec notre audit IT, cybersécurité et infogérance sur mesure.",
    href: "/services/informatique",
  },
  {
    icon: Megaphone,
    title: "Stratégie Marketing",
    description: "Maximisez votre ROI grâce à des campagnes SEO/SEA ciblées et une identité de marque forte et percutante.",
    href: "/services/marketing",
  },
  {
    icon: Share2,
    title: "Social Performance",
    description: "Fédérez votre communauté et transformez votre engagement social en résultats business concrets.",
    href: "/services/social-media",
  },
  {
    icon: Briefcase,
    title: "Accompagnement Business",
    description: "Optimisez votre efficacité opérationnelle et bénéficiez d'un conseil stratégique pour une croissance maîtrisée.",
    href: "/services/business-support",
  },
]

export function SolutionsSection() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <span className="section-label text-accent mb-4 inline-flex mx-auto">
              Notre Expertise
            </span>
          </FadeUp>
          <BlurReveal delay={0.1}>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
              <span className="text-balance">
                Des solutions stratégiques
                <br />
                pour une performance durable.
              </span>
            </h2>
          </BlurReveal>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {solutions.map((solution) => (
            <motion.div key={solution.title} variants={staggerItem}>
              <Link
                href={solution.href}
                className="group bg-background rounded-2xl border border-border p-8 transition-all duration-300 hover:border-accent hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] block h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent-light flex items-center justify-center group-hover:bg-accent transition-colors">
                    <solution.icon className="w-7 h-7 text-accent group-hover:text-text-light transition-colors" />
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>

                <h3 className="font-display font-semibold text-xl lg:text-2xl text-foreground mb-3">
                  {solution.title}
                </h3>

                <p className="text-text-muted leading-relaxed mb-6">
                  {solution.description}
                </p>

                <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                  En savoir plus
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
