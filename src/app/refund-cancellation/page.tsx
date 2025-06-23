import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

export default function RefundCancellationPage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <CircleDollarSign className="mr-3 h-8 w-8 text-primary" />
            Refund & Cancellation Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-base">
          <p>This is a placeholder for the Refund & Cancellation Policy. You should replace this with your own policy.</p>
          <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
        </CardContent>
      </Card>
    </div>
  );
}
