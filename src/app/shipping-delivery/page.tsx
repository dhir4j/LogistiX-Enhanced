import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";

export default function ShippingDeliveryPage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <Truck className="mr-3 h-8 w-8 text-primary" />
            Shipping & Delivery Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-base">
          <p>This is a placeholder for the Shipping & Delivery Policy. You should replace this with your own policy.</p>
          <p>We offer various shipping options to meet your needs. Shipping costs are calculated at checkout based on the weight and destination of your order. Delivery times are estimates and commence from the date of shipping, rather than the date of order.</p>
        </CardContent>
      </Card>
    </div>
  );
}
