"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ResponseContent() {
    const params   = useSearchParams();
    const status   = params.get("status");
    const amount   = params.get("amount");
    const orderId  = params.get("order_id");
    const reason   = params.get("reason");

    const success  = status === "success";

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        {success
                            ? <CheckCircle2 className="h-16 w-16 text-green-500" />
                            : <XCircle className="h-16 w-16 text-red-500" />
                        }
                    </div>
                    <CardTitle className="text-2xl">
                        {success ? "Payment Successful" : "Payment Failed"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {success && amount && (
                        <p className="text-muted-foreground">
                            <span className="text-3xl font-bold text-foreground">₹{parseFloat(amount).toFixed(2)}</span>
                            <br />added to your wallet.
                        </p>
                    )}
                    {!success && reason && (
                        <p className="text-muted-foreground">
                            Reason: <span className="text-foreground font-medium">{reason}</span>
                        </p>
                    )}
                    {orderId && (
                        <p className="text-xs text-muted-foreground font-mono">Order ID: {orderId}</p>
                    )}
                    <div className="flex flex-col gap-2 pt-2">
                        <Button asChild>
                            <Link href="/payments">Go to Payments</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function PaymentResponsePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        }>
            <ResponseContent />
        </Suspense>
    );
}
