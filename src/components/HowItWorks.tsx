import { UserCheck, Upload, ShoppingBag, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    step: "01",
    title: "Complete KYC",
    description: "Simple identity verification with your Aadhaar and PAN. Takes just 5 minutes.",
  },
  {
    icon: Upload,
    step: "02",
    title: "List Your Items",
    description: "Upload photos, add descriptions, and set prices for your pre-loved pieces.",
  },
  {
    icon: ShoppingBag,
    step: "03",
    title: "Start Selling",
    description: "Share your store link with followers. We handle payments and shipping.",
  },
  {
    icon: Wallet,
    step: "04",
    title: "Get Paid",
    description: "Money is transferred to your account after successful delivery.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From signup to your first sale in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                  <step.icon className="h-10 w-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
