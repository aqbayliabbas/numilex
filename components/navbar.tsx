"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Monitor, Megaphone, Share2, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const solutions = [
  { name: "Solutions Informatiques", href: "/services/informatique", icon: Monitor },
  { name: "Solutions Marketing", href: "/services/marketing", icon: Megaphone },
  { name: "Social Media", href: "/services/social-media", icon: Share2 },
  { name: "Business Support", href: "/services/business-support", icon: Briefcase },
]

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/about" },
  { name: "Solutions", href: "/services", hasDropdown: true },
  { name: "Blog", href: "/blog" },
  { name: "Carrières", href: "/careers" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Dynamic text color logic
  const isDarkText = isScrolled || isHomePage

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto max-w-[1200px] px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/Numilex-Logo-Horisontal.svg"
            alt="Numilex"
            width={160}
            height={36}
            className="group-hover:scale-105 transition-transform"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.hasDropdown && setIsDropdownOpen(true)}
              onMouseLeave={() => link.hasDropdown && setIsDropdownOpen(false)}
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-semibold transition-all duration-300 hover:text-accent relative py-2",
                  isDarkText ? "text-foreground" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isDropdownOpen && "rotate-180"
                  )} />
                )}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    initial={false}
                  />
                )}
              </Link>

              {/* Dropdown */}
              <AnimatePresence>
                {link.hasDropdown && isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="bg-white rounded-2xl border border-border/50 shadow-2xl p-2 min-w-[280px]">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.name}
                          href={solution.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface transition-all group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-accent-light flex items-center justify-center group-hover:bg-accent transition-colors">
                            <solution.icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{solution.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/devis"
            className={cn(
              "hidden lg:inline-flex items-center px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg",
              isScrolled
                ? "bg-accent text-white hover:bg-accent-hover shadow-accent/20"
                : isHomePage
                  ? "bg-dark text-white hover:bg-dark-mid shadow-dark/10"
                  : "bg-white text-dark hover:bg-surface shadow-white/10"
            )}
          >
            Devis Gratuit
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-xl transition-colors relative z-50",
              isDarkText || isMobileMenuOpen ? "text-foreground" : "text-white"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-0 bg-dark z-[40] flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2 pb-12">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="border-b border-white/5 py-6"
                >
                  {link.hasDropdown ? (
                    <div>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-display font-bold text-white mb-6 block"
                      >
                        {link.name}
                      </Link>
                      <div className="grid grid-cols-1 gap-3 pl-4">
                        {solutions.map((solution) => (
                          <Link
                            key={solution.name}
                            href={solution.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 active:bg-white/10 transition-colors"
                          >
                            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                              <solution.icon className="w-6 h-6 text-accent" />
                            </div>
                            <span className="text-white text-lg font-medium">{solution.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-3xl font-display font-bold text-white hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                className="pt-8"
              >
                <Link
                  href="/devis"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full px-6 py-6 rounded-2xl bg-accent text-white text-xl font-bold hover:bg-accent-hover transition-all shadow-2xl shadow-accent/30"
                >
                  Demander un devis
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
