"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { Clock, Lock, Headphones, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { number: 1, title: "Votre besoin" },
  { number: 2, title: "Votre projet" },
  { number: 3, title: "Vos coordonnées" },
]

const services = [
  "Solutions Informatiques",
  "Solutions Marketing",
  "Social Media",
  "Business Support",
  "Plusieurs services",
]

const budgets = [
  "Moins de 1 000 €",
  "1 000 – 5 000 €",
  "5 000 – 15 000 €",
  "15 000 € et plus",
]

const timelines = [
  "Urgent (< 1 mois)",
  "Court terme (1–3 mois)",
  "Moyen terme (3–6 mois)",
]

const reassurance = [
  { icon: Clock, title: "Réponse sous 24h", description: "Notre équipe traite votre demande en priorité." },
  { icon: Lock, title: "Données sécurisées", description: "Vos informations sont confidentielles et protégées." },
  { icon: Headphones, title: "Interlocuteur dédié", description: "Un expert vous suit de A à Z, du devis à la livraison." },
]

const whyChooseUs = [
  "Réponse sous 24h",
  "Devis 100% gratuit",
  "Sans engagement",
  "Accompagnement dédié",
]

export default function DevisPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<string[]>([])
  const [formData, setFormData] = useState({
    service: "",
    budget: "",
    timeline: "",
    description: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  })

  const validateStep = (step: number) => {
    const newErrors: string[] = []
    if (step === 1) {
      if (!formData.service) newErrors.push("Veuillez sélectionner un service.")
    } else if (step === 2) {
      if (!formData.budget) newErrors.push("Veuillez sélectionner un budget.")
      if (!formData.timeline) newErrors.push("Veuillez sélectionner un délai.")
      if (!formData.description) newErrors.push("Veuillez décrire brièvement votre projet.")
    } else if (step === 3) {
      if (!formData.firstName) newErrors.push("Le prénom est obligatoire.")
      if (!formData.lastName) newErrors.push("Le nom est obligatoire.")
      if (!formData.email) newErrors.push("L'email est obligatoire.")
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.push("L'adresse email est invalide.")
    }
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
        window.scrollTo({ top: 300, behavior: 'smooth' })
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setErrors([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(3)) return

    setStatus('loading')
    try {
      const response = await fetch('/backend/api/devis.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: `${formData.service} (${formData.budget})`,
          message: `Délai: ${formData.timeline}\n\nDescription: ${formData.description}\n\nEntreprise: ${formData.company}`
        })
      })

      if (response.ok) {
        setStatus('success')
        setCurrentStep(4) // Move to a "Success" state
      } else {
        setStatus('error')
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Devis Gratuit"
          title="Démarrons votre projet ensemble."
          description="Remplissez le formulaire ci-dessous. Notre équipe vous répond sous 24h avec une proposition personnalisée."
        />

        {/* Multi-step Form */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left - Form */}
              <div className="lg:col-span-3">
                {currentStep <= 3 ? (
                  <>
                    {/* Step Indicator */}
                    <div className="flex items-center gap-4 mb-12">
                      {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                                currentStep >= step.number
                                  ? "bg-accent text-text-light"
                                  : "bg-surface text-text-muted"
                              )}
                            >
                              {step.number}
                            </div>
                            <span
                              className={cn(
                                "text-sm font-medium hidden sm:block",
                                currentStep >= step.number ? "text-foreground" : "text-text-muted"
                              )}
                            >
                              {step.title}
                            </span>
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={cn(
                                "w-12 lg:w-24 h-[2px] mx-2",
                                currentStep > step.number ? "bg-accent" : "bg-border"
                              )}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSubmit}>
                      {/* Errors Display */}
                      {errors.length > 0 && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl animate-fade-in">
                          <ul className="list-disc list-inside text-red-600 text-sm font-medium">
                            {errors.map((err, i) => <li key={i}>{err}</li>)}
                          </ul>
                        </div>
                      )}

                      {/* Step 1 */}
                      {currentStep === 1 && (
                        <div className="space-y-6 animate-fade-up">
                          <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                            Quel service vous intéresse ?
                          </h2>
                          <div className="space-y-3">
                            {services.map((service) => (
                              <label
                                key={service}
                                className={cn(
                                  "flex items-center gap-4 p-5 rounded-xl border cursor-pointer transition-all",
                                  formData.service === service
                                    ? "border-accent bg-accent-light"
                                    : "border-border hover:border-accent"
                                )}
                              >
                                <input
                                  type="radio"
                                  name="service"
                                  value={service}
                                  checked={formData.service === service}
                                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                  className="sr-only"
                                />
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                    formData.service === service
                                      ? "border-accent bg-accent"
                                      : "border-border"
                                  )}
                                >
                                  {formData.service === service && (
                                    <div className="w-2 h-2 rounded-full bg-text-light" />
                                  )}
                                </div>
                                <span className="text-foreground font-medium">{service}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 2 */}
                      {currentStep === 2 && (
                        <div className="space-y-8 animate-fade-up">
                          <div>
                            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                              Budget estimé
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                              {budgets.map((budget) => (
                                <label
                                  key={budget}
                                  className={cn(
                                    "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                                    formData.budget === budget
                                      ? "border-accent bg-accent-light"
                                      : "border-border hover:border-accent"
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="budget"
                                    value={budget}
                                    checked={formData.budget === budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    className="sr-only"
                                  />
                                  <div
                                    className={cn(
                                      "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                                      formData.budget === budget
                                        ? "border-accent bg-accent"
                                        : "border-border"
                                    )}
                                  >
                                    {formData.budget === budget && (
                                      <div className="w-1.5 h-1.5 rounded-full bg-text-light" />
                                    )}
                                  </div>
                                  <span className="text-foreground text-sm">{budget}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                              Délai souhaité
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                              {timelines.map((timeline) => (
                                <label
                                  key={timeline}
                                  className={cn(
                                    "flex items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all text-center",
                                    formData.timeline === timeline
                                      ? "border-accent bg-accent-light"
                                      : "border-border hover:border-accent"
                                  )}
                                >
                                  <input
                                    type="radio"
                                    name="timeline"
                                    value={timeline}
                                    checked={formData.timeline === timeline}
                                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                    className="sr-only"
                                  />
                                  <span className="text-foreground text-sm w-full">{timeline}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
                              Décrivez votre projet *
                            </label>
                            <textarea
                              id="description"
                              rows={5}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent resize-none font-medium"
                              placeholder="Décrivez brièvement votre projet, vos objectifs et vos attentes..."
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 3 */}
                      {currentStep === 3 && (
                        <div className="space-y-6 animate-fade-up">
                          <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                            Vos coordonnées
                          </h2>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                                Prénom *
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent font-medium"
                              />
                            </div>
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                                Nom *
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent font-medium"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email professionnel *
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent font-medium"
                                placeholder="votre@entreprise.com"
                              />
                            </div>
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                Téléphone
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent font-medium"
                                placeholder="+33 6 XX XX XX XX"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                              Entreprise
                            </label>
                            <input
                              type="text"
                              id="company"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted focus:outline-none focus:border-accent font-medium"
                            />
                          </div>

                          {status === 'error' && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl font-bold flex items-center gap-2">
                              <AlertCircle className="w-5 h-5" />
                              Une erreur est survenue lors de l'envoi. Veuillez réessayer.
                            </div>
                          )}
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
                        {currentStep > 1 ? (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-bold text-sm uppercase tracking-widest hover:bg-surface transition-all"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            Retour
                          </button>
                        ) : (
                          <div />
                        )}

                        {currentStep < 3 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-accent text-text-light font-black text-xs uppercase tracking-widest hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 hover:-translate-y-1 active:translate-y-0"
                          >
                            Etape Suivante
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="inline-flex items-center gap-2 px-12 py-5 rounded-xl bg-dark text-text-light font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-dark/20 disabled:opacity-50 hover:-translate-y-1 active:translate-y-0"
                          >
                            {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="py-12 animate-fade-up text-center lg:text-left">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-lg shadow-green-500/20">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-foreground mb-4">Demande reçue !</h2>
                    <p className="text-text-muted text-xl font-medium mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                      Merci <span className="text-accent font-bold">{formData.firstName}</span>. Votre projet est entre de bonnes mains. Un de nos experts vous contactera sous 24h ouvrées.
                    </p>
                    <button
                      onClick={() => window.location.href = "/"}
                      className="inline-flex items-center gap-2 px-10 py-5 rounded-xl border-2 border-dark text-dark font-black text-xs uppercase tracking-widest hover:bg-dark hover:text-white transition-all"
                    >
                      Retour à l'accueil
                    </button>
                  </div>
                )}
              </div>

              {/* Right - Sidebar */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-border rounded-[40px] p-8 lg:p-10 sticky top-[120px] shadow-xl shadow-dark/[0.02]">
                  <h3 className="font-display font-black text-2xl text-foreground mb-8">
                    Pourquoi nous choisir ?
                  </h3>

                  <div className="space-y-6 mb-10">
                    {whyChooseUs.map((item) => (
                      <div key={item} className="flex items-center gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-foreground font-semibold uppercase tracking-tight text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-border mt-auto">
                    <div className="bg-surface rounded-2xl p-6 relative">
                      <Quote className="absolute top-2 right-4 w-12 h-12 text-accent/5" />
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                            alt="Alexandre Martin"
                            width={56}
                            height={56}
                            className="w-14 h-14 rounded-2xl object-cover shadow-md"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                        </div>
                        <div>
                          <p className="font-black text-foreground text-sm uppercase">Alexandre Martin</p>
                          <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Directeur Commercial</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-muted italic leading-relaxed font-medium">
                        "Nous analysons chaque projet avec une approche stratégique pour garantir un ROI immédiat à nos partenaires."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance */}
        <section className="bg-surface py-24 border-y border-border">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {reassurance.map((item) => (
                <div key={item.title} className="group">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-xl transition-all">
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-display font-black text-xl text-foreground mb-3 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import { AlertCircle, Quote } from "lucide-react"
