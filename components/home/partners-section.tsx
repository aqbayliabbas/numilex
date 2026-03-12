"use client"

import { FadeUp } from "@/components/motion"

const partners = [
  { name: "Google", logo: "Google" },
  { name: "Meta", logo: "Meta" },
  { name: "HubSpot", logo: "HubSpot" },
  { name: "Salesforce", logo: "Salesforce" },
  { name: "Shopify", logo: "Shopify" },
  { name: "Stripe", logo: "Stripe" },
]

export function PartnersSection() {
  return (
    <section className="bg-background py-16 lg:py-24 overflow-hidden">
      <FadeUp>
        <div className="mx-auto max-w-[1200px] px-6 mb-8">
          <span className="section-label text-text-muted mx-auto flex justify-center">
            Ils nous font confiance
          </span>
        </div>
      </FadeUp>

      {/* Marquee */}
      <FadeUp delay={0.15}>
        <div className="relative">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {/* First set */}
            {partners.concat(partners).map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-12 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="w-32 h-16 flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-text-muted hover:text-foreground transition-colors">
                    {partner.logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  )
}
