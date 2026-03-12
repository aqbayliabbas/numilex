"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BlurReveal, FadeUp, motion, staggerContainer, staggerItem } from "@/components/motion"

const articles = [
  {
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    title: "Comment créer une stratégie SEO en 2026",
    date: "12 Mars 2026",
    readTime: "5 min",
    description: "Les meilleures pratiques pour optimiser votre visibilité organique cette année.",
    href: "/blog/strategie-seo-2026",
  },
  {
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    title: "Les tendances Social Media à surveiller",
    date: "8 Mars 2026",
    readTime: "4 min",
    description: "Découvrez les nouvelles fonctionnalités et formats qui dominent les réseaux sociaux.",
    href: "/blog/tendances-social-media",
  },
  {
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    title: "5 erreurs IT qui coûtent cher aux PME",
    date: "5 Mars 2026",
    readTime: "6 min",
    description: "Identifiez et évitez les pièges informatiques les plus courants en entreprise.",
    href: "/blog/erreurs-it-pme",
  },
]

export function BlogPreviewSection() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <FadeUp>
              <span className="section-label text-accent mb-4 inline-flex">
                Actualités
              </span>
            </FadeUp>
            <BlurReveal delay={0.1}>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                <span className="text-balance">
                  Nos derniers articles
                  <br />
                  et conseils.
                </span>
              </h2>
            </BlurReveal>
          </div>

          <FadeUp delay={0.2}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all mt-6 lg:mt-0"
            >
              Voir tous les articles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeUp>
        </div>

        {/* Articles Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article) => (
            <motion.div key={article.title} variants={staggerItem}>
              <Link
                href={article.href}
                className="group bg-background rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-accent hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] block h-full"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-medium uppercase tracking-wider border border-[#C7D9FA]">
                    {article.category}
                  </span>
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-text-muted mb-4">
                    {article.date} · {article.readTime}
                  </p>

                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {article.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                    {"Lire l'article"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
