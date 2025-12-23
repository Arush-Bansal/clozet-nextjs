import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of creators who are already using clozet.life to manage their digital presence.
            </p>
            <Link href="/auth">
              <Button size="lg" className="text-lg px-8 py-6">
                Claim Your Store URL
              </Button>
            </Link>
          </div>
        </section>
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
