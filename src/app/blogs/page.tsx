import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "how-to-setup-thrift-store-without-clozet-life",
    title: "How to Setup a Thrift Store Without clozet.life",
    excerpt: "A comprehensive guide to starting your thrift business the traditional way - from sourcing to selling, handling payments, and managing logistics on your own.",
    readTime: "8 min read",
    category: "Guide",
    date: "December 15, 2024",
  },
  {
    slug: "how-to-setup-thrift-store-with-clozet-life",
    title: "How to Setup Your Thrift Store with clozet.life",
    excerpt: "Step-by-step walkthrough of launching your thrift store on our platform in under 10 minutes. From KYC to your first listing.",
    readTime: "5 min read",
    category: "Tutorial",
    date: "December 14, 2024",
  },
  {
    slug: "pricing-your-thrift-items",
    title: "How to Price Your Thrift Items Right",
    excerpt: "Learn the art of pricing pre-loved fashion to maximize sales while keeping customers happy. Tips from successful thrift sellers.",
    readTime: "6 min read",
    category: "Tips",
    date: "December 13, 2024",
  },
  {
    slug: "photographing-clothes-for-thrift-store",
    title: "Photography Tips for Thrift Sellers",
    excerpt: "Great photos sell items faster. Learn how to photograph your pre-loved pieces using just your smartphone.",
    readTime: "7 min read",
    category: "Tips",
    date: "December 12, 2024",
  },
  {
    slug: "building-thrift-store-brand",
    title: "Building Your Thrift Store Brand",
    excerpt: "How to create a memorable brand identity for your thrift business that resonates with your audience.",
    readTime: "6 min read",
    category: "Guide",
    date: "December 11, 2024",
  },
  {
    slug: "sourcing-quality-thrift-items",
    title: "Where to Source Quality Thrift Items",
    excerpt: "Discover the best places to find high-quality pre-loved fashion items to sell in your thrift store.",
    readTime: "5 min read",
    category: "Tips",
    date: "December 10, 2024",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Thrift Store Guide
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about starting and growing your thrift business in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <Card className="h-full bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
