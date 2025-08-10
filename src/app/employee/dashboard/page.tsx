"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/use-api";
import { DollarSign, Package, Users, BarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EmployeeStats {
    balance: number;
    total_shipments: number;
    total_spent: number;
}

// Mocked useApi for now, replace with actual implementation
const useEmployeeApi = <T,>(endpoint: string) => {
    // This is a mock. In a real scenario, you'd fetch this.
    const MOCK_DATA: Record<string, any> = {
        '/employee/stats': {
            balance: 4520.50,
            total_shipments: 28,
            total_spent: 12890.00
        }
    }
    return { data: MOCK_DATA[endpoint] as T, isLoading: false, error: null };
}


export default function EmployeeDashboardPage() {
    const { data: stats, isLoading, error } = useEmployeeApi<EmployeeStats>('/employee/stats');

    const statCards = [
        { title: "Current Balance", value: stats?.balance, icon: DollarSign, isCurrency: true },
        { title: "Total Shipments", value: stats?.total_shipments, icon: Package },
        { title: "Total Spent", value: stats?.total_spent, icon: BarChart, isCurrency: true },
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
        
        {/* Placeholder for more content like recent shipments table */}
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
  