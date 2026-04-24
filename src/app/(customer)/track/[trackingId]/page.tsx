
"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PackageCheck, Truck, Warehouse, CheckCircle2, Loader2, Download, FileText, CircleAlert, CreditCard } from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useSession } from '@/hooks/use-session';

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
    total_with_tax_18_percent: number;
    payment_status: 'Pending' | 'Approved' | 'Rejected' | null;
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Delivered': return CheckCircle2;
        case 'Out for Delivery': return Truck;
        case 'In Transit': return Truck;
        case 'Booked': return PackageCheck;
        case 'Pending Payment': return CreditCard;
        case 'Cancelled': return CircleAlert;
        default: return Warehouse;
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Delivered': return 'bg-green-500 text-white';
        case 'Cancelled': return 'bg-red-500 text-white';
        case 'Out for Delivery':
        case 'In Transit': return 'bg-blue-500 text-white';
        case 'Pending Payment': return 'bg-orange-500 text-white';
        default: return 'bg-primary text-primary-foreground';
    }
}

export default function TrackingResultPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { session } = useSession();

  const idFromUrl = Array.isArray(params.trackingId) ? params.trackingId[0] : params.trackingId;
  const [trackingId, setTrackingId] = useState(idFromUrl || '');
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(!!idFromUrl);
  const [error, setError] = useState<string | null>(null);
  const [isInitiatingPayment, setIsInitiatingPayment] = useState(false);
  const [ccParams, setCcParams] = useState<{ enc_request: string; access_code: string; payment_url: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (ccParams && formRef.current) formRef.current.submit();
  }, [ccParams]);

  const fetchShipmentDetails = async (id: string) => {
      if (!id) {
          setIsLoading(false);
          return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipments/${id}`);
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Shipment not found');
        }
        const data: ShipmentDetails = await response.json();
        setShipmentDetails(data);
      } catch (err: any) {
        setError(err.message);
        setShipmentDetails(null);
      } finally {
        setIsLoading(false);
      }
  };


  useEffect(() => {
    if (idFromUrl) {
      fetchShipmentDetails(idFromUrl);
    }
  }, [idFromUrl]);

  const handleTrack = () => {
    if (trackingId) {
      router.push(`/track/${trackingId}`);
    }
  };

  const handlePayNow = async () => {
    if (!shipmentDetails || !session) return;
    setIsInitiatingPayment(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: session.email,
          amount: shipmentDetails.total_with_tax_18_percent,
          name: `${session.firstName} ${session.lastName}`,
          phone: '9999999999',
          shipment_id_str: shipmentDetails.shipment_id_str,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        toast({ title: "Payment Error", description: result.error, variant: "destructive" });
        setIsInitiatingPayment(false);
        return;
      }
      setCcParams(result);
    } catch {
      toast({ title: "Network Error", description: "Could not initiate payment.", variant: "destructive" });
      setIsInitiatingPayment(false);
    }
  };

  const showPaymentForm = shipmentDetails?.status === 'Pending Payment';


  return (
    <div className="space-y-8">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter your Tracking ID"
            className="text-base h-12 bg-background"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
          />
          <Button type="submit" onClick={handleTrack} size="lg" className="h-12">
            <Search className="mr-2 h-5 w-5" />
            Track Another
          </Button>
        </div>
        
        {isLoading && (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )}
        {error && (
            <Card className="text-center p-12 text-red-500 border-red-500">
                <CardHeader>
                    <CardTitle>Tracking Error</CardTitle>
                    <CardDescription className="text-red-500">{error}</CardDescription>
                </CardHeader>
            </Card>
        )}

        {/* Hidden CCAvenue auto-submit form */}
        {ccParams && (
          <form ref={formRef} method="POST" action={ccParams.payment_url} style={{ display: 'none' }}>
            <input type="hidden" name="encRequest"  value={ccParams.enc_request} />
            <input type="hidden" name="access_code" value={ccParams.access_code} />
          </form>
        )}

        {showPaymentForm && (
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Payment</CardTitle>
                    <CardDescription>
                        Your booking is confirmed. Please complete the payment of{' '}
                        <span className="font-bold text-primary">₹{shipmentDetails!.total_with_tax_18_percent.toFixed(2)}</span>{' '}
                        to proceed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4 py-6">
                    <CreditCard className="h-12 w-12 text-primary" />
                    <p className="text-muted-foreground text-sm text-center max-w-sm">
                        You will be redirected to the secure Kotak payment gateway to complete your payment.
                    </p>
                    <Button size="lg" onClick={handlePayNow} disabled={isInitiatingPayment} className="w-full max-w-xs">
                        {isInitiatingPayment
                            ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting...</>
                            : `Pay ₹${shipmentDetails!.total_with_tax_18_percent.toFixed(2)} via Kotak`
                        }
                    </Button>
                </CardContent>
            </Card>
        )}


        {shipmentDetails && (
        <Card>
          <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                      <CardTitle className="font-headline text-2xl">Shipment Progress</CardTitle>
                      <CardDescription>Tracking ID: <span className="font-bold text-primary">{idFromUrl}</span></CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                          <Link href={`/awb/${idFromUrl}`} target="_blank"><Download className="mr-2 h-4 w-4"/> AWB</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                          <Link href={`/invoice/${idFromUrl}`} target="_blank"><FileText className="mr-2 h-4 w-4"/> Invoice</Link>
                      </Button>
                  </div>
              </div>
          </CardHeader>
          <CardContent>
              <div className="relative pl-8">
                  <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-border -translate-x-1/2"></div>
                  
                  {shipmentDetails.tracking_history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((step, index) => {
                      const Icon = getStatusIcon(step.stage);
                      const iconColor = getStatusColor(step.stage);
                      return (
                          <div key={index} className="flex items-start gap-6 mb-8 last:mb-0">
                          <div className={cn(
                              "z-10 flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-secondary",
                              iconColor
                          )}>
                              <Icon className="h-5 w-5" />
                          </div>
                          <div className="pt-1.5 flex-1">
                              <div className="grid grid-cols-3 gap-4 items-start">
                                  <div className="col-span-2">
                                      <p className="font-semibold text-lg">{step.activity}</p>
                                      <p className="text-muted-foreground text-sm">{new Date(step.date).toLocaleString()}</p>
                                  </div>
                                  <p className="text-muted-foreground text-sm font-medium text-right">{step.location}</p>
                              </div>
                              <p className="text-muted-foreground text-sm mt-1">{step.stage}</p>
                          </div>
                          </div>
                      )
                  })}
              </div>
          </CardContent>
        </Card>
        )}
    </div>
  );
}

    