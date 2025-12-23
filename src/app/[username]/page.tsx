"use client";

import { useState, useEffect, useMemo, use } from "react";
import { UserProfileSkeleton } from "@/components/skeletons/UserProfileSkeleton";
import Link from "next/link";
import Fuse from "fuse.js";
import { usePublicProfile } from "@/hooks/use-public-profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Instagram, BadgeCheck, ShoppingBag, Package, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Tag {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image_url?: string | null;
  is_sold: boolean;
  product_tags?: {
    tags: Tag | null;
  }[] | null;
}

export default function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  const username = resolvedParams.username;
  const { profile, products: rawProducts, isLoading: loading } = usePublicProfile(username);
  const products = rawProducts as unknown as Product[];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const trackVisit = async () => {
      if (profile?.id) {
        // Simple session-based visitor ID using localStorage
        let visitorId = localStorage.getItem('clozet_visitor_id');
        if (!visitorId) {
          visitorId = Math.random().toString(36).substring(2, 15);
          localStorage.setItem('clozet_visitor_id', visitorId);
        }

        const { error } = await supabase
          .from('profile_visits')
          .insert({
            profile_id: profile.id,
            visitor_id: visitorId
          });
        
        if (error) console.error('Error tracking visit:', error);
      }
    };

    if (!loading && profile) {
      trackVisit();
    }
  }, [profile, loading]);

  const allTags = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const tagsMap = new Map<string, Tag>();
    products.forEach((p) => {
      if (p.product_tags) {
        p.product_tags.forEach((pt) => {
          if (pt.tags) {
            tagsMap.set(pt.tags.id, pt.tags);
          }
        });
      }
    });
    return Array.from(tagsMap.values());
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products || [];

    if (selectedTag) {
      result = result.filter((p) => 
        p.product_tags?.some((pt) => pt.tags?.id === selectedTag)
      );
    }

    if (searchTerm) {
      const fuse = new Fuse(result, {
        keys: ["title", "description"],
        threshold: 0.4,
      });
      result = fuse.search(searchTerm).map((r) => r.item);
    }

    // Sort sold items to last
    return [...result].sort((a, b) => {
      if (a.is_sold === b.is_sold) return 0;
      return a.is_sold ? 1 : -1;
    });
  }, [searchTerm, selectedTag, products]);

  if (loading) {
    return <UserProfileSkeleton />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-8">This store doesn&apos;t exist yet.</p>
        <Link href="/">
          <Button size="lg" className="rounded-xl">Go Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-background shadow-sm overflow-hidden">
            {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.username || "avatar"} className="w-full h-full object-cover" />
            ) : (
                <ShoppingBag className="w-10 h-10 text-primary" />
            )}
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground flex items-center justify-center gap-2">
            @{profile.username}
            {profile.instagram_username && (
                <BadgeCheck className="h-6 w-6 text-blue-500 fill-blue-500" />
            )}
          </h1>
          {profile.instagram_username && (
              <a 
                href={`https://instagram.com/${profile.instagram_username}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-3 text-pink-600 hover:text-pink-700 font-medium transition-colors"
              >
                <Instagram className="h-4 w-4 mr-1.5" />
                {profile.instagram_username}
              </a>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-2">
              <h2 className="text-2xl font-serif font-bold text-foreground">Featured Collection</h2>
              
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 bg-card border-border rounded-xl focus:ring-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 px-2">
                <Badge
                  variant={selectedTag === null ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm rounded-full transition-all hover:border-primary"
                  onClick={() => setSelectedTag(null)}
                >
                  All
                </Badge>
                {allTags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTag === tag.id ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm rounded-full transition-all hover:border-primary"
                    onClick={() => setSelectedTag(tag.id === selectedTag ? null : tag.id)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
            
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-3xl border-2 border-dashed border-border/50">
                    <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">
                      {searchTerm ? "No products found matching your search." : "No items listed yet. Check back soon!"}
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 group rounded-2xl">
                            <div className="aspect-square relative overflow-hidden bg-muted/30">
                                <img 
                                    src={product.image_url || ""} 
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {product.is_sold && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                                        <Badge className="bg-white text-black hover:bg-white text-sm font-bold px-4 py-1 border-none shadow-lg">SOLD</Badge>
                                    </div>
                                )}
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-semibold text-foreground line-clamp-1 mb-1">{product.title}</h3>
                                <p className="text-primary font-bold">₹{product.price}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Footer Branding */}
      <div className="py-12 border-t border-border mt-12 bg-card">
          <div className="text-center">
              <Link href="/" className="inline-flex items-center gap-2 group">
                  <span className="text-muted-foreground/40 group-hover:text-primary transition-colors">Powered by</span>
                  <span className="font-serif font-bold text-xl text-primary opacity-50 group-hover:opacity-100 transition-opacity">clozet.life</span>
              </Link>
          </div>
      </div>
    </div>
  );
}
