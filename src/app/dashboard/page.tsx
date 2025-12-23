"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/use-products";
import { useProfile } from "@/hooks/use-profile";
import { useAnalytics } from "@/hooks/use-analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { 
  Eye, 
  Package, 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp, 
  Calendar 
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { products, isLoading: isLoadingProducts } = useProducts();
  const { profile, isLoading: isLoadingProfile } = useProfile();
  const { totalViews, uniqueViews, trend, chartData, visitsByDay, isLoading: isLoadingAnalytics } = useAnalytics();

  const totalProducts = products.length;
  const soldProducts = products.filter(p => p.is_sold).length;
  const activeProducts = totalProducts - soldProducts;

  const stats = [
    { 
      label: "Total Views", 
      value: totalViews, 
      icon: Eye, 
      color: "text-blue-600", 
      trend: `${trend >= 0 ? '+' : ''}${trend}% from last week` 
    },
    { 
      label: "Unique Visitors", 
      value: uniqueViews, 
      icon: Users, 
      color: "text-purple-600",
      trend: "Total unique users"
    },
    { 
      label: "Total Products", 
      value: totalProducts, 
      icon: Package, 
      color: "text-indigo-600", 
      trend: `${activeProducts} active items` 
    },
    { 
      label: "Top Day", 
      value: Object.entries(visitsByDay).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A', 
      icon: Calendar, 
      color: "text-orange-600",
      trend: "Most active day"
    },
  ];

  const recentProducts = products.slice(0, 3);
  const isLoading = isLoadingProducts || isLoadingProfile || isLoadingAnalytics;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Dashboard" 
        description={profile?.username ? `Welcome back, @${profile.username}! Here's what's happening today.` : "Welcome back! Here's what's happening today."}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color} opacity-80`} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <div className="text-3xl font-bold">{stat.value}</div>
              )}
              <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Performance Chart - Span 2 columns */}
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-serif text-2xl">Visit Performance</CardTitle>
            {!isLoading && totalViews > 0 && (
              <div className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-500/10 px-3 py-1 rounded-full">
                <TrendingUp className="h-4 w-4" />
                {trend >= 0 ? '+' : ''}{trend}%
              </div>
            )}
          </CardHeader>
          <CardContent className="h-[350px] w-full pt-4">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-2xl" />
            ) : totalViews > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: 'var(--shadow-xl)',
                      backgroundColor: 'hsl(var(--card))',
                      color: 'hsl(var(--card-foreground))'
                    }}
                    itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visits" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorVisits)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-muted/30 rounded-3xl text-muted-foreground font-medium border-2 border-dashed border-border/50 p-6 text-center">
                <Eye className="h-12 w-12 mb-4 text-muted/30" />
                <p>No visit data yet</p>
                <p className="text-sm font-normal mt-2">Share your profile link to start tracking visits!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links / Recent Products - 1 column */}
        <Card className="border-none shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-2xl" />
                ))}
              </div>
            ) : recentProducts.length > 0 ? (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => router.push('/dashboard/products')}
                    className="flex items-center justify-between p-3.5 bg-muted/50 rounded-2xl hover:bg-muted transition-all cursor-pointer group border border-transparent hover:border-border/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center shadow-sm border border-border/50 overflow-hidden">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold truncate max-w-[120px] text-foreground">{product.title}</div>
                        <div className="text-xs text-muted-foreground font-medium">
                           ₹{product.price}
                        </div>
                      </div>
                    </div>
                    <CheckCircle2 className={cn("h-5 w-5", product.is_sold ? "text-green-500" : "text-muted/20")} />
                  </div>
                ))}
                <button 
                  onClick={() => router.push('/dashboard/products')}
                  className="w-full py-4 text-sm font-bold text-primary bg-primary/5 rounded-2xl hover:bg-primary/10 transition-colors"
                >
                  View all products
                </button>
              </div>
            ) : (
              <div className="h-[250px] flex flex-col items-center justify-center bg-muted/30 rounded-3xl text-muted-foreground font-medium border-2 border-dashed border-border/50 p-6 text-center">
                 <Package className="h-10 w-10 mb-3 text-muted/30" />
                 <p>No products yet</p>
                 <button 
                  onClick={() => router.push('/dashboard/products')}
                  className="text-sm text-primary font-bold hover:underline mt-2"
                 >
                   Add a product
                 </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
