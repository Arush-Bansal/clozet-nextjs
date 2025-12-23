import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

const blogPosts = [
  {
    slug: "how-to-setup-thrift-store-without-clozet",
    title: "How to Setup a Thrift Store Without Clozet.life",
    excerpt: "A comprehensive guide to starting your thrift business the traditional way - from sourcing to selling.",
    readTime: "8 min read",
    category: "Guide",
  },
  {
    slug: "how-to-setup-thrift-store-with-clozet",
    title: "How to Setup Your Thrift Store with Clozet.life",
    excerpt: "Step-by-step walkthrough of launching your thrift store on our platform in under 10 minutes.",
    readTime: "5 min read",
    category: "Tutorial",
  },
  {
    slug: "pricing-your-thrift-items",
    title: "How to Price Your Thrift Items Right",
    excerpt: "Learn the art of pricing pre-loved fashion to maximize sales while keeping customers happy.",
    readTime: "6 min read",
    category: "Tips",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Learn & Grow
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guides and tips to help you build a successful thrift business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {blogPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`}>
              <Card className="h-full bg-background border-border hover:border-primary/50 transition-all hover:-translate-y-1 group">
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
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/blogs">
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
