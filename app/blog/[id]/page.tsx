"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Clock, Calendar, Tag, Share2, Facebook, Linkedin, Twitter, MessageSquare } from "lucide-react"

interface Article {
    id: number;
    category: string;
    image_url: string;
    title: string;
    description: string;
    content: string;
    posted_at: string;
    read_time: string;
    seo_tags: string;
}

export default function BlogPostPage() {
    const { id } = useParams()
    const router = useRouter()
    const [article, setArticle] = useState<Article | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`/backend/api/blogs.php?id=${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setArticle(data)
                } else {
                    router.push("/blog")
                }
            } catch (error) {
                console.error("Fetch error:", error)
                router.push("/blog")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchArticle()
    }, [id, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center animate-pulse">
                <div className="text-center">
                    <div className="w-12 h-12 bg-surface rounded-full mx-auto mb-4" />
                    <p className="text-text-muted font-bold text-sm uppercase tracking-widest">Chargement de l'expertise...</p>
                </div>
            </div>
        )
    }

    if (!article) return null

    return (
        <>
            <Navbar />
            <main className="bg-background">
                {/* Article Hero */}
                <section className="bg-dark pt-[72px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="mx-auto max-w-[1200px] px-6 py-20 lg:py-32 relative z-10">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/50 hover:text-accent transition-all text-xs font-black uppercase tracking-widest mb-12 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Retour au Hub
                        </Link>

                        <div className="max-w-4xl">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                                <Tag className="w-3 h-3" />
                                {article.category}
                            </span>

                            <h1 className="font-sans font-extrabold text-4xl lg:text-7xl text-white leading-[1.1] mb-8">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm font-semibold tracking-tight">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-accent" />
                                    {article.read_time} de lecture
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-accent" />
                                    {new Date(article.posted_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Article Body */}
                <article className="py-20 lg:py-32 px-6">
                    <div className="mx-auto max-w-[850px]">
                        {/* Main Image */}
                        <div className="relative aspect-[21/9] rounded-[40px] overflow-hidden border border-border/50 mb-20 shadow-2xl">
                            <Image
                                src={article.image_url || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200"}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Intro Description */}
                        <p className="text-2xl lg:text-3xl font-bold text-foreground mb-16 leading-tight border-l-4 border-accent pl-8 opacity-90">
                            {article.description}
                        </p>

                        {/* Main Content Render */}
                        <div
                            className="prose prose-lg lg:prose-xl max-w-none text-text-muted leading-[1.7] font-medium 
              prose-headings:font-sans prose-headings:font-black prose-headings:text-foreground prose-headings:tracking-tighter
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-black
              prose-img:rounded-[32px] prose-img:border prose-img:border-border"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* SEO Tags / Footer Info */}
                        <div className="mt-24 pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex flex-wrap gap-2">
                                {article.seo_tags?.split(',').map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-surface text-text-muted text-[10px] font-black uppercase tracking-widest rounded-xl border border-border">
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xs font-black uppercase tracking-widest text-text-muted/50 mr-4">Partager l'expertise</span>
                                <button className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all">
                                    <Twitter className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all">
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-all">
                                    <Linkedin className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Newsletter / CTA Banner Premium */}
                <section className="bg-dark py-24 lg:py-40 relative overflow-hidden">
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="mx-auto max-w-[1200px] px-6 relative z-10 text-center">
                        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl rounded-[60px] p-12 lg:p-24 border border-white/10 shadow-2xl">
                            <MessageSquare className="w-12 h-12 text-accent mx-auto mb-8 animate-bounce" />
                            <h2 className="font-sans font-black text-3xl lg:text-7xl text-white mb-10 leading-[1.05]">
                                D'une idée simple à une <span className="text-accent underline underline-offset-[10px] decoration-accent/20">transformation</span> majeure.
                            </h2>
                            <p className="text-text-muted-light text-lg lg:text-2xl font-medium mb-12 max-w-2xl mx-auto">
                                Prêt à propulser votre entreprise dans sa nouvelle ère numérique ? Nos experts sont là.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link
                                    href="/contact"
                                    className="px-12 py-6 rounded-full bg-accent text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-accent/20 hover:bg-accent-hover transition-all group"
                                >
                                    Lancer mon projet
                                </Link>
                                <Link
                                    href="/blog"
                                    className="px-12 py-6 rounded-full bg-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
                                >
                                    Explorer plus d'articles
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
