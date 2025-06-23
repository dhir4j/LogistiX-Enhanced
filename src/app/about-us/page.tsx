import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <Building2 className="mr-3 h-8 w-8 text-primary" />
            About RS Swift Couriers
          </CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-4 text-base">
          <p>
            Welcome to RS Swift Couriers, your trusted partner for reliable and fast courier services. Founded with a vision to bridge distances, we are committed to providing seamless delivery solutions for individuals and businesses alike.
          </p>
          <p>
            Our journey began with a simple goal: to offer a courier service that is not only swift but also secure and customer-centric. We leverage state-of-the-art technology and a dedicated network of professionals to ensure your packages reach their destination safely and on time.
          </p>
          <p>
            At RS Swift Couriers, we understand the importance of every parcel. Whether it's a critical document, a personal gift, or commercial cargo, we handle each shipment with the utmost care and precision. Our team is trained to manage logistics efficiently, providing you with real-time tracking and transparent communication throughout the delivery process.
          </p>
          <p>
            We pride ourselves on our core values of integrity, reliability, and innovation. We continuously strive to improve our services, adapt to changing market needs, and exceed customer expectations. Thank you for choosing RS Swift Couriers. We look forward to serving you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
