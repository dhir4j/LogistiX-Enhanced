import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <FileText className="mr-3 h-8 w-8 text-primary" />
            Terms of Service
          </CardTitle>
           <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-base">
           <p>This is a placeholder for the Terms of Service. You should replace this with your own terms.</p>
           <p>By accessing or using our service, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
        </CardContent>
      </Card>
    </div>
  );
}
