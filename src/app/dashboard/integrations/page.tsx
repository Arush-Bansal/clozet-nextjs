"use client";

import { CreditCard, Rocket, Globe, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/dashboard/PageHeader";

export default function IntegrationsPage() {
  const { toast } = useToast();

  const connectOptions = [
    { label: "Payments", icon: CreditCard, description: "Accept payments directly" },
    { label: "Delivery", icon: Rocket, description: "Integrated shipping solutions" },
    { label: "Domain", icon: Globe, description: "Connect your custom domain" },
    { label: "Marketplace", icon: ShoppingBag, description: "View on Marketplace" },
  ];

  const handleConnect = (optionLabel: string) => {
    toast({
      title: "Coming Soon",
      description: `${optionLabel} integration will be available shortly!`,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Integrations" 
        description="Manage your account and integrations."
      />

      <div>
        <h2 className="text-xl font-bold text-foreground font-serif mb-4">Connect Services</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {connectOptions.map((option) => (
            <Card key={option.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {option.label}
                </CardTitle>
                <option.icon className="h-5 w-5 text-muted-foreground/50" />
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">{option.description}</div>
                <Button 
                  onClick={() => handleConnect(option.label)}
                  variant="outline" 
                  className="w-full hover:bg-primary hover:text-white transition-colors"
                >
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
