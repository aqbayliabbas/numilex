"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Users, TrendingUp, Globe, ChevronDown, MapPin, Clock, Sparkles, Send, CheckCircle2, AlertCircle, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface JobOffer {
  id: number;
  title: string;
  category: string;
  description: string;
  full_details: string;
  location: string;
  salary: string;
}

const whyJoin = [
  {
    icon: Users,
    title: "Culture Collaborative",
    description: "Des équipes soudées, une communication horizontale et des projets qui valorisent chaque initiative.",
  },
  {
    icon: TrendingUp,
    title: "Performance & Leadership",
    description: "Des responsabilités croissantes, des programmes de formation continue et un mentorat sur mesure.",
  },
  {
    icon: Globe,
    title: "Impact Médurable",
    description: "Travaillez sur des missions stratégiques pour des clients variés et voyez l'impact direct de votre talent.",
  },
]

const benefits = [
  "Salaire compétitif + intéressement",
  "Télétravail hybride (2-3 jrs/sem)",
  "Mutuelle premium (Alan)",
  "Budget formation (1500€/an)",
  "Tickets restaurant (Swile)",
  "Team Retraites trimestrielles",
  "Setup MacBook Pro M4 + Display",
  "Culture de l'excellence & confiance",
]

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/backend/api/jobs.php')
        if (response.ok) {
          const data = await response.json()
          setJobs(data)
        }
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    if (selectedJobId) formData.append('job_id', selectedJobId.toString())

    try {
      const response = await fetch('/backend/api/apply.php', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setStatus('success')
        formRef.current?.reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Talents & Ambitions"
          title="Bâtissez votre futur chez Numilex."
          description="Rejoignez un collectif d'experts passionnés basés à Paris. Relevez des défis techniques et stratégiques majeurs au service de l'innovation."
        />

        {/* Pourquoi Nous Rejoindre - Elevated UI */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16 lg:mb-24">
              <span className="text-accent text-xs font-black uppercase tracking-widest mb-4 inline-block">Engagement Carrière</span>
              <h2 className="font-sans font-extrabold text-3xl lg:text-6xl text-foreground leading-tight">
                Une culture de <span className="text-accent underline decoration-accent/20">l'excellence</span>.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {whyJoin.map((item) => (
                <div
                  key={item.title}
                  className="group bg-surface/50 rounded-3xl border border-border/80 p-10 hover:bg-white hover:border-accent/40 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-accent group-hover:shadow-accent/20 transition-all duration-500">
                    <item.icon className="w-8 h-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos Avantages - Glassmorphism */}
        <section className="bg-dark py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="mx-auto max-w-[1200px] px-6 relative z-10">
            <div className="text-center mb-16 lg:mb-20">
              <span className="text-accent/80 text-xs font-black uppercase tracking-widest mb-4 inline-block">Épanouissement</span>
              <h2 className="font-sans font-extrabold text-3xl lg:text-5xl text-white leading-tight">
                Plus qu'un simple <br /> environnement de travail.
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <Sparkles className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-white/80 text-sm font-semibold">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offres d'emploi - Dynamic List */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="text-center mb-16 lg:mb-24">
              <span className="text-accent text-xs font-black uppercase tracking-widest mb-4 inline-block">Offres Ouvertes</span>
              <h2 className="font-sans font-extrabold text-3xl lg:text-6xl text-foreground leading-tight">
                Votre prochain défi <br /> commence ici.
              </h2>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-surface rounded-2xl h-24 w-full" />
                ))
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <details
                    key={job.id}
                    className="group bg-white rounded-3xl border border-border/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/30 transition-all"
                    onToggle={(e) => {
                      if ((e.target as HTMLDetailsElement).open) setSelectedJobId(job.id)
                    }}
                  >
                    <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-sans font-bold text-xl text-foreground group-hover:text-accent transition-colors">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 bg-accent-light text-accent text-[10px] font-black uppercase tracking-widest rounded-full">
                            {job.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-text-muted uppercase tracking-wider">
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{job.salary || 'Package attractif'}</span>
                        </div>
                      </div>
                      <ChevronDown className="w-6 h-6 text-text-muted group-open:rotate-180 transition-transform shrink-0" />
                    </summary>

                    <div className="px-10 pb-10 pt-4 border-t border-border/50 bg-surface/30">
                      <div className="prose prose-sm max-w-none text-text-muted leading-relaxed mb-10 font-medium">
                        <p className="mb-6">{job.description}</p>
                        <hr className="border-border/50 my-8" />
                        <div className="whitespace-pre-wrap">{job.full_details}</div>
                      </div>

                      <div className="bg-white p-10 rounded-[32px] border border-border shadow-2xl">
                        <h4 className="font-sans font-extrabold text-lg text-foreground mb-8 text-center uppercase tracking-widest">Postuler à cette offre</h4>
                        <form ref={formRef} onSubmit={handleApply} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <input type="text" name="first_name" placeholder="Prénom" required className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:outline-none focus:border-accent font-medium" />
                            <input type="text" name="last_name" placeholder="Nom" required className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:outline-none focus:border-accent font-medium" />
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <input type="email" name="email" placeholder="Email professionnel" required className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:outline-none focus:border-accent font-medium" />
                            <input type="tel" name="phone" placeholder="Téléphone" className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:outline-none focus:border-accent font-medium" />
                          </div>
                          <div className="relative">
                            <div className="w-full p-8 border-2 border-dashed border-border rounded-2xl hover:border-accent/50 hover:bg-accent/[0.02] flex flex-col items-center justify-center transition-all cursor-pointer relative group/file">
                              <input type="file" name="cv" accept=".pdf,.doc,.docx" required className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                              <FileText className="w-10 h-10 text-text-muted mb-4 group-hover/file:scale-110 group-hover/file:text-accent transition-all" />
                              <p className="text-sm font-bold text-text-muted group-hover/file:text-accent">Cliquez ou glissez votre CV (PDF, DOCX)</p>
                            </div>
                          </div>
                          <textarea name="message" placeholder="Pourquoi vous ?" rows={4} className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:outline-none focus:border-accent resize-none font-medium" />

                          <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-5 rounded-2xl bg-accent text-white font-black uppercase tracking-widest text-xs hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 disabled:opacity-50"
                          >
                            {status === 'loading' ? 'Envoi du dossier...' : 'Soumettre ma candidature'}
                          </button>

                          {status === 'success' && <div className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-3 font-bold text-sm"><CheckCircle2 className="w-5 h-5" /> Candidature envoyée !</div>}
                          {status === 'error' && <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 font-bold text-sm"><AlertCircle className="w-5 h-5" /> Une erreur s'est produite.</div>}
                        </form>
                      </div>
                    </div>
                  </details>
                ))
              ) : (
                <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                  <p className="text-text-muted font-bold">Aucun poste ouvert pour le moment. Mais restez à l'écoute !</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Candidature Spontanée - Modern CTA */}
        <section className="bg-surface py-24 lg:py-52 text-center border-t border-border">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="font-sans font-extrabold text-3xl lg:text-7xl text-foreground mb-8">
              L'ambition n'attend pas d'ouverture.
            </h2>
            <p className="text-text-muted text-lg lg:text-xl mb-12 max-w-2xl mx-auto font-medium">
              Votre expertise nous intéresse, peu importe le poste. Envoyez-nous votre parcours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact?subject=Candidature Spontanée"
                className="px-16 py-6 rounded-full bg-dark text-white font-black uppercase tracking-widest text-xs hover:bg-dark-mid transition-all shadow-2xl"
              >
                Candidature Spontanée
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
