import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, PlusCircle, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="bg-secondary min-h-[calc(100vh-5rem)]">
        <div className="container py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <CardTitle className="text-3xl font-headline flex items-center mb-2">
                        <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
                        Dashboard
                    </CardTitle>
                    <CardDescription>Welcome back, User! Manage your shipping needs.</CardDescription>
                </div>
                <Button asChild className="mt-4 md:mt-0 bg-accent hover:bg-accent/80 text-accent-foreground">
                    <Link href="/booking">
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        New Shipment
                    </Link>
                </Button>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                        <Package className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                        <Truck className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">1 arriving today</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">9</div>
                        <p className="text-xs text-muted-foreground">In the last 30 days</p>
                    </CardContent>
                </Card>

                {/* Recent Shipments */}
                <Card className="md:col-span-2 lg:col-span-3 shadow-lg">
                    <CardHeader>
                        <CardTitle>Recent Shipments</CardTitle>
                        <CardDescription>Here are your most recent shipments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for table */}
                        <div className="text-center py-8 text-muted-foreground">
                            <p>Shipment history will appear here.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
