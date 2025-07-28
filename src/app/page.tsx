"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PackageCheck, Truck, Warehouse, CheckCircle2, ArrowRight, Globe, ShieldCheck, BookOpenCheck, Box, MapPin, Star, Briefcase, Ship } from 'lucide-react';
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
  { title: "Domestic & International", description: "Reliable shipping across the country and the globe.", icon: Globe },
  { title: "Secure Transport", description: "Ensuring your items are handled professionally and securely.", icon: ShieldCheck },
  { title: "Timely Delivery", description: "Committed to delivering your packages on schedule.", icon: Truck },
];

const coreServices = [
  {
    title: "Domestic Express",
    description: "Swift, time-definite delivery for your documents and small parcels across the country.",
    icon: Truck
  },
  {
    title: "International Shipping",
    description: "Connect your business to the world with our seamless and reliable international courier services.",
    icon: Globe
  },
  {
    title: "E-commerce Logistics",
    description: "Comprehensive solutions for online businesses, from warehousing to last-mile delivery.",
    icon: PackageCheck
  },
  {
    title: "Corporate Solutions",
    description: "Customized services tailored to meet the specific needs of our corporate clients.",
    icon: Briefcase
  },
];


const howItWorksSteps = [
  { title: "Create a Booking", description: "Fill out our simple online form to schedule your shipment in minutes.", icon: BookOpenCheck },
  { title: "We Collect Your Parcel", description: "Our team will pick up your package right from your doorstep at the scheduled time.", icon: Box },
  { title: "Real-Time Tracking", description: "Monitor your shipment's journey with our live tracking system from start to finish.", icon: MapPin },
  { title: "Secure Delivery", description: "Your package is delivered safely and on time to its final destination.", icon: ShieldCheck },
];

const testimonials = [
  { name: "Anjali Mehta", role: "E-commerce Store Owner", quote: "HK SPEED COURIERS has transformed our shipping process. Their reliability and professionalism are unmatched. Our customers are happier than ever with the speedy deliveries." },
  { name: "Rahul Verma", role: "Corporate Client", quote: "We trust HK SPEED COURIERS with all our important documents and parcels. Their secure and timely service gives us complete peace of mind. Highly recommended for any business." },
  { name: "Priya Singh", role: "Individual Shipper", quote: "Sending a package to my family was so easy and affordable. The customer service was excellent, and the real-time tracking was a great feature. I'll definitely use their service again." },
]

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
      <section className="relative bg-secondary py-20 sm:py-28 border-b">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold font-headline tracking-tight text-foreground">
              Professional Courier &<br />Logistics Services
            </h1>
            <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-muted-foreground">
              Your trusted partner for dependable and efficient delivery solutions. We handle your shipments with professionalism and care.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg">
                <Link href="/booking">Book a Shipment <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#track">Track Your Package</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 lg:h-auto">
            <Image 
              src="/images/man_holding_box.jpg"
              alt="Courier holding a package" 
              width={1200}
              height={800}
              className="rounded-md border object-cover shadow-sm w-full h-full"
              data-ai-hint="courier package"
            />
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section id="track" className="py-16 sm:py-24 bg-background border-b">
        <div className="container mx-auto flex flex-col items-center">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">Track Your Shipment</h2>
                <p className="mt-4 text-muted-foreground text-lg">Enter your tracking number below to see the real-time status of your delivery.</p>
            </div>
            <div className="mt-8 w-full max-w-2xl">
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Enter your Tracking ID, e.g., RS123456789IN"
                  className="text-base h-12"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                />
                <Button type="submit" onClick={handleTrack} size="lg" className="h-12">
                  <Search className="mr-2 h-5 w-5" />
                  Track
                </Button>
              </div>
            </div>

          {showResult && (
            <div className="w-full max-w-4xl mt-12">
              <Card className="shadow-md border">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Shipment Progress</CardTitle>
                  <CardDescription>Tracking ID: <span className="font-bold text-primary">{trackingId}</span></CardDescription>
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
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">Why Choose Us?</h2>
            <p className="mt-4 text-muted-foreground text-lg">We provide reliable, secure, and timely delivery services to meet all your needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary/10 text-primary shrink-0">
                  <feature.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-headline text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="bg-background py-16 sm:py-24 border-t">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">Our Core Services</h2>
            <p className="mt-4 text-muted-foreground text-lg">Explore our range of expert courier services designed to cater to your every need, from local deliveries to global logistics.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <div key={index} className="flex gap-6 items-start p-6 border rounded-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-primary/10 text-primary">
                      <service.icon className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-headline font-semibold">{service.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/services">View All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-secondary py-16 sm:py-24 border-t">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">Simple Steps to Ship Your Package</h2>
            <p className="mt-4 text-muted-foreground text-lg">Our process is designed for your convenience, ensuring a hassle-free experience from start to finish.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center p-6 border bg-background rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4 ring-8 ring-primary/5">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="font-headline text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Transport Modes Section */}
      <section className="bg-background py-16 sm:py-24 border-t">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">Comprehensive Transport Solutions</h2>
              <p className="mt-4 text-muted-foreground text-lg">We offer a wide range of transport options to meet your needs, including air, sea, and ground.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative h-[450px] w-full">
              <Image src="/images/flying_plane.jpg" alt="Air freight" fill className="object-cover rounded-md border" data-ai-hint="plane sky" />
            </div>
            <div className="relative h-[450px] w-full">
              <Image src="/images/truck_in_go_down.jpg" alt="Ground transport" fill className="object-cover rounded-md border" data-ai-hint="truck warehouse" />
            </div>
            <div className="relative h-[450px] w-full">
              <Image src="/images/ship_in_ocean.jpg" alt="Sea freight" fill className="object-cover rounded-md border" data-ai-hint="cargo ship" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-secondary py-16 sm:py-24 border-t">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">What Our Customers Say</h2>
            <p className="mt-4 text-muted-foreground text-lg">We are proud to have the trust of our clients. Read what they say about our services.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-sm border bg-background">
                <CardContent className="pt-6">
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="mt-4">
                    <p className="font-bold font-headline text-lg">{testimonial.name}</p>
                    <p className="text-sm text-primary font-semibold">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us CTA */}
      <section className="bg-background py-16 sm:py-24 border-t">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                  <h2 className="text-3xl sm:text-4xl font-bold font-headline text-foreground">Your Partner in Professional Logistics</h2>
                  <p className="mt-4 text-muted-foreground text-lg">
                      With decades of experience, HK SPEED COURIERS is dedicated to providing superior logistics and courier services. We are founded on the principles of reliability, efficiency, and unwavering customer support, ensuring your business and personal shipping needs are met with the highest standards of excellence.
                  </p>
                  <Button asChild size="lg" className="mt-8">
                      <Link href="/about-us">Learn More About Us</Link>
                  </Button>
              </div>
               <div className="relative h-80 md:h-96">
                  <Image 
                    src="/images/shipment_load.jpg"
                    alt="Our team at work"
                    fill
                    className="object-cover rounded-md border shadow-sm"
                    data-ai-hint="team logistics"
                  />
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
