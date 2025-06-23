import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Headset } from "lucide-react";

export default function CustomerCarePage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <Headset className="mr-3 h-8 w-8 text-primary" />
            Customer Care
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-base">
          <p>This is a placeholder for the Customer Care page. You can add FAQs, support channels, and contact information here.</p>
          <p>Our customer care team is available to assist you with any inquiries or issues. You can reach us via phone or email during our business hours. We are dedicated to providing you with the best possible support.</p>
        </CardContent>
      </Card>
    </div>
  );
}
