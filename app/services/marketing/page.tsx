import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABanner } from "@/components/cta-banner"
import { ArrowRight, Search, Target, Palette, FileText, Mail, BarChart3, ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Solutions Marketing | Numilex - Agence Digitale Paris",
  description: "Stratégie digitale, SEO/SEA, campagnes Google & Meta, branding et identité visuelle. Des campagnes marketing qui génèrent des résultats.",
}

const services = [
  {
    icon: Search,
    title: "SEO & Référencement Naturel",
    description: "Audit SEO, optimisation on-page, netlinking et stratégie de contenu pour améliorer votre visibilité organique.",
  },
  {
    icon: Target,
    title: "Publicité en Ligne (SEA)",
    description: "Campagnes Google Ads, Meta Ads, LinkedIn Ads optimisées pour maximiser votre retour sur investissement.",
  },
  {
    icon: Palette,
    title: "Branding & Identité Visuelle",
    description: "Logo, charte graphique, guide de marque — construire une identité forte et mémorable.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    description: "Création de contenus engageants — articles, vidéos, infographies — pour attirer et convertir vos prospects.",
  },
  {
    icon: Mail,
    title: "Email Marketing & Automation",
    description: "Séquences email, newsletters, scénarios automatisés pour nurturing et fidélisation.",
  },
  {
    icon: BarChart3,
    title: "Analyse & Reporting",
    description: "Tableaux de bord, rapports mensuels, suivi des KPIs et recommandations d'optimisation continue.",
  },
]

const tags = ["SEO", "Google Ads", "Meta Ads", "Branding", "Email Marketing", "Contenu"]

const metrics = [
  { value: "+180%", label: "Trafic organique moyen (6 mois)" },
  { value: "x3.4", label: "Retour sur investissement publicitaire" },
  { value: "-40%", label: "Coût d'acquisition client" },
]

const faqs = [
  {
    question: "Quel budget minimum pour une campagne Google Ads ?",
    answer: "Nous recommandons un budget minimum de 500€/mois pour obtenir des résultats significatifs, mais nous adaptons nos recommandations selon vos objectifs.",
  },
  {
    question: "Combien de temps pour voir des résultats en SEO ?",
    answer: "Le SEO est un investissement à moyen-long terme. Les premiers résultats apparaissent généralement entre 3 et 6 mois selon la concurrence de votre secteur.",
  },
  {
    question: "Créez-vous aussi les contenus visuels ?",
    answer: "Oui, notre équipe créative réalise tous types de contenus : visuels pour réseaux sociaux, vidéos, infographies, photos produits, etc.",
  },
  {
    question: "Proposez-vous des formations marketing ?",
    answer: "Absolument. Nous formons vos équipes sur les outils et bonnes pratiques du marketing digital.",
  },
]

export default function MarketingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark pt-[72px]">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="section-label text-text-muted-light mb-4 inline-flex">
                Solutions Marketing
              </span>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-light leading-tight mb-6">
                <span className="text-balance">
                  Développez votre marque, attirez vos clients.
                </span>
              </h1>

              <p className="text-text-muted-light text-lg lg:text-xl leading-relaxed mb-8">
                {"Stratégie digitale, SEO, publicité en ligne, branding — des campagnes percutantes qui génèrent des résultats concrets."}
              </p>

              <Link
                href="/devis"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-text-light font-semibold hover:bg-accent-hover transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              >
                Demander une stratégie gratuite
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
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                    alt="Solutions Marketing Numilex"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
              </div>

              <div>
                <span className="section-label text-accent mb-4 inline-flex">
                  Notre approche marketing
                </span>

                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
                  <span className="text-balance">
                    Une stratégie digitale construite pour vous.
                  </span>
                </h2>

                <p className="text-text-muted text-lg leading-relaxed mb-8">
                  {"Chaque marque est unique. Nous développons des stratégies marketing sur mesure qui combinent data, créativité et performance pour vous démarquer de la concurrence et attirer vos cibles idéales."}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-accent-light text-accent text-sm font-medium border border-[#C7D9FA]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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

        {/* Résultats */}
        <section className="bg-dark py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <span className="section-label text-text-muted-light mb-4 inline-flex mx-auto">
                Nos résultats
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-text-light leading-tight">
                <span className="text-balance">
                  {"Des chiffres qui parlent d'eux-mêmes."}
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-dark-card rounded-2xl p-8 text-center">
                  <p className="text-5xl lg:text-6xl font-display font-bold text-accent mb-4">
                    {metric.value}
                  </p>
                  <p className="text-text-muted-light">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <span className="section-label text-accent mb-4 inline-flex mx-auto">
                Questions fréquentes
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                <span className="text-balance">
                  Tout ce que vous voulez savoir.
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-background rounded-2xl border border-border p-6"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <span className="font-display font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-text-muted group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <p className="mt-4 text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
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
