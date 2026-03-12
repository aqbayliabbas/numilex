"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Users,
    LogOut,
    Bell,
    Search,
    Menu,
    X,
    Quote,
    TrendingUp,
    BarChart3,
    PieChart as PieChartIcon
} from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts'
import { cn } from "@/lib/utils"

export default function AdminDashboardPage() {
    const router = useRouter()
    const pathname = usePathname()
    const [authorized, setAuthorized] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const [stats, setStats] = useState({ devis: 0, blogs: 0, jobs: 0, applications: 0 })
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simple auth check
        const auth = localStorage.getItem("admin_auth")
        if (!auth) {
            router.push("/admin")
        } else {
            setAuthorized(true)
            fetchData() // Initial fetch

            // Real-time updates: Poll every 10 seconds
            const interval = setInterval(() => {
                fetchData()
            }, 10000)

            return () => clearInterval(interval)
        }
    }, [activeTab])

    const fetchData = async () => {
        setLoading(true)
        try {
            if (activeTab === "overview") {
                // Fetch all stats for the dashboard
                const [devisRes, blogsRes, jobsRes, appsRes] = await Promise.all([
                    fetch("/backend/api/devis.php"),
                    fetch("/backend/api/blogs.php"),
                    fetch("/backend/api/jobs.php"),
                    fetch("/backend/api/apply.php")
                ])

                const [devis, blogs, jobs, apps] = await Promise.all([
                    devisRes.ok ? devisRes.json() : [],
                    blogsRes.ok ? blogsRes.json() : [],
                    jobsRes.ok ? jobsRes.json() : [],
                    appsRes.ok ? appsRes.json() : []
                ])

                setStats({
                    devis: devis.length,
                    blogs: blogs.length,
                    jobs: jobs.length,
                    applications: apps.length
                })
                setData([]) // No table data for overview
            } else {
                let endpoint = ""
                if (activeTab === "devis") endpoint = "/backend/api/devis.php"
                else if (activeTab === "blogs") endpoint = "/backend/api/blogs.php"
                else if (activeTab === "jobs") endpoint = "/backend/api/jobs.php"
                else if (activeTab === "applications") endpoint = "/backend/api/apply.php"

                const response = await fetch(endpoint)
                if (response.ok) {
                    const result = await response.json()
                    setData(result)

                    // Update specific stat
                    setStats(s => ({ ...s, [activeTab]: result.length }))
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const [selectedMessage, setSelectedMessage] = useState<{ title: string, content: string } | null>(null)

    const handleLogout = () => {
        localStorage.removeItem("admin_auth")
        router.push("/admin")
    }

    const handleDelete = async (id: number, type: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;

        try {
            let endpoint = ""
            if (type === "blogs") endpoint = `/backend/api/blogs.php?id=${id}`
            else if (type === "jobs") endpoint = `/backend/api/jobs.php?id=${id}`
            else if (type === "applications") endpoint = `/backend/api/apply.php?id=${id}`

            const response = await fetch(endpoint, { method: 'DELETE' })
            if (response.ok) {
                alert("Supprimé avec succès")
                fetchData()
            }
        } catch (e) {
            console.error(e)
        }
    }

    if (!authorized) return <div className="min-h-screen bg-dark" />

    const menuItems = [
        { id: "overview", label: "Tableau de Bord", icon: LayoutDashboard },
        { id: "devis", label: "Devis Gratuits", icon: Users },
        { id: "blogs", label: "Articles Blog", icon: FileText },
        { id: "jobs", label: "Offres Carrières", icon: Briefcase },
        { id: "applications", label: "Candidatures", icon: Users },
    ]

    const chartData = [
        { name: 'Mar', devis: stats.devis, applications: stats.applications, blogs: stats.blogs },
    ]

    const pieData = [
        { name: 'Devis', value: stats.devis, color: '#fbbd2e' },
        { name: 'Candidats', value: stats.applications, color: '#1a1f2e' },
        { name: 'Articles', value: stats.blogs, color: '#f1f1f1' },
    ]

    return (
        <div className="min-h-screen bg-surface flex text-foreground font-sans">
            {/* Sidebar */}
            <aside className="w-[320px] bg-dark border-r border-white/5 flex flex-col fixed inset-y-0 z-50">
                <div className="p-10">
                    <Link href="/" className="flex items-center gap-3 mb-12 group">
                        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                            <span className="text-white font-bold text-xl">N</span>
                        </div>
                        <span className="font-bold text-xl text-white tracking-tight">Admin<span className="text-accent underline decoration-accent/20">Hub</span></span>
                    </Link>

                    <nav className="space-y-1.5">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-semibold uppercase tracking-tight transition-all duration-300",
                                    activeTab === item.id
                                        ? "bg-accent/10 text-accent shadow-sm"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-white/30 hover:text-accent hover:bg-accent/5 transition-all text-xs font-semibold uppercase tracking-tight"
                    >
                        <LogOut className="w-4 h-4" />
                        Quitter
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-[320px] p-12 animate-fade-in">
                {/* Header */}
                <header className="flex items-center justify-between mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Système de Gestion</span>
                        </div>
                        <h2 className="text-4xl font-bold text-foreground tracking-tight capitalize">{activeTab}</h2>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent transition-colors" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                className="bg-white border border-border rounded-xl py-3 pl-11 pr-5 text-sm font-medium w-72 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/5 transition-all shadow-sm"
                            />
                        </div>
                        <button className="w-12 h-12 rounded-xl bg-white border border-border flex items-center justify-center relative hover:bg-surface transition-all shadow-sm">
                            <Bell className="w-5 h-5 text-text-muted" />
                            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
                        </button>
                    </div>
                </header>

                {/* Content Sections */}
                {activeTab === 'overview' ? (
                    <div className="space-y-10 animate-fade-up">
                        {/* Stats Grid - Moved here from global */}
                        <div className="grid grid-cols-4 gap-6">
                            {menuItems.filter(item => item.id !== 'overview').map((item) => (
                                <div key={item.id} className="bg-white p-6 rounded-[32px] border border-border shadow-sm group hover:shadow-md transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 uppercase">
                                            <TrendingUp className="w-3 h-3" />
                                            +12%
                                        </div>
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-1">
                                        {item.id === 'devis' ? stats.devis : item.id === 'blogs' ? stats.blogs : item.id === 'jobs' ? stats.jobs : stats.applications}
                                    </p>
                                    <h3 className="text-xs font-semibold text-text-muted uppercase tracking-tight">{item.label}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Charts Area */}
                        <div className="grid grid-cols-3 gap-8">
                            <div className="col-span-2 bg-white p-10 rounded-[40px] border border-border shadow-sm">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                            <BarChart3 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground tracking-tight">Activité Mensuelle</h3>
                                            <p className="text-[11px] text-text-muted font-medium">Évolution des demandes et publications</p>
                                        </div>
                                    </div>
                                    <select className="bg-surface border border-border rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase outline-none">
                                        <option>Derniers 3 mois</option>
                                        <option>Dernière année</option>
                                    </select>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#fbbd2e" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#fbbd2e" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 10, fontWeight: 600, fill: '#94a3b8' }}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                            />
                                            <Area type="monotone" dataKey="devis" stroke="#fbbd2e" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
                                            <Area type="monotone" dataKey="applications" stroke="#1a1f2e" strokeWidth={3} fillOpacity={0} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-[40px] border border-border shadow-sm">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                        <PieChartIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground tracking-tight">Répartition</h3>
                                        <p className="text-[11px] text-text-muted font-medium">Part par catégorie</p>
                                    </div>
                                </div>
                                <div className="h-[220px] w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-2xl font-bold text-foreground leading-none">
                                            {stats.devis + stats.blogs + stats.applications}
                                        </span>
                                        <span className="text-[8px] font-bold text-text-muted uppercase tracking-widest mt-1">Total</span>
                                    </div>
                                </div>
                                <div className="mt-8 space-y-3">
                                    {pieData.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-[11px] font-semibold text-text-muted">{item.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-foreground">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Data Table Area */
                    <div className="bg-white border border-border rounded-[32px] overflow-hidden shadow-sm animate-fade-up">
                        <div className="px-10 py-8 border-b border-border flex items-center justify-between bg-surface/50">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-accent rounded-full" />
                                <h3 className="font-bold text-foreground tracking-tight text-base">Gestion de contenu</h3>
                            </div>
                            {activeTab === 'blogs' ? (
                                <Link
                                    href="/admin/dashboard/blogs/new"
                                    className="px-8 py-3 rounded-xl bg-dark text-white font-semibold text-xs uppercase tracking-tight hover:bg-black transition-all shadow-lg shadow-dark/10"
                                >
                                    + Nouvel Article
                                </Link>
                            ) : activeTab === 'jobs' ? (
                                <Link
                                    href="/admin/dashboard/jobs/new"
                                    className="px-8 py-3 rounded-xl bg-dark text-white font-semibold text-xs uppercase tracking-tight hover:bg-black transition-all shadow-lg shadow-dark/10"
                                >
                                    + Nouvelle Offre
                                </Link>
                            ) : null}
                        </div>

                        <div className="min-h-[400px]">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-24 animate-pulse">
                                    <div className="w-12 h-12 bg-surface rounded-2xl mb-4" />
                                    <div className="h-3 w-32 bg-surface rounded-full mb-2" />
                                </div>
                            ) : data.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead className="text-[10px] font-bold text-text-muted/50 uppercase tracking-widest bg-surface/30">
                                        <tr>
                                            <th className="px-10 py-5">IDENTITÉ / TITRE</th>
                                            <th className="px-10 py-5">{activeTab === 'applications' ? 'POSTE' : 'CATÉGORIE'}</th>
                                            <th className="px-10 py-5">DATE</th>
                                            <th className="px-10 py-5 text-right">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {data.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-surface/30 transition-all group">
                                                <td className="px-10 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-text-muted group-hover:bg-accent/10 group-hover:text-accent transition-all">
                                                            {item.title ? <FileText className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                                                        </div>
                                                        <div>
                                                            <div className="text-foreground font-semibold text-sm tracking-tight">{item.title || `${item.first_name} ${item.last_name}`}</div>
                                                            {item.email && <div className="text-[11px] text-text-muted font-medium mt-0.5">{item.email}</div>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-6">
                                                    <span className="px-3 py-1 rounded-full bg-surface border border-border text-[10px] text-text-muted font-semibold uppercase tracking-tight">{item.job_title || item.category || "Standard"}</span>
                                                </td>
                                                <td className="px-10 py-6 text-xs font-medium text-text-muted tracking-tight">
                                                    {new Date(item.posted_at || item.created_at || item.applied_at).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="px-10 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        {activeTab === 'blogs' ? (
                                                            <>
                                                                <Link href={`/admin/dashboard/blogs/edit/${item.id}`} className="px-4 py-2 rounded-lg bg-surface text-[10px] font-bold text-dark uppercase tracking-tight hover:bg-dark hover:text-white transition-all">Modifier</Link>
                                                                <button onClick={() => handleDelete(item.id, 'blogs')} className="px-4 py-2 rounded-lg bg-red-50 text-[10px] font-bold text-red-500 uppercase tracking-tight hover:bg-red-500 hover:text-white transition-all">Effacer</button>
                                                            </>
                                                        ) : activeTab === 'jobs' ? (
                                                            <>
                                                                <Link href={`/admin/dashboard/jobs/edit/${item.id}`} className="px-4 py-2 rounded-lg bg-surface text-[10px] font-bold text-dark uppercase tracking-tight hover:bg-dark hover:text-white transition-all">Modifier</Link>
                                                                <button onClick={() => handleDelete(item.id, 'jobs')} className="px-4 py-2 rounded-lg bg-red-50 text-[10px] font-bold text-red-500 uppercase tracking-tight hover:bg-red-500 hover:text-white transition-all">Effacer</button>
                                                            </>
                                                        ) : activeTab === 'applications' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => setSelectedMessage({ title: `Lettre - ${item.first_name}`, content: item.message || "Aucun message." })}
                                                                    className="px-4 py-2 rounded-lg bg-accent/5 text-[10px] font-bold text-accent uppercase tracking-tight hover:bg-accent hover:text-white transition-all"
                                                                >
                                                                    Lire
                                                                </button>
                                                                <a href={`/backend/uploads/cvs/${item.cv_path}`} target="_blank" className="px-4 py-2 rounded-lg bg-surface text-[10px] font-bold text-dark uppercase tracking-tight hover:bg-dark hover:text-white transition-all">CV</a>
                                                            </>
                                                        ) : activeTab === 'devis' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => setSelectedMessage({ title: `Devis - ${item.first_name}`, content: item.message })}
                                                                    className="px-4 py-2 rounded-lg bg-accent/5 text-[10px] font-bold text-accent uppercase tracking-tight hover:bg-accent hover:text-white transition-all"
                                                                >
                                                                    Détails
                                                                </button>
                                                                <button onClick={() => handleDelete(item.id, 'devis')} className="px-4 py-2 rounded-lg bg-surface text-[10px] font-bold text-text-muted uppercase tracking-tight hover:bg-dark hover:text-white transition-all">Archiver</button>
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-up">
                                    <div className="w-20 h-20 bg-surface rounded-[32px] flex items-center justify-center mb-6">
                                        <Search className="w-8 h-8 text-text-muted/20" />
                                    </div>
                                    <h4 className="text-xl font-bold text-foreground mb-1 tracking-tight">Aucun résultat</h4>
                                    <p className="text-text-muted text-sm font-medium">Cette section ne contient pas encore de données.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Premium Message Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border border-white/10 animate-fade-up">
                        <div className="px-10 py-8 border-b border-border bg-surface/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-accent rounded-full" />
                                <h3 className="text-xl font-bold text-foreground tracking-tight">{selectedMessage.title}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center hover:bg-accent hover:text-white transition-all group"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            </button>
                        </div>
                        <div className="p-10 max-h-[60vh] overflow-y-auto">
                            <p className="text-text-muted text-lg font-medium leading-relaxed whitespace-pre-wrap italic">
                                "{selectedMessage.content}"
                            </p>
                        </div>
                        <div className="px-10 py-8 bg-surface/30 border-t border-border flex justify-end">
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="px-8 py-3 rounded-xl bg-dark text-white font-bold text-xs uppercase tracking-tight"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
