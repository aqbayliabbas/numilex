"use client"

import { useRef } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { BlurReveal, FadeUp, ScaleIn } from "@/components/motion"

const testimonials = [
  {
    quote: "Numilex a transformé notre présence en ligne en quelques semaines. Leur équipe est réactive, créative et vraiment investie dans nos projets.",
    author: "Marie D.",
    role: "Directrice, Semefer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    quote: "Grâce à leur expertise en marketing digital, nous avons triplé notre trafic organique en 6 mois. Un partenaire de confiance.",
    author: "Thomas L.",
    role: "CEO, TechStartup",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    quote: "Leur approche personnalisée et leur disponibilité 24/7 font toute la différence. Je recommande Numilex sans hésitation.",
    author: "Sophie M.",
    role: "Responsable Marketing, Retail Plus",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    quote: "Une équipe professionnelle qui comprend vraiment les enjeux business. Nos réseaux sociaux n'ont jamais été aussi performants.",
    author: "Pierre B.",
    role: "Fondateur, AgenceX",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
]

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <FadeUp>
              <span className="section-label text-accent mb-4 inline-flex">
                Ils nous font confiance
              </span>
            </FadeUp>
            <BlurReveal delay={0.1}>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                <span className="text-balance">
                  Ce que disent
                  <br />
                  nos clients.
                </span>
              </h2>
            </BlurReveal>
          </div>

          {/* Navigation Buttons */}
          <FadeUp delay={0.2}>
            <div className="flex items-center gap-2 mt-6 lg:mt-0">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </FadeUp>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <ScaleIn key={index} delay={index * 0.1} className="flex-shrink-0 w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] snap-start">
              <div className="bg-background rounded-2xl border border-border p-8 h-full">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  )
}
