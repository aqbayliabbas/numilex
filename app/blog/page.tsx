"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageHero } from "@/components/page-hero"
import { ArrowRight, Clock, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["Tous", "Informatique", "Marketing", "Social Media", "Business"]

interface Article {
  id: number;
  category: string;
  image_url: string;
  title: string;
  posted_at: string;
  read_time: string;
  description: string;
  content: string;
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const url = activeCategory === "Tous"
          ? '/backend/api/blogs.php'
          : `/backend/api/blogs.php?category=${encodeURIComponent(activeCategory)}`

        const response = await fetch(url)
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        }
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [activeCategory])

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Réflexions & Stratégies"
          title="L'expertise Numilex partagée."
          description="Décryptage des tendances, guides pratiques et analyses sectorielles pour propulser votre croissance numérique."
        />

        {/* Filters + Grid */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-[1200px] px-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-16 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setLoading(true)
                  }}
                  className={cn(
                    "px-8 py-4 rounded-xl font-bold text-sm transition-all border",
                    activeCategory === category
                      ? "bg-dark text-white border-dark shadow-xl shadow-dark/10"
                      : "bg-surface text-text-muted border-border hover:border-accent/30 hover:text-accent"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {loading ? (
                // Skeleton loading state
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-surface rounded-3xl h-[450px]" />
                ))
              ) : articles.length > 0 ? (
                articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.id}`}
                    className="group bg-white rounded-3xl border border-border/60 overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-dark/5"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md text-accent text-[10px] font-black uppercase tracking-widest border border-white/20">
                        <Tag className="w-3 h-3" />
                        {article.category}
                      </div>
                      <Image
                        src={article.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop'}
                        alt={article.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-xs text-text-muted mb-4 font-semibold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          {article.read_time}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{new Date(article.posted_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>

                      <h3 className="font-sans font-bold text-xl lg:text-2xl text-foreground mb-4 leading-snug group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-text-muted text-sm leading-relaxed mb-8 line-clamp-3">
                        {article.description}
                      </p>

                      <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        {"Consulter"}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                    <Tag className="w-10 h-10 text-text-muted/30" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Aucun article trouvé</h3>
                  <p className="text-text-muted">Revenez bientôt pour de nouvelles actualités !</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter - Premium CTA */}
        <section className="bg-dark py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

          <div className="mx-auto max-w-[1200px] px-6 relative z-10">
            <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-10 lg:p-20 border border-white/10 text-center max-w-4xl mx-auto shadow-2xl">
              <span className="text-accent text-xs font-black uppercase tracking-widest mb-4 inline-block">Newsletter Stratégique</span>
              <h2 className="font-sans font-extrabold text-3xl lg:text-6xl text-white mb-8 leading-tight">
                Recevez nos analyses <br /> en <span className="text-accent underline decoration-accent/20">avant-première</span>.
              </h2>

              <p className="text-text-muted-light text-lg mb-12 max-w-2xl mx-auto font-medium">
                Conseils exclusifs, tendances du marché et retours d'expérience livrés chaque mois.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-text-muted-light focus:outline-none focus:border-accent transition-all font-medium"
                />
                <button
                  type="submit"
                  className="px-10 py-5 rounded-2xl bg-accent text-white font-black uppercase tracking-widest text-xs hover:bg-accent-hover transition-all shadow-xl shadow-accent/20"
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
