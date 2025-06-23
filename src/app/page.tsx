"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PackageCheck, Truck, Warehouse, CheckCircle2, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

const trackingSteps = [
    { status: 'Delivered', location: 'Ludhiana, IN', timestamp: 'May 24, 2024, 10:30 AM', icon: CheckCircle2, complete: true, current: true },
    { status: 'Out for Delivery', location: 'Ludhiana Hub, IN', timestamp: 'May 24, 2024, 8:00 AM', icon: Truck, complete: true, current: false },
    { status: 'In Transit', location: 'Delhi Hub, IN', timestamp: 'May 23, 2024, 6:00 PM', icon: Truck, complete: true, current: false },
    { status: 'Package Processed', location: 'Delhi Hub, IN', timestamp: 'May 23, 2024, 11:00 AM', icon: Warehouse, complete: true, current: false },
    { status: 'Shipment Created', location: 'Mumbai, IN', timestamp: 'May 22, 2024, 3:00 PM', icon: PackageCheck, complete: true, current: false },
];

export default function Home() {
  const [trackingId, setTrackingId] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleTrack = () => {
    if (trackingId) {
      setShowResult(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl text-center my-12 sm:my-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-primary">
          Swift, Secure, Seamless
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
          Enter your tracking ID to get real-time updates on your shipment.
        </p>
      </div>

      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Package className="mr-2 h-6 w-6" /> Track Your Shipment
          </CardTitle>
          <CardDescription>Enter your tracking number below.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="e.g., RS123456789IN"
              className="text-base"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            />
            <Button type="submit" onClick={handleTrack} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Search className="mr-2 h-5 w-5" />
              Track
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResult && (
        <div className="w-full max-w-4xl mt-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Shipment Details</CardTitle>
              <CardDescription>Tracking ID: <span className="font-bold text-primary">{trackingId}</span></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-[35px] top-[1rem] bottom-[1rem] w-0.5 bg-border -translate-x-1/2"></div>
                
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 mb-8 last:mb-0">
                    <div className={cn(
                        "z-10 flex h-14 w-14 items-center justify-center rounded-full",
                        step.complete ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}>
                      <step.icon className="h-7 w-7" />
                    </div>
                    <div className="pt-2">
                      <p className={cn(
                          "font-bold font-headline text-lg",
                          step.current ? "text-primary" : ""
                      )}>
                        {step.status}
                      </p>
                      <p className="text-muted-foreground text-sm">{step.location}</p>
                      <p className="text-muted-foreground text-xs">{step.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
