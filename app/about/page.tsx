"use client"

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { CTABanner } from "@/components/cta-banner"
import { PartnersSection } from "@/components/home/partners-section"
import { Heart, Zap, Shield, Linkedin, CheckCircle, Sparkles } from "lucide-react"
import { FadeUp, BlurReveal, SlideIn, Parallax, motion, staggerContainer, staggerItem } from "@/components/motion"

const timeline = [
  { year: "2018", event: "Création de Numilex à Paris" },
  { year: "2020", event: "Expansion vers le marketing digital" },
  { year: "2022", event: "Lancement du pôle Social Media" },
  { year: "2024", event: "40+ clients accompagnés" },
]

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Nous aimons ce que nous faisons et ça se ressent dans chaque livrable.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Toujours à la pointe des tendances digitales pour vos projets.",
  },
  {
    icon: Shield,
    title: "Intégrité",
    description: "Transparence, honnêteté et engagement total envers nos clients.",
  },
]

const stats = [
  { value: "40+", label: "Clients satisfaits" },
  { value: "4", label: "Domaines d'expertise" },
  { value: "100%", label: "Satisfaction client" },
  { value: "24/7", label: "Support dédié" },
]

const team = [
  {
    name: "Alexandre Martin",
    role: "CEO & Fondateur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  },
  {
    name: "Sophie Bernard",
    role: "Directrice Marketing",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
  },
  {
    name: "Thomas Dubois",
    role: "Lead Développeur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  },
  {
    name: "Marie Leroy",
    role: "Social Media Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  },
]

const checklist = [
  "Approche personnalisée — chaque projet est unique",
  "Innovation continue — méthodes et outils à la pointe",
  "Qualité exceptionnelle — livrables soignés et performants",
  "Engagement RSE — pratiques responsables et durables",
]

const processSteps = [
  {
    number: "01",
    title: "Audit & Découverte",
    description: "Nous analysons votre environnement digital, vos objectifs et vos concurrents pour poser des bases solides.",
  },
  {
    number: "02",
    title: "Stratégie & Conception",
    description: "Élaboration d'une feuille de route personnalisée avec des KPIs mesurables et un plan d'action détaillé.",
  },
  {
    number: "03",
    title: "Déploiement & Exécution",
    description: "Nos équipes implémentent les solutions retenues avec rigueur et dans le respect des délais convenus.",
  },
  {
    number: "04",
    title: "Suivi & Optimisation",
    description: "Reporting régulier, analyse des résultats et ajustements continus pour maximiser votre ROI.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="À propos de nous"
          title="Apprenez à nous connaître."
          description="Une agence digitale parisienne passionnée par la transformation numérique des entreprises ambitieuses."
        />

        {/* Notre Histoire */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <FadeUp>
                  <span className="section-label text-accent mb-4 inline-flex">
                    Notre histoire
                  </span>
                </FadeUp>

                <BlurReveal delay={0.1}>
                  <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
                    <span className="text-balance">
                      Numilex, née de la passion du digital.
                    </span>
                  </h2>
                </BlurReveal>

                <FadeUp delay={0.2}>
                  <p className="text-text-muted text-lg leading-relaxed mb-8">
                    {"Fondée par des experts du numérique, Numilex est née d'une conviction simple : chaque entreprise mérite un partenaire digital à la hauteur de ses ambitions. Depuis notre création, nous avons accompagné plus de 40 clients dans leur transformation digitale, en combinant expertise technique, créativité et rigueur."}
                  </p>
                </FadeUp>

                {/* Timeline */}
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {timeline.map((item, index) => (
                    <motion.div key={index} variants={staggerItem} className="flex items-center gap-4">
                      <span className="text-accent font-display font-bold">{item.year}</span>
                      <span className="w-8 h-[1px] bg-border" />
                      <span className="text-foreground">{item.event}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="relative">
                <Parallax speed={0.1}>
                  <div className="aspect-[4/3] rounded-3xl bg-surface overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                      alt="Équipe Numilex"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Parallax>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="bg-surface py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <FadeUp>
                <span className="section-label text-accent mb-4 inline-flex mx-auto">
                  Nos valeurs
                </span>
              </FadeUp>
              <BlurReveal delay={0.1}>
                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                  <span className="text-balance">
                    Les valeurs qui guident
                    <br />
                    chaque projet.
                  </span>
                </h2>
              </BlurReveal>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="bg-background rounded-2xl border border-border p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Chiffres Clés */}
        <section className="bg-dark py-16 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {stats.map((stat, index) => (
                <FadeUp key={index} delay={index * 0.1} className="text-center">
                  <p className="text-4xl lg:text-5xl font-display font-bold text-accent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-text-muted-light text-sm lg:text-base">{stat.label}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <FadeUp>
                <span className="section-label text-accent mb-4 inline-flex mx-auto">
                  {"L'équipe"}
                </span>
              </FadeUp>
              <BlurReveal delay={0.1}>
                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                  <span className="text-balance">
                    Des experts dédiés
                    <br />
                    à votre réussite.
                  </span>
                </h2>
              </BlurReveal>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {team.map((member) => (
                <motion.div key={member.name} variants={staggerItem} className="text-center group">
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full aspect-square rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <a
                      href="#"
                      className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="w-5 h-5 text-text-light" />
                    </a>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-text-muted text-sm">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pourquoi Nous Choisir */}
        <section className="bg-surface py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <SlideIn direction="left" className="relative order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-3xl bg-background overflow-hidden border border-border">
                  <Image
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
                    alt="Notre approche"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SlideIn>

              <div className="order-1 lg:order-2">
                <FadeUp>
                  <span className="section-label text-accent mb-4 inline-flex">
                    Pourquoi nous ?
                  </span>
                </FadeUp>

                <BlurReveal delay={0.1}>
                  <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
                    <span className="text-balance">
                      Le partenaire clé de votre succès numérique.
                    </span>
                  </h2>
                </BlurReveal>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4 mb-8"
                >
                  {checklist.map((item, index) => (
                    <motion.div key={index} variants={staggerItem} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-4"
                >
                  {["40+ clients", "6+ ans", "4 domaines", "24/7 support"].map((metric) => (
                    <motion.div key={metric} variants={staggerItem} className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light">
                      <Sparkles className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">{metric}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Notre Processus */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <FadeUp>
                <span className="section-label text-accent mb-4 inline-flex mx-auto">
                  Notre approche unique
                </span>
              </FadeUp>
              <BlurReveal delay={0.1}>
                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                  <span className="text-balance">
                    Un processus en 4 étapes
                    <br />
                    pour garantir votre succès.
                  </span>
                </h2>
              </BlurReveal>
            </div>

            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <SlideIn direction={index % 2 === 1 ? "right" : "left"} className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-5xl font-display font-bold text-accent">
                        {step.number}
                      </span>
                      <h3 className="font-display font-semibold text-2xl text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-text-muted text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </SlideIn>
                  <SlideIn direction={index % 2 === 1 ? "left" : "right"} className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Parallax speed={0.05}>
                      <div className="aspect-video rounded-2xl bg-surface overflow-hidden border border-border">
                        <Image
                          src={`https://images.unsplash.com/photo-${
                            index === 0 ? "1454165804606-c3d57bc86b40" :
                            index === 1 ? "1552664730-d307ca884978" :
                            index === 2 ? "1531973576160-7125cd663d86" :
                            "1551288049-bebda4e38f71"
                          }?w=600&h=400&fit=crop`}
                          alt={step.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </Parallax>
                  </SlideIn>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PartnersSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
