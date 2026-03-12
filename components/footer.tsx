import Link from "next/link"
import Image from "next/image"
import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react"

const footerLinks = {
  company: [
    { name: "À propos", href: "/about" },
    { name: "Carrières", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  solutions: [
    { name: "Informatique", href: "/services/informatique" },
    { name: "Marketing", href: "/services/marketing" },
    { name: "Social Media", href: "/services/social-media" },
    { name: "Business Support", href: "/services/business-support" },
  ],
  contact: [
    { name: "Paris, France", href: "#" },
    { name: "hello@numilex.com", href: "mailto:hello@numilex.com" },
    { name: "+33 (0)1 XX XX XX XX", href: "tel:+33100000000" },
  ],
}

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "X", href: "#", icon: Twitter },
]

export function Footer() {
  return (
    <footer className="bg-dark py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/Numilex-Logo-Horisontal.svg"
                alt="Numilex"
                width={140}
                height={32}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-text-muted-light text-sm leading-relaxed mb-6">
              Votre partenaire digital à Paris. Solutions en informatique, marketing, social media et business support.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-dark-card flex items-center justify-center text-text-muted-light hover:bg-accent hover:text-text-light transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-text-light font-display font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted-light text-sm hover:text-text-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-text-light font-display font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-text-muted-light text-sm hover:text-text-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-text-light font-display font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-muted-light text-sm hover:text-text-light transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border-dark flex justify-center items-center">
          <p className="text-text-muted-light text-sm">
            © 2026 Numilex. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
