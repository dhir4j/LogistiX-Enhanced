import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
        <div className="container">
            <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <FileText className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Terms of Service</CardTitle>
                    <CardDescription>The rules for using our service.</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-base">
                <p>This is a placeholder for the Terms of Service. You should replace this with your own terms.</p>
                <p>By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
