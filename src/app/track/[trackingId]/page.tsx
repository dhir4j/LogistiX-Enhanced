
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PackageCheck, Truck, Warehouse, CheckCircle2, ArrowLeft, Loader2, Download, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TrackingHistory {
    stage: string;
    date: string;
    location: string;
    activity: string;
}

interface ShipmentDetails {
    shipment_id_str: string;
    status: string;
    tracking_history: TrackingHistory[];
    // Add any other shipment details you want to display
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Delivered': return CheckCircle2;
        case 'Out for Delivery': return Truck;
        case 'In Transit': return Truck;
        case 'Booked': return PackageCheck;
        case 'Pending Payment': return PackageCheck;
        default: return Warehouse;
    }
}

export default function TrackingResultPage() {
  const params = useParams();
  const router = useRouter();
  
  const idFromUrl = Array.isArray(params.trackingId) ? params.trackingId[0] : params.trackingId;
  const [trackingId, setTrackingId] = useState(idFromUrl || '');
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idFromUrl) {
      const fetchShipmentDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipments/${idFromUrl}`);
          if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Shipment not found');
          }
          const data: ShipmentDetails = await response.json();
          setShipmentDetails(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchShipmentDetails();
    } else {
        setIsLoading(false);
    }
  }, [idFromUrl]);

  const handleTrack = () => {
    if (trackingId) {
      router.push(`/track/${trackingId}`);
    }
  };

  return (
    <div className="bg-secondary py-16 sm:py-24 min-h-[calc(100vh-10rem)]">
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
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              />
              <Button type="submit" onClick={handleTrack} size="lg" className="h-12">
                <Search className="mr-2 h-5 w-5" />
                Track Another
              </Button>
            </div>
            
            <Card className="shadow-md border">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-2xl">Shipment Progress</CardTitle>
                        <CardDescription>Tracking ID: <span className="font-bold text-primary">{idFromUrl}</span></CardDescription>
                    </div>
                     {shipmentDetails && (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/awb/${idFromUrl}`} target="_blank"><Download className="mr-2 h-4 w-4"/> AWB</Link>
                            </Button>
                             <Button variant="outline" size="sm" asChild>
                                <Link href={`/invoice/${idFromUrl}`} target="_blank"><FileText className="mr-2 h-4 w-4"/> Invoice</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isLoading && (
                    <div className="flex items-center justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                )}
                {error && (
                    <div className="text-center p-12 text-red-500">
                        <p>{error}</p>
                    </div>
                )}
                {shipmentDetails && (
                    <div className="relative pl-8">
                        <div className="absolute left-[39px] top-3 bottom-3 w-0.5 bg-border -translate-x-1/2"></div>
                        
                        {shipmentDetails.tracking_history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((step, index) => {
                            const Icon = getStatusIcon(step.stage);
                            const isCurrent = index === 0;
                            return (
                                <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                                <div className={cn(
                                    "z-10 flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-secondary",
                                    'bg-primary text-primary-foreground'
                                )}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="pt-1.5">
                                    <p className={cn(
                                        "font-semibold text-lg",
                                        isCurrent ? "text-primary" : "text-foreground"
                                    )}>
                                    {step.stage}
                                    </p>
                                    <p className="text-muted-foreground text-sm">{step.location}</p>
                                    <p className="text-muted-foreground text-sm">{step.activity}</p>
                                    <p className="text-muted-foreground text-xs">{new Date(step.date).toLocaleString()}</p>
                                </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
