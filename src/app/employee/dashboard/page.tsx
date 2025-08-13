
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/use-api";
import { DollarSign, Package, BarChart, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface EmployeeStats {
    current_balance: number;
    todays_shipments_count: number;
    todays_shipments_value: number;
}

export default function EmployeeDashboardPage() {
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isSessionLoading && !session) {
            router.push('/employee-login');
        }
    }, [session, isSessionLoading, router]);

    const { data: stats, isLoading, error } = useApi<EmployeeStats>(session ? `/api/employee/day-end-stats` : null);
    
    if (isSessionLoading || !session) {
        return (
          <div className="flex justify-center items-center h-screen w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        );
    }
    
    const statCards = [
        { title: "Current Balance", value: stats?.current_balance, icon: DollarSign, isCurrency: true },
        { title: "Shipments Today", value: stats?.todays_shipments_count, icon: Package },
        { title: "Volume Today", value: stats?.todays_shipments_value, icon: BarChart, isCurrency: true },
    ];

  return (
    <div className="flex-1 p-8 bg-gray-100/50">
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-3">
            {statCards.map((card, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        <card.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-8 w-1/2" />
                        ) : (
                            <div className="text-2xl font-bold">
                                {card.isCurrency ? `₹${Number(card.value ?? 0).toFixed(2)}` : (card.value ?? 0)}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your recent shipments and transactions will appear here.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
