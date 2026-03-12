"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { BlurReveal, FadeUp, motion, staggerContainer, staggerItem } from "@/components/motion"

const steps = [
  {
    number: "01",
    title: "Audit & Découverte",
    description: "Nous analysons votre situation actuelle et vos besoins.",
  },
  {
    number: "02",
    title: "Stratégie & Conception",
    description: "Nous définissons un plan d'action clair, adapté à vos objectifs.",
  },
  {
    number: "03",
    title: "Déploiement & Exécution",
    description: "Nos équipes implémentent les solutions retenues.",
  },
  {
    number: "04",
    title: "Suivi & Optimisation",
    description: "Rapports, ajustements continus et support dédié.",
  },
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeUp>
            <span className="section-label text-accent mb-4 inline-flex mx-auto">
              Notre processus
            </span>
          </FadeUp>
          <BlurReveal delay={0.1}>
            <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
              <span className="text-balance">
                Comment nous travaillons
                <br />
                avec vous.
              </span>
            </h2>
          </BlurReveal>
        </div>

        {/* Stepper */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-border" />
          <div
            className="hidden lg:block absolute top-8 left-0 h-[2px] bg-accent transition-all duration-500"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                onMouseEnter={() => setActiveStep(index)}
                className="relative cursor-pointer group"
              >
                {/* Step Number */}
                <div className="flex justify-center lg:justify-start mb-6">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      index <= activeStep
                        ? "bg-accent border-accent text-text-light"
                        : "bg-background border-border text-text-muted group-hover:border-accent group-hover:text-accent"
                    )}
                  >
                    <span className="font-display font-bold text-lg">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center lg:text-left">
                  <h3 className="font-display font-semibold text-lg lg:text-xl text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
