"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, User } from "lucide-react"

export default function AdminLoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === "Numilex202606" && password === "Numilex202606") {
            localStorage.setItem("admin_auth", "true")
            router.push("/admin/dashboard")
        } else {
            setError("Identifiants incorrects.")
        }
    }

    return (
        <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-mid to-dark font-sans">
            <div className="w-full max-w-md">
                {/* Logo area */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-accent/20">
                        <span className="text-white font-black text-3xl">N</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Accès Administrateur</h1>
                    <p className="text-text-muted-light font-medium">Numilex - Gestion du Hub Digital</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-[32px] p-10 border border-white/10 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-text-muted-light mb-2">Nom d'utilisateur</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-light" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-text-muted-light focus:outline-none focus:border-accent transition-all font-medium"
                                    placeholder="Username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-text-muted-light mb-2">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-light" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-text-muted-light focus:outline-none focus:border-accent transition-all font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 rounded-2xl bg-accent text-white font-black uppercase tracking-widest text-xs hover:bg-accent-hover transition-all shadow-xl shadow-accent/20 mt-4 active:scale-95"
                        >
                            Se Connecter
                        </button>
                    </form>
                </div>

                <p className="mt-10 text-center text-text-muted-light text-sm font-medium">
                    &copy; 2026 Numilex. Tous droits réservés.
                </p>
            </div>
        </div>
    )
}
