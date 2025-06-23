import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
        <div className="container">
            <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                        <ShieldAlert className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
                    <CardDescription>How we handle your data.</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-4 text-base">
                <p>This is a placeholder for the Privacy Policy. You should replace this with your own policy.</p>
                <p>We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
