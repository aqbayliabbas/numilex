"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, Image as ImageIcon, Tag, Type, Eye, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function EditBlogPage() {
    const router = useRouter()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        category: "Informatique",
        image_url: "",
        description: "",
        content: "",
        seo_tags: "",
        read_time: "5 min"
    })

    useEffect(() => {
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin")
            return
        }

        const fetchArticle = async () => {
            try {
                const response = await fetch(`/backend/api/blogs.php?id=${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setFormData({
                        title: data.title,
                        category: data.category,
                        image_url: data.image_url,
                        description: data.description,
                        content: data.content,
                        seo_tags: data.seo_tags || "",
                        read_time: data.read_time
                    })
                } else {
                    router.push("/admin/dashboard")
                }
            } catch (e) {
                console.error(e)
                router.push("/admin/dashboard")
            } finally {
                setFetching(false)
            }
        }

        if (id) fetchArticle()
    }, [id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setStatus('idle')

        try {
            const response = await fetch(`/backend/api/blogs.php?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setStatus('success')
                setTimeout(() => router.push("/admin/dashboard"), 2000)
            } else {
                const err = await response.json()
                setErrorMsg(err.error || "Une erreur est survenue")
                setStatus('error')
            }
        } catch (e) {
            console.error(e)
            setStatus('error')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (fetching) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-sans">
                <div className="text-center animate-pulse">
                    <div className="w-12 h-12 bg-accent/20 rounded-full mx-auto mb-4" />
                    <p className="text-text-muted font-black text-xs uppercase tracking-widest">Chargement de l'article...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans pb-20">
            {/* Top Bar */}
            <header className="bg-dark text-white p-6 sticky top-0 z-50 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-6">
                    <Link href="/admin/dashboard" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">Modifier l'Article</h1>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        form="blog-form"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-accent text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-accent/25 hover:bg-accent-hover active:scale-95 transition-all disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {loading ? "Mise à jour..." : "Enregistrer les modifications"}
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto mt-12 px-6">
                <form id="blog-form" onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                    {/* Main Context */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-[40px] border border-border shadow-sm">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">Données Principales</label>

                            <div className="space-y-6">
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Titre de l'article"
                                        className="w-full text-4xl font-extrabold text-foreground placeholder:text-text-muted/30 border-none focus:outline-none focus:ring-0 p-0 mb-2"
                                    />
                                    <div className="h-1 w-20 bg-accent rounded-full mb-8" />
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-3">Résumé Rapide (Description)</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={2}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Écrivez un court résumé pour la carte d'aperçu..."
                                        className="w-full bg-surface border-none rounded-2xl p-6 text-foreground font-medium placeholder:text-text-muted/40 focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-4">Corps de l'article (Markdown / HTML supporté)</label>
                                    <div className="border border-border rounded-3xl overflow-hidden shadow-inner">
                                        <div className="bg-surface/50 p-4 border-b border-border flex gap-4">
                                            {/* Simulated toolbar */}
                                            <div className="flex gap-2">
                                                <button type="button" className="p-2 hover:bg-white rounded-lg transition-colors"><Type className="w-4 h-4" /></button>
                                                <button type="button" className="p-2 hover:bg-white rounded-lg transition-colors"><ImageIcon className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                        <textarea
                                            name="content"
                                            required
                                            rows={15}
                                            value={formData.content}
                                            onChange={handleInputChange}
                                            placeholder="Le cœur de votre expertise commence ici..."
                                            className="w-full border-none p-10 text-lg leading-relaxed text-foreground font-medium placeholder:text-text-muted/20 focus:ring-0 min-h-[500px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-[40px] border border-border shadow-sm">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-6">Paramètres</label>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2 flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4" /> Image URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                        className="w-full bg-surface border border-border rounded-xl px-5 py-3 text-sm font-semibold focus:outline-none focus:border-accent"
                                    />
                                    {formData.image_url && (
                                        <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-border group relative">
                                            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Eye className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">Catégorie</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface border border-border rounded-xl px-5 py-3 text-sm font-semibold focus:outline-none focus:border-accent appearance-none"
                                    >
                                        <option>Informatique</option>
                                        <option>Marketing</option>
                                        <option>Social Media</option>
                                        <option>Business</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2 flex items-center gap-2">
                                        <Tag className="w-4 h-4" /> Tags SEO
                                    </label>
                                    <input
                                        type="text"
                                        name="seo_tags"
                                        value={formData.seo_tags}
                                        onChange={handleInputChange}
                                        placeholder="it, conseil, audit, ..."
                                        className="w-full bg-surface border border-border rounded-xl px-5 py-3 text-sm font-semibold focus:outline-none focus:border-accent"
                                    />
                                    <p className="text-[10px] text-text-muted mt-2 font-medium">Séparez les tags par des virgules.</p>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-2">Temps de lecture</label>
                                    <input
                                        type="text"
                                        name="read_time"
                                        value={formData.read_time}
                                        onChange={handleInputChange}
                                        placeholder="Ex: 6 min"
                                        className="w-full bg-surface border border-border rounded-xl px-5 py-3 text-sm font-semibold focus:outline-none focus:border-accent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Status Feedback */}
                        {status === 'success' && (
                            <div className="bg-green-500 rounded-[32px] p-8 text-white flex items-center gap-4 animate-fade-in">
                                <CheckCircle2 className="w-10 h-10" />
                                <div>
                                    <h4 className="font-bold">Succès !</h4>
                                    <p className="text-sm opacity-90 font-medium tracking-tight">Article mis à jour avec succès.</p>
                                </div>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="bg-red-500 rounded-[32px] p-8 text-white flex items-center gap-4 animate-fade-in">
                                <AlertCircle className="w-10 h-10" />
                                <div>
                                    <h4 className="font-bold">Erreur</h4>
                                    <p className="text-sm opacity-90 font-medium tracking-tight">{errorMsg}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </main>
        </div>
    )
}
