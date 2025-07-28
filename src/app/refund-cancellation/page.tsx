import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

export default function RefundCancellationPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
        <div className="container">
            <Card className="max-w-4xl mx-auto shadow-lg border">
                <CardHeader className="text-center pb-8">
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
                        <CircleDollarSign className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Refund & Cancellation Policy</CardTitle>
                    <CardDescription className="text-lg">Our commitment to a fair process.</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-base leading-relaxed">
                <p><strong>Cancellations:</strong> A shipment booking can be cancelled up to 2 hours before the scheduled pickup time for a full refund. Cancellations made after this period may be subject to a cancellation fee.</p>
                
                <p><strong>Refunds:</strong> Refunds for cancelled services will be processed within 5-7 business days to the original method of payment. For issues related to service quality or non-delivery, please contact customer care to initiate a claim. Each claim will be investigated on a case-by-case basis.</p>

                <p>Our policy lasts 30 days for claim submissions regarding service discrepancies. If 30 days have gone by since the delivery date, unfortunately, we may not be able to offer a refund or re-service.</p>
                
                <p>To request a cancellation or refund, please contact our customer service team with your booking reference number.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
