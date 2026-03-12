import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABanner } from "@/components/cta-banner"
import { ArrowRight, Compass, Settings, GraduationCap, Users, FolderKanban, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Business Support | Numilex - Agence Digitale Paris",
  description: "Conseil stratégique, optimisation des processus, formation et accompagnement. Élevez votre entreprise à un nouveau niveau.",
}

const services = [
  {
    icon: Compass,
    title: "Conseil Stratégique",
    description: "Diagnostic d'entreprise, recommandations actionables et plan de développement sur mesure.",
  },
  {
    icon: Settings,
    title: "Optimisation des Processus",
    description: "Cartographie des flux, identification des inefficacités et mise en place de solutions d'amélioration.",
  },
  {
    icon: GraduationCap,
    title: "Formation Digitale",
    description: "Ateliers et formations pour vos équipes sur les outils digitaux, les réseaux sociaux et les bonnes pratiques.",
  },
  {
    icon: Users,
    title: "Accompagnement RH",
    description: "Recrutement, intégration, gestion des talents et développement des compétences internes.",
  },
  {
    icon: FolderKanban,
    title: "Gestion de Projet",
    description: "Pilotage de projets complexes, coordination des équipes et suivi des livrables dans les délais.",
  },
  {
    icon: Eye,
    title: "Veille & Intelligence Économique",
    description: "Suivi des tendances, analyse concurrentielle et recommandations pour anticiper les évolutions du marché.",
  },
]

export default function BusinessSupportPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark pt-[72px]">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="section-label text-text-muted-light mb-4 inline-flex">
                Business Support
              </span>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-light leading-tight mb-6">
                <span className="text-balance">
                  Élevez votre entreprise à un nouveau niveau.
                </span>
              </h1>

              <p className="text-text-muted-light text-lg lg:text-xl leading-relaxed mb-8">
                {"Conseil stratégique, optimisation des processus, formation et accompagnement — nous sommes là à chaque étape de votre croissance."}
              </p>

              <Link
                href="/devis"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-text-light font-semibold hover:bg-accent-hover transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              >
                Demander un diagnostic
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
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop"
                    alt="Business Support Numilex"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
              </div>

              <div>
                <span className="section-label text-accent mb-4 inline-flex">
                  Notre approche
                </span>

                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
                  <span className="text-balance">
                    {"Un partenaire pour votre croissance."}
                  </span>
                </h2>

                <p className="text-text-muted text-lg leading-relaxed">
                  {"Au-delà des aspects techniques et marketing, nous accompagnons les entreprises dans leur développement global. Stratégie, organisation, formation — nous vous aidons à structurer votre croissance et à développer le plein potentiel de vos équipes."}
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

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
