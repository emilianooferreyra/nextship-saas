import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/dashboard/stats-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { DollarSign, Users, CreditCard, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.email?.split("@")[0] || "User"}! Here&apos;s
          what&apos;s happening with your business.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Revenue"
              value="$45,231.89"
              description="from last month"
              icon={DollarSign}
              trend={{ value: 20.1, isPositive: true }}
              iconBgColor="bg-green-500/10"
            />
            <StatsCard
              title="Subscriptions"
              value="+2,350"
              description="from last month"
              icon={Users}
              trend={{ value: 18.5, isPositive: true }}
              iconBgColor="bg-blue-500/10"
            />
            <StatsCard
              title="Sales"
              value="+12,234"
              description="from last month"
              icon={CreditCard}
              trend={{ value: 12.3, isPositive: true }}
              iconBgColor="bg-purple-500/10"
            />
            <StatsCard
              title="Active Now"
              value="+573"
              description="from last hour"
              icon={TrendingUp}
              trend={{ value: 8.2, isPositive: true }}
              iconBgColor="bg-orange-500/10"
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <OverviewChart />
            </div>
            <div className="col-span-3">
              <RecentActivity />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              Analytics content coming soon...
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              Reports content coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
