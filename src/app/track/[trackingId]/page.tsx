"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PackageCheck, Truck, Warehouse, CheckCircle2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const trackingSteps = [
    { status: 'Delivered', location: 'Ludhiana, IN', timestamp: 'May 24, 2024, 10:30 AM', icon: CheckCircle2, complete: true, current: true },
    { status: 'Out for Delivery', location: 'Ludhiana Hub, IN', timestamp: 'May 24, 2024, 8:00 AM', icon: Truck, complete: true, current: false },
    { status: 'In Transit', location: 'Delhi Hub, IN', timestamp: 'May 23, 2024, 6:00 PM', icon: Truck, complete: true, current: false },
    { status: 'Package Processed', location: 'Delhi Hub, IN', timestamp: 'May 23, 2024, 11:00 AM', icon: Warehouse, complete: true, current: false },
    { status: 'Shipment Created', location: 'Mumbai, IN', timestamp: 'May 22, 2024, 3:00 PM', icon: PackageCheck, complete: true, current: false },
];

export default function TrackingResultPage() {
  const params = useParams();
  const router = useRouter();
  const [trackingId, setTrackingId] = useState('');
  
  // The trackingId from the URL can be a string or an array of strings.
  const idFromUrl = Array.isArray(params.trackingId) ? params.trackingId[0] : params.trackingId;

  useEffect(() => {
    if (idFromUrl) {
      setTrackingId(idFromUrl);
    }
  }, [idFromUrl]);

  const handleTrack = () => {
    if (trackingId) {
      router.push(`/track/${trackingId}`);
    }
  };

  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Button asChild variant="outline">
                    <Link href="/track">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Tracking
                    </Link>
                </Button>
            </div>
            
            <div className="flex w-full items-center space-x-2 mb-8">
              <Input
                type="text"
                placeholder="Enter your Tracking ID"
                className="text-base h-12"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              />
              <Button type="submit" onClick={handleTrack} size="lg" className="h-12">
                <Search className="mr-2 h-5 w-5" />
                Track Another
              </Button>
            </div>
            
            <Card className="shadow-md border">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Shipment Progress</CardTitle>
                <CardDescription>Tracking ID: <span className="font-bold text-primary">{idFromUrl}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative pl-8">
                {/* Vertical line */}
                <div className="absolute left-[39px] top-3 bottom-3 w-0.5 bg-border -translate-x-1/2"></div>
                
                {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                    <div className={cn(
                        "z-10 flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-secondary",
                        step.complete ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}>
                        <step.icon className="h-5 w-5" />
                    </div>
                    <div className="pt-1.5">
                        <p className={cn(
                            "font-semibold text-lg",
                            step.current ? "text-primary" : "text-foreground"
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
      </div>
    </div>
  );
}
