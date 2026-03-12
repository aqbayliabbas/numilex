"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { MapPin, Mail, Phone, Clock, Linkedin, Instagram, Facebook, Twitter, CheckCircle2, AlertCircle } from "lucide-react"

const contactInfo = [
  { icon: MapPin, label: "Adresse", value: "Paris, France" },
  { icon: Mail, label: "Email", value: "hello@numilex.com", href: "mailto:hello@numilex.com" },
  { icon: Phone, label: "Téléphone", value: "+33 (0)1 XX XX XX XX", href: "tel:+33100000000" },
  { icon: Clock, label: "Horaires", value: "Lun–Ven, 9h–18h" },
]

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "X", href: "#", icon: Twitter },
]

const subjects = [
  "Solutions Informatiques",
  "Solutions Marketing",
  "Social Media",
  "Business Support",
  "Autre",
]

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = {
      first_name: formData.get('firstName'),
      last_name: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/backend/api/devis.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
          label="Devis Gratuit"
          title="Prêt à lancer votre projet ?"
          description="Demandez votre devis gratuit dès aujourd'hui. Notre équipe d'experts analyse vos besoins pour vous proposer la solution la plus adaptée."
        />

        {/* Contact Split */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left - Contact Info */}
              <div className="lg:col-span-2">
                <div className="space-y-6 mb-8 text-left">
                  <h2 className="text-3xl font-extrabold text-foreground mb-6 leading-tight">Pourquoi nous faire <span className="text-accent underline decoration-accent/10">confiance ?</span></h2>
                  <p className="text-text-muted font-medium mb-10 leading-relaxed">
                    Chez Numilex, nous ne nous contentons pas de fournir des services, nous bâtissons des partenariats durables basés sur la performance et la transparence.
                  </p>
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-foreground font-medium hover:text-accent transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-sm text-text-muted mb-4">Suivez-nous</p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-text-muted hover:bg-accent hover:text-text-light transition-colors"
                        aria-label={social.name}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Form */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-[40px] p-8 lg:p-12 border border-border shadow-xl shadow-dark/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent/10 transition-colors" />

                  <h2 className="font-sans font-black text-3xl text-foreground mb-2">
                    Demande de <span className="text-accent">Devis</span>
                  </h2>
                  <p className="text-text-muted font-medium mb-10">Réponse garantie sous 24h ouvrées.</p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-3">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          className="w-full px-6 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted/30 focus:outline-none focus:border-accent font-medium"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-3">
                          Nom *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          className="w-full px-6 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted/30 focus:outline-none focus:border-accent font-medium"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-3">
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-6 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted/30 focus:outline-none focus:border-accent font-medium"
                          placeholder="votre@entreprise.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-3">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-6 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted/30 focus:outline-none focus:border-accent font-medium"
                          placeholder="+33 6 XX XX XX XX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-3">
                        Service concerné
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full px-6 py-4 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:border-accent appearance-none font-medium"
                      >
                        <option value="">Sélectionnez un service</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest text-text-muted mb-3">
                        Détails de votre projet *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full px-6 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-text-muted/30 focus:outline-none focus:border-accent resize-none font-medium"
                        placeholder="Décrivez brièvement vos objectifs..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full md:w-auto px-12 py-5 rounded-xl bg-dark text-text-light font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-dark/10 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:translate-y-0"
                    >
                      {status === 'loading' ? 'Envoi du devis...' : 'Obtenir mon devis gratuit'}
                    </button>

                    {status === 'success' && (
                      <div className="flex items-center gap-4 p-6 rounded-[24px] bg-green-500 text-white shadow-lg shadow-green-500/20 animate-fade-up">
                        <CheckCircle2 className="w-8 h-8 shrink-0" />
                        <div>
                          <p className="font-bold">Demande envoyée !</p>
                          <p className="text-xs opacity-90 font-medium">Votre demande de devis est en cours d'analyse. Un expert vous contactera sous 24h.</p>
                        </div>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-700 border border-red-100 animate-fade-in">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Une erreur est survenue. Veuillez réessayer ou nous contacter par email.</span>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="rounded-3xl overflow-hidden h-[400px] bg-background border border-border flex items-center justify-center relative group">
              <div className="absolute inset-0 bg-dark/5 group-hover:bg-transparent transition-colors z-0" />
              <div className="text-center relative z-10 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-xl text-foreground mb-1">Notre Bureau</h3>
                <p className="text-text-muted">75008 Paris, France</p>
                <div className="mt-6">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent font-bold text-sm underline decoration-accent/20 hover:decoration-accent transition-all"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
