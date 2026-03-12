import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABanner } from "@/components/cta-banner"
import { Monitor, Megaphone, Share2, Briefcase, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Nos Solutions | Numilex - Agence Digitale Paris",
  description: "Découvrez nos 4 domaines d'expertise : solutions informatiques, stratégie marketing, social media et accompagnement business. Des solutions sur mesure pour votre entreprise.",
}

const solutions = [
  {
    icon: Monitor,
    title: "Solutions Informatiques",
    description: "Sécurisez vos actifs et optimisez vos processus avec notre audit IT, cybersécurité, développement web et infogérance sur mesure.",
    href: "/services/informatique",
    tags: ["Développement Web", "Cybersécurité", "Infogérance", "Cloud"],
  },
  {
    icon: Megaphone,
    title: "Stratégie Marketing",
    description: "Maximisez votre ROI grâce à des campagnes SEO/SEA ciblées, du content marketing et une identité de marque forte et percutante.",
    href: "/services/marketing",
    tags: ["SEO/SEA", "Content Marketing", "Branding", "Analytics"],
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Fédérez votre communauté et transformez votre engagement social en résultats business concrets et mesurables.",
    href: "/services/social-media",
    tags: ["Community Management", "Création de contenu", "Publicité sociale", "Influence"],
  },
  {
    icon: Briefcase,
    title: "Business Support",
    description: "Optimisez votre efficacité opérationnelle et bénéficiez d'un conseil stratégique pour une croissance maîtrisée.",
    href: "/services/business-support",
    tags: ["Conseil stratégique", "Gestion de projet", "Formation", "Process"],
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark pt-[72px]">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="section-label text-text-muted-light mb-4 inline-flex">
                Nos Solutions
              </span>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-light leading-tight mb-6">
                <span className="text-balance">
                  Des solutions sur mesure pour chaque ambition.
                </span>
              </h1>

              <p className="text-text-muted-light text-lg lg:text-xl leading-relaxed mb-8">
                4 domaines d&apos;expertise complémentaires pour accompagner votre transformation digitale de A à Z.
              </p>

              <Link
                href="/devis"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-text-light font-semibold hover:bg-accent-hover transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              >
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution) => (
                <Link
                  key={solution.title}
                  href={solution.href}
                  className="group bg-surface rounded-3xl border border-border p-10 transition-all duration-300 hover:border-accent hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)]"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center group-hover:bg-accent transition-colors">
                      <solution.icon className="w-8 h-8 text-accent group-hover:text-text-light transition-colors" />
                    </div>
                    <ArrowRight className="w-6 h-6 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>

                  <h2 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-4">
                    {solution.title}
                  </h2>

                  <p className="text-text-muted text-lg leading-relaxed mb-8">
                    {solution.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-background text-text-muted text-xs font-medium border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
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
