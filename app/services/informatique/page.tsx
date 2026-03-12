import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CTABanner } from "@/components/cta-banner"
import { ArrowRight, Monitor, Shield, Server, Code, Cloud, FileSearch, ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Solutions Informatiques | Numilex - Agence Digitale Paris",
  description: "Développement web, cybersécurité, infogérance, audit IT et intégration de systèmes. Des solutions informatiques sur mesure pour votre entreprise.",
}

const services = [
  {
    icon: Code,
    title: "Développement Web & Mobile",
    description: "Sites vitrines, e-commerce, applications mobiles et plateformes sur mesure. Technologies modernes, code propre.",
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    description: "Audit de sécurité, protection des données, RGPD, pare-feu, et sensibilisation des équipes.",
  },
  {
    icon: Server,
    title: "Infogérance & Maintenance",
    description: "Gestion de votre parc informatique, maintenance préventive, support utilisateurs et helpdesk.",
  },
  {
    icon: Monitor,
    title: "Intégration de Systèmes",
    description: "Connexion de vos outils (ERP, CRM, APIs), automatisation des flux et interopérabilité des plateformes.",
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description: "Migration cloud, hébergement sécurisé, sauvegarde automatisée et optimisation des coûts serveur.",
  },
  {
    icon: FileSearch,
    title: "Audit & Conseil IT",
    description: "Diagnostic complet de votre infrastructure, recommandations stratégiques et accompagnement à la transformation.",
  },
]

const tags = ["Développement Web", "Cybersécurité", "Infogérance", "Audit IT", "Cloud"]

const methodSteps = [
  {
    title: "Plan",
    description: "Nous mesurons vos besoins, analysons l'existant et définissons des objectifs clairs et atteignables.",
  },
  {
    title: "Action",
    description: "Développement de solutions personnalisées, sécurisation des données et intégration fluide dans vos systèmes.",
  },
  {
    title: "Résultats",
    items: [
      "Sécurité des données renforcée",
      "Productivité et efficacité améliorées",
      "Infrastructure fiable et évolutive",
    ],
  },
]

const caseStudy = {
  client: "Semefer",
  challenge: "Infrastructure vieillissante, pertes de données fréquentes",
  solution: "Migration cloud + audit cybersécurité + refonte du SI",
  metrics: [
    { value: "-70%", label: "Incidents IT" },
    { value: "+45%", label: "Productivité" },
    { value: "100%", label: "Conformité RGPD" },
  ],
}

const faqs = [
  {
    question: "Combien coûte un audit IT ?",
    answer: "Nos audits sont sur devis selon la taille de votre structure. Contactez-nous pour une évaluation gratuite initiale.",
  },
  {
    question: "Intervenez-vous en urgence ?",
    answer: "Oui. Notre support est disponible 24h/24, 7j/7 pour les urgences.",
  },
  {
    question: "Travaillez-vous avec les PME ?",
    answer: "Absolument. La majorité de nos clients sont des PME et ETI.",
  },
  {
    question: "Proposez-vous des contrats de maintenance ?",
    answer: "Oui, des contrats mensuels ou annuels adaptés à vos besoins.",
  },
]

export default function InformatiquePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark pt-[72px]">
          <div className="mx-auto max-w-[1200px] px-6 py-24 lg:py-32">
            <div className="max-w-3xl">
              <span className="section-label text-text-muted-light mb-4 inline-flex">
                Solutions Informatiques
              </span>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-text-light leading-tight mb-6">
                <span className="text-balance">
                  Optimisez votre performance IT.
                </span>
              </h1>

              <p className="text-text-muted-light text-lg lg:text-xl leading-relaxed mb-8">
                {"Infrastructure, sécurité, développement web et intégration de systèmes — des solutions sur mesure pour booster votre efficacité."}
              </p>

              <Link
                href="/devis"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-text-light font-semibold hover:bg-accent-hover transition-all hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
              >
                Demander un audit gratuit
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
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                    alt="Solutions Informatiques Numilex"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
              </div>

              <div>
                <span className="section-label text-accent mb-4 inline-flex">
                  Ce que nous proposons
                </span>

                <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground mb-6 leading-tight">
                  <span className="text-balance">
                    Des solutions informatiques personnalisées pour chaque besoin.
                  </span>
                </h2>

                <p className="text-text-muted text-lg leading-relaxed mb-8">
                  {"Nos experts analysent vos systèmes existants et conçoivent des solutions adaptées pour améliorer vos performances, sécuriser vos données et faciliter la collaboration interne."}
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

        {/* Notre Méthode */}
        <section className="bg-dark py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <span className="section-label text-text-muted-light mb-4 inline-flex mx-auto">
                Notre méthode
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-text-light leading-tight">
                Plan. Action. Résultats.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {methodSteps.map((step, index) => (
                <div key={index} className="bg-dark-card rounded-2xl p-8">
                  <h3 className="font-display font-semibold text-xl text-text-light mb-4">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-text-muted-light leading-relaxed">
                      {step.description}
                    </p>
                  )}
                  {step.items && (
                    <ul className="space-y-3">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                          <span className="text-text-muted-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Étude de Cas */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16">
              <span className="section-label text-accent mb-4 inline-flex mx-auto">
                Étude de cas
              </span>
              <h2 className="font-display font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                <span className="text-balance">
                  Un projet concret, des résultats mesurables.
                </span>
              </h2>
            </div>

            <div className="bg-surface rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <p className="text-sm text-text-muted mb-2">Client</p>
                  <p className="font-display font-semibold text-xl text-foreground mb-6">
                    {caseStudy.client}
                  </p>
                  
                  <p className="text-sm text-text-muted mb-2">Défi</p>
                  <p className="text-foreground mb-6">{caseStudy.challenge}</p>
                  
                  <p className="text-sm text-text-muted mb-2">Solution</p>
                  <p className="text-foreground">{caseStudy.solution}</p>
                </div>
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                    alt="Étude de cas Semefer"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {caseStudy.metrics.map((metric, index) => (
                  <div key={index} className="bg-background rounded-2xl p-6 text-center">
                    <p className="text-3xl lg:text-4xl font-display font-bold text-accent mb-2">
                      {metric.value}
                    </p>
                    <p className="text-sm text-text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
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
