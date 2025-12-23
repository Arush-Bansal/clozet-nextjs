"use client";

import { useAnalytics } from "@/hooks/use-analytics";
import PageHeader from "@/components/dashboard/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
} from "recharts";
import { Users, Eye, TrendingUp, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const { totalViews, uniqueViews, trend, chartData, visitsByDay, isLoading } = useAnalytics();

  const stats = [
    { 
      label: "Total Visits", 
      value: totalViews, 
      icon: Eye, 
      color: "text-blue-600",
      description: "Total page loads"
    },
    { 
      label: "Unique Visitors", 
      value: uniqueViews, 
      icon: Users, 
      color: "text-purple-600",
      description: "Based on session IDs"
    },
    { 
      label: "Growth", 
      value: `${trend >= 0 ? '+' : ''}${trend}%`, 
      icon: TrendingUp, 
      color: "text-green-600",
      description: "Compared to last week"
    },
    { 
      label: "Top Day", 
      value: Object.entries(visitsByDay).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A', 
      icon: Calendar, 
      color: "text-orange-600",
      description: "Most active day"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="Analytics" 
        description="Deep dive into your store's performance and visitor behavior."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
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
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-1">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="font-serif text-xl">Visitor Traffic (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] w-full pt-4">
            {isLoading ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : totalViews > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVisitsFull" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
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
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: 'var(--shadow-lg)',
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
                    fill="url(#colorVisitsFull)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-muted/30 rounded-2xl text-muted-foreground font-medium border-2 border-dashed border-border/50 p-6 text-center">
                <Eye className="h-12 w-12 mb-4 text-muted/30" />
                <p>Start sharing your profile to see traffic insights!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
