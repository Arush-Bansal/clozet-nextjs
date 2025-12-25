import { Store, Shield, Globe, CreditCard, Truck, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Store,
    title: "Your Own Store",
    description: "Get a beautiful thrift store at clozet.life/yourname instantly. No coding required.",
  },
  {
    icon: Zap,
    title: "Smart Search & Tags",
    description: "Help followers find exactly what they're looking for with category tags and instant search.",
  },
  {
    icon: Globe,
    title: "Integrated Dashboard",
    description: "Manage products, track stats, and connect integrations all from one powerful interface.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "We handle all payment processing. You just focus on selling.",
  },
  {
    icon: Truck,
    title: "Easy Shipping",
    description: "Integrated delivery partners for hassle-free nationwide shipping.",
  },
  {
    icon: Shield,
    title: "Simple KYC",
    description: "Quick identity verification and you're ready to start selling in minutes.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Everything You Need to Sell
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;ve built the tools so you can focus on what matters - curating amazing pre-loved fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-background border-border hover:border-primary/50 transition-colors group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
