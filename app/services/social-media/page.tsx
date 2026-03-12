import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABanner } from "@/components/cta-banner"
import { ArrowRight, Users, Camera, Target, Calendar, Handshake, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Social Media | Numilex - Agence Digitale Paris",
  description: "Community management, création de contenus, publicité réseaux sociaux. Nous gérons votre présence en ligne de A à Z.",
}

const services = [
  {
    icon: Users,
    title: "Community Management",
    description: "Animation de vos réseaux, réponses aux commentaires, gestion de crise et engagement de votre communauté.",
  },
  {
    icon: Camera,
    title: "Création de Contenus",
    description: "Photos, vidéos Reels, stories, carousels — des contenus percutants adaptés à chaque plateforme.",
  },
  {
    icon: Target,
    title: "Publicité Social Media",
    description: "Campagnes Meta Ads, TikTok Ads, LinkedIn Ads — ciblage précis pour atteindre vos audiences idéales.",
  },
  {
    icon: Calendar,
    title: "Stratégie Éditoriale",
    description: "Calendrier éditorial, ligne directrice, charte de communication adaptée à votre secteur.",
  },
  {
    icon: Handshake,
    title: "Influence & Partenariats",
    description: "Identification et gestion de collaborations avec des créateurs de contenu alignés à votre marque.",
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description: "Suivi des performances, rapports mensuels et ajustements stratégiques basés sur les données.",
  },
]

const platforms = [
  { name: "Instagram", color: "#E4405F" },
  { name: "TikTok", color: "#000000" },
  { name: "LinkedIn", color: "#0A66C2" },
  { name: "Facebook", color: "#1877F2" },
  { name: "YouTube", color: "#FF0000" },
  { name: "Pinterest", color: "#BD081C" },
  { name: "X", color: "#000000" },
]

export default function SocialMediaPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark pt-[72px]">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="section-label text-text-muted-light mb-4 inline-flex">
                Social Media
              </span>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-light leading-tight mb-6">
                <span className="text-balance">
                  Engagez, fidélisez, transformez.
                </span>
              </h1>

              <p className="text-text-muted-light text-lg lg:text-xl leading-relaxed mb-8">
                {"Community management, création de contenus, publicité réseaux sociaux — nous gérons votre présence en ligne de A à Z."}
              </p>

              <Link
                href="/devis"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-text-light font-semibold hover:bg-accent-hover transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              >
                Démarrer maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Présentation */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl bg-surface overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
                    alt="Social Media Numilex"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
              </div>

              <div>
                <span className="section-label text-accent mb-4 inline-flex">
                  Notre expertise
                </span>

                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
                  <span className="text-balance">
                    {"Votre image de marque, amplifiée."}
                  </span>
                </h2>

                <p className="text-text-muted text-lg leading-relaxed">
                  {"Les réseaux sociaux sont devenus incontournables pour construire une relation de confiance avec votre audience. Notre équipe de community managers et créateurs de contenu vous aide à développer une présence forte, authentique et engageante sur toutes les plateformes pertinentes pour votre activité."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-surface py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <span className="section-label text-accent mb-4 inline-flex mx-auto">
                Nos prestations
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                <span className="text-balance">
                  Ce que nous faisons concrètement.
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-background rounded-2xl border border-border p-8 transition-all duration-300 hover:border-accent hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)]"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent-light flex items-center justify-center mb-6">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plateformes */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                <span className="text-balance">
                  Nous maîtrisons toutes les plateformes.
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="px-8 py-4 rounded-full bg-surface border border-border hover:border-accent hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] transition-all"
                >
                  <span className="font-display font-semibold text-foreground">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
