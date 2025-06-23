import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function ShippingDeliveryPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
        <div className="container">
            <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <Truck className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Shipping & Delivery Policy</CardTitle>
                    <CardDescription>Information about our shipping process.</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-base">
                <p>This is a placeholder for the Shipping & Delivery Policy. You should replace this with your own policy.</p>
                <p>We offer various shipping options to meet your needs. Shipping costs are calculated at checkout based on the weight and destination of your order. Delivery times are estimates and commence from the date of shipping, rather than the date of order.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
