"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Users } from "lucide-react"
import { motion, FadeUp, BlurReveal, Parallax } from "@/components/motion"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] mask-fade-out pointer-events-none" />

      {/* Background blobs for premium feel */}
      <Parallax speed={0.2}>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      </Parallax>
      <Parallax speed={0.35}>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      </Parallax>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="max-w-2xl">
            {/* Main Heading */}
            <BlurReveal duration={0.9}>
              <h1 className="text-5xl lg:text-7xl font-sans font-extrabold leading-[1.1] mb-8 text-foreground">
                Boostez votre <br />
                <span className="text-accent underline decoration-accent/20">succès numérique</span> <br />
                avec Numilex
              </h1>
            </BlurReveal>

            {/* Subtext */}
            <FadeUp delay={0.2}>
              <p className="text-lg text-text-muted mb-10 leading-relaxed max-w-xl">
                Numilex transforme vos défis technologiques en leviers de croissance.
                De l&apos;audit IT au marketing stratégique, nous bâtissons l&apos;infrastructure de votre succès futur.
              </p>
            </FadeUp>

            {/* CTA Buttons */}
            <FadeUp delay={0.35}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-dark text-white font-semibold hover:bg-dark-mid transition-all shadow-lg shadow-dark/10"
                >
                  Lancer mon projet
                </Link>
                <Link
                  href="/devis"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-border text-foreground font-semibold hover:bg-surface transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center">
                    <Play className="w-3 h-3 fill-accent text-accent ml-0.5" />
                  </div>
                  Demander un devis
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Cards Grid */}
          <div className="relative grid grid-cols-2 gap-4 lg:gap-6">
            {/* Phone Feature Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/hero-phone.png"
                alt="Numilex App Preview"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Stat Card 1: Clients */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#F8F9FB] rounded-3xl p-8 flex flex-col justify-between shadow-sm"
            >
              <div className="text-accent">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-1">40+</div>
                <div className="text-sm text-text-muted">Clients satisfaits qui nous font confiance.</div>
              </div>
            </motion.div>

            {/* Stat Card 2: Experience */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#F8F9FB] rounded-3xl p-8 flex flex-col justify-center gap-4 shadow-sm"
            >
              <div className="text-4xl lg:text-5xl font-display font-bold text-foreground">10+</div>
              <div className="text-sm text-text-muted">Ans d&apos;expertise au service du numérique.</div>
            </motion.div>

            {/* Stat Card 3: Satisfaction/Members */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#EFE9E2] rounded-3xl p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-1">100%</div>
                <div className="text-sm text-text-muted">De satisfaction sur nos solutions sur mesure</div>
              </div>
              <div className="flex -space-x-3 mt-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-surface relative">
                    <Image
                      src={`/placeholder-user.jpg`}
                      alt="User avatar"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all cursor-pointer"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-accent flex items-center justify-center text-white text-[10px] font-bold">
                  +1k
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
