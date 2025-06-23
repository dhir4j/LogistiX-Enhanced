"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PackageCheck, Truck, Warehouse, CheckCircle2, Package, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const trackingSteps = [
    { status: 'Delivered', location: 'Ludhiana, IN', timestamp: 'May 24, 2024, 10:30 AM', icon: CheckCircle2, complete: true, current: true },
    { status: 'Out for Delivery', location: 'Ludhiana Hub, IN', timestamp: 'May 24, 2024, 8:00 AM', icon: Truck, complete: true, current: false },
    { status: 'In Transit', location: 'Delhi Hub, IN', timestamp: 'May 23, 2024, 6:00 PM', icon: Truck, complete: true, current: false },
    { status: 'Package Processed', location: 'Delhi Hub, IN', timestamp: 'May 23, 2024, 11:00 AM', icon: Warehouse, complete: true, current: false },
    { status: 'Shipment Created', location: 'Mumbai, IN', timestamp: 'May 22, 2024, 3:00 PM', icon: PackageCheck, complete: true, current: false },
];

const features = [
  { title: "Domestic & International", description: "Seamless shipping across the country and the globe.", icon: Truck },
  { title: "Secure Packaging", description: "Ensuring your items are safe and sound.", icon: PackageCheck },
  { title: "Real-Time Tracking", description: "Stay updated every step of the way.", icon: Search },
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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-secondary py-20 sm:py-32">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-primary">
              Swift, Secure, Seamless
            </h1>
            <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-lg sm:text-xl text-muted-foreground">
              Your one-stop solution for reliable and fast courier services. Track your package, book a new shipment, and manage your deliveries with ease.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/booking">Book a Shipment <MoveRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#track">Track a Package</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Courier delivery person" 
              width={600}
              height={400}
              className="rounded-lg shadow-2xl object-cover"
              data-ai-hint="courier delivery"
            />
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="track" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto flex flex-col items-center">
          <Card className="w-full max-w-2xl shadow-xl border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl flex items-center justify-center">
                <Package className="mr-3 h-8 w-8 text-primary" /> Track Your Shipment
              </CardTitle>
              <CardDescription>Enter your tracking number below for real-time updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="e.g., RS123456789IN"
                  className="text-base h-12"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                />
                <Button type="submit" onClick={handleTrack} size="lg" className="h-12 bg-primary hover:bg-primary/90">
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
                  <div className="relative pl-8">
                    {/* Vertical line */}
                    <div className="absolute left-[39px] top-3 bottom-3 w-0.5 bg-border -translate-x-1/2"></div>
                    
                    {trackingSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                        <div className={cn(
                            "z-10 flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-background",
                            step.complete ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}>
                          <step.icon className="h-5 w-5" />
                        </div>
                        <div className="pt-1.5">
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
      </section>

      {/* Features Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">Why Choose Us?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">We provide top-tier courier services with a focus on speed, safety, and customer satisfaction.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
