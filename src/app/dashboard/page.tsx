import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, PlusCircle, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentShipments = [
  { id: 'RS847563', to: 'New Delhi', date: '2024-05-28', status: 'In Transit' },
  { id: 'RS947362', to: 'Mumbai', date: '2024-05-27', status: 'Delivered' },
  { id: 'RS192837', to: 'Bangalore', date: '2024-05-25', status: 'Delivered' },
  { id: 'RS564738', to: 'Kolkata', date: '2024-05-24', status: 'Out for Delivery' },
  { id: 'RS394857', to: 'Chennai', date: '2024-05-22', status: 'Delivered' },
];

export default function DashboardPage() {
  return (
    <div className="bg-secondary min-h-[calc(100vh-10rem)]">
        <div className="container py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold flex items-center mb-1">
                        <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
                        Client Dashboard
                    </h1>
                    <p className="text-muted-foreground">Welcome back! Here's an overview of your shipping activity.</p>
                </div>
                <Button asChild className="mt-4 md:mt-0">
                    <Link href="/booking">
                        <PlusCircle className="mr-2 h-5 w-5"/>
                        New Shipment
                    </Link>
                </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase">Total Shipments</CardTitle>
                        <Package className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase">In Transit</CardTitle>
                        <Truck className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">1 arriving today</p>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase">Delivered</CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">9</div>
                        <p className="text-xs text-muted-foreground">In the last 30 days</p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-3 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Shipments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tracking ID</TableHead>
                              <TableHead>Destination</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {recentShipments.map((shipment) => (
                              <TableRow key={shipment.id}>
                                <TableCell className="font-medium">{shipment.id}</TableCell>
                                <TableCell>{shipment.to}</TableCell>
                                <TableCell>{shipment.date}</TableCell>
                                <TableCell>
                                    <Badge 
                                        variant={
                                            shipment.status === 'Delivered' ? 'default' : 
                                            shipment.status === 'In Transit' ? 'secondary' : 'outline'
                                        }
                                        className={
                                            shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : ''
                                        }
                                    >
                                        {shipment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm">
                                    Track
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
