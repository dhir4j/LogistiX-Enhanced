"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Gift } from "lucide-react";

export default function RedeemCodePage() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRedeem = async () => {
    if (!code) {
      toast({
        title: "Error",
        description: "Please enter a top-up code.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
        // In a real app, you'd get the user's email from their session
        const userEmail = "employee@example.com"; 

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee/redeem-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, email: userEmail }),
        });

        const result = await response.json();

        if (response.ok) {
            toast({
                title: "Success!",
                description: result.message,
            });
            setCode("");
        } else {
            toast({
                title: "Redemption Failed",
                description: result.error || "An unexpected error occurred.",
                variant: "destructive",
            });
        }
    } catch (error) {
        toast({
            title: "Network Error",
            description: "Could not connect to the server. Please try again later.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary rounded-sm p-3 w-fit mb-4">
                <Gift className="h-8 w-8" />
            </div>
          <CardTitle className="text-2xl font-bold">Redeem Balance Code</CardTitle>
          <CardDescription>Enter the code provided by your administrator to top up your account balance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your top-up code"
            className="h-12 text-center text-lg tracking-widest"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            disabled={isLoading}
          />
          <Button size="lg" className="w-full h-12 text-lg" onClick={handleRedeem} disabled={isLoading}>
            {isLoading ? "Redeeming..." : "Redeem Now"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
  