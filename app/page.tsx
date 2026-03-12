import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/home/hero"
import { AboutSection } from "@/components/home/about-section"
import { SolutionsSection } from "@/components/home/solutions-section"
import { WhyUsSection } from "@/components/home/why-us-section"
import { ProcessSection } from "@/components/home/process-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { PartnersSection } from "@/components/home/partners-section"
import { BlogPreviewSection } from "@/components/home/blog-preview-section"
import { CTABanner } from "@/components/cta-banner"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SolutionsSection />
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <PartnersSection />
        <BlogPreviewSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
