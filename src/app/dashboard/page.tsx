
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, PlusCircle, Truck, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";

interface Shipment {
  id: number;
  shipment_id_str: string;
  receiver_name: string;
  booking_date: string;
  status: string;
}

export default function DashboardPage() {
  const { session, isLoading: isSessionLoading } = useSession();
  const router = useRouter();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSessionLoading) {
      if (!session) {
        router.push('/login');
      } else {
        const fetchShipments = async () => {
          setIsLoading(true);
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shipments?email=${session.email}`);
            if (response.ok) {
              const data = await response.json();
              setShipments(data);
            }
          } catch (error) {
            console.error("Failed to fetch shipments", error);
          } finally {
            setIsLoading(false);
          }
        };
        fetchShipments();
      }
    }
  }, [session, isSessionLoading, router]);

  if (isSessionLoading || !session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const stats = {
      total: shipments.length,
      inTransit: shipments.filter(s => s.status === 'In Transit' || s.status === 'Out for Delivery').length,
      delivered: shipments.filter(s => s.status === 'Delivered').length,
  }

  return (
    <div className="bg-secondary min-h-[calc(100vh-10rem)]">
        <div className="container py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-headline font-bold flex items-center mb-1">
                        <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
                        Client Dashboard
                    </h1>
                    <p className="text-muted-foreground">Welcome back, {session.firstName}! Here's an overview of your shipping activity.</p>
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
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase">In Transit</CardTitle>
                        <Truck className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.inTransit}</div>
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium uppercase">Delivered</CardTitle>
                        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.delivered}</div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 lg:col-span-3 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Shipments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                             <div className="flex justify-center items-center p-12">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : (
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
                            {shipments.slice(0, 5).map((shipment) => (
                              <TableRow key={shipment.id}>
                                <TableCell className="font-medium">{shipment.shipment_id_str}</TableCell>
                                <TableCell>{shipment.receiver_name}</TableCell>
                                <TableCell>{new Date(shipment.booking_date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge 
                                        variant={
                                            shipment.status === 'Delivered' ? 'default' : 
                                            (shipment.status === 'In Transit' || shipment.status === 'Out for Delivery') ? 'secondary' : 'outline'
                                        }
                                        className={
                                            shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            (shipment.status === 'In Transit' || shipment.status === 'Out for Delivery') ? 'bg-blue-100 text-blue-800' : ''
                                        }
                                    >
                                        {shipment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/track/${shipment.shipment_id_str}`}>Track</Link>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
