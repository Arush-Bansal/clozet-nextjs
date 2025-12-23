import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "./use-profile";

export const useAnalytics = () => {
  const { profile } = useProfile();

  const { data: visits = [], isLoading } = useQuery({
    queryKey: ["profile-visits", profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];

      const { data, error } = await supabase
        .from("profile_visits")
        .select("*")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!profile?.id,
  });

  const totalViews = visits.length;
  
  // Calculate unique views based on visitor_id
  const uniqueViews = new Set(visits.map(v => v.visitor_id)).size;

  // Group visits by day for trend analysis
  const visitsByDay = visits.reduce((acc: Record<string, number>, visit) => {
    const day = new Date(visit.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});

  // Generate last 7 days for the chart
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    return {
      date: dayLabel,
      visits: visitsByDay[dayLabel] || 0
    };
  });

  // Calculate trend (last 7 days vs previous 7 days)
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const last7DaysVisits = visits.filter(v => new Date(v.created_at) >= sevenDaysAgo).length;
  const prev7DaysVisits = visits.filter(v => 
    new Date(v.created_at) >= fourteenDaysAgo && new Date(v.created_at) < sevenDaysAgo
  ).length;

  let trend = 0;
  let trendLabel = "from last week";
  if (prev7DaysVisits > 0) {
    trend = Math.round(((last7DaysVisits - prev7DaysVisits) / prev7DaysVisits) * 100);
  } else if (last7DaysVisits > 0) {
    trend = 100;
  }

  return {
    visits,
    totalViews,
    uniqueViews,
    visitsByDay,
    chartData,
    trend,
    trendLabel,
    isLoading,
  };
};
