import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No hidden fees. No monthly charges. Pay only when you sell.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="border-primary border-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            <CardHeader className="text-center pb-4">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Per Sale
              </span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-foreground">₹10</span>
                <span className="text-muted-foreground">platform fee</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="border-t border-border pt-6 mb-6">
                <div className="space-y-2 text-center text-muted-foreground mb-6">
                  <p>+ Delivery charges (paid by buyer)</p>
                  <p>+ Payment processing fee (~2%)</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Your own store URL",
                  "Unlimited product listings",
                  "Secure payment processing",
                  "Integrated shipping",
                  "Customer support",
                  "Analytics dashboard",
                  "Custom domain support",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth" className="block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
                  Start Your Store
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
