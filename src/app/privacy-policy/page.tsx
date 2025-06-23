import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <ShieldAlert className="mr-3 h-8 w-8 text-primary" />
            Privacy Policy
          </CardTitle>
          <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-base">
          <p>This is a placeholder for the Privacy Policy. You should replace this with your own policy.</p>
          <p>We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
        </CardContent>
      </Card>
    </div>
  );
}
