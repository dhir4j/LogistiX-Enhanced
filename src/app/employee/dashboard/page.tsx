
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/use-api";
import { DollarSign, Package, BarChart, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface EmployeeStats {
    balance: number;
    shipment_count: number;
    total_spent: number; 
}

export default function EmployeeDashboardPage() {
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isSessionLoading && !session) {
            router.push('/employee-login');
        }
    }, [session, isSessionLoading, router]);

    const { data: stats, isLoading, error } = useApi<EmployeeStats>(session ? `/admin/users/${session.id}` : null);
    
    if (isSessionLoading || !session) {
        return (
          <div className="flex justify-center items-center h-screen w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        );
    }
    
    const userDetails = stats ? (stats as any).user : null;
    const shipmentCount = stats ? (stats as any).shipments?.length || 0 : 0;
    const totalSpent = stats ? (stats as any).shipments?.reduce((acc: number, s: any) => acc + s.total_with_tax_18_percent, 0) : 0;

    const statCards = [
        { title: "Current Balance", value: userDetails?.balance, icon: DollarSign, isCurrency: true },
        { title: "Total Shipments", value: shipmentCount, icon: Package },
        { title: "Total Spent", value: totalSpent, icon: BarChart, isCurrency: true },
    ];

  return (
    <div className="flex-1 p-8 bg-gray-100">
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
                        ) : error ? (
                            <p className="text-xs text-red-500">Error</p>
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
