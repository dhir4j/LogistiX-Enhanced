"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackagePlus } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <PackagePlus className="mr-3 h-8 w-8 text-primary" />
            Book a Shipment
          </CardTitle>
          <CardDescription>Fill in the details below to book your shipment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="domestic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="domestic">Domestic</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>
            <TabsContent value="domestic">
              <BookingForm type="Domestic" />
            </TabsContent>
            <TabsContent value="international">
              <BookingForm type="International" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function BookingForm({ type }: { type: 'Domestic' | 'International' }) {
  return (
    <form className="space-y-6 mt-6">
      <h3 className="text-xl font-semibold font-headline text-primary">{type} Booking</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`from-${type}`}>From (Pincode)</Label>
          <Input id={`from-${type}`} placeholder="Enter origin pincode" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`to-${type}`}>To (Pincode)</Label>
          <Input id={`to-${type}`} placeholder="Enter destination pincode" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor={`weight-${type}`}>Weight (kg)</Label>
          <Input id={`weight-${type}`} type="number" placeholder="e.g., 2.5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`dimensions-${type}`}>Dimensions (cm)</Label>
          <Input id={`dimensions-${type}`} placeholder="L x W x H" />
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Check Price & Book
      </Button>
    </form>
  )
}
