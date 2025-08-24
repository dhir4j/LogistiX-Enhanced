"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function MyShipmentsPage() {
    return (
        <div>
             <h1 className="text-2xl font-bold mb-6">My Shipments</h1>
             <Card>
                <CardHeader>
                     <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>This feature to manage all your shipments is currently under construction.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="ongoing">
                        <TabsList>
                            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
                            <TabsTrigger value="delivered">Delivered</TabsTrigger>
                            <TabsTrigger value="pending">Pending Pickups</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ongoing">
                             <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
                                <Package className="h-12 w-12 mb-4" />
                                <p>You will be able to see all your in-transit shipments here.</p>
                            </div>
                        </TabsContent>
                         <TabsContent value="delivered">
                             <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
                                <Package className="h-12 w-12 mb-4" />
                                <p>You will be able to see your complete shipment history here.</p>
                            </div>
                        </TabsContent>
                         <TabsContent value="pending">
                             <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
                                <Package className="h-12 w-12 mb-4" />
                                <p>You will be able to see all your scheduled pickups here.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
