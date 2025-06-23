import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

export default function RefundCancellationPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
        <div className="container">
            <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <CircleDollarSign className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Refund & Cancellation Policy</CardTitle>
                    <CardDescription>Our commitment to a fair process.</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-base">
                <p>This is a placeholder for the Refund & Cancellation Policy. You should replace this with your own policy.</p>
                <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
