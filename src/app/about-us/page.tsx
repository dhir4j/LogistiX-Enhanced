import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <Building2 className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-headline">About RS Swift Couriers</CardTitle>
            <CardDescription>Your partner in swift & secure deliveries.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <div className="relative w-full h-64 rounded-lg overflow-hidden my-6">
                <Image src="https://placehold.co/800x400.png" alt="Our team" layout="fill" objectFit="cover" data-ai-hint="office team" />
            </div>
            <p className="text-muted-foreground">
              Welcome to RS Swift Couriers, your trusted partner for reliable and fast courier services. Founded with a vision to bridge distances, we are committed to providing seamless delivery solutions for individuals and businesses alike.
            </p>
            <p className="text-muted-foreground">
              Our journey began with a simple goal: to offer a courier service that is not only swift but also secure and customer-centric. We leverage state-of-the-art technology and a dedicated network of professionals to ensure your packages reach their destination safely and on time.
            </p>
            <p className="text-muted-foreground">
              At RS Swift Couriers, we understand the importance of every parcel. Whether it's a critical document, a personal gift, or commercial cargo, we handle each shipment with the utmost care and precision. Our team is trained to manage logistics efficiently, providing you with real-time tracking and transparent communication throughout the delivery process.
            </p>
            <p className="text-muted-foreground">
              We pride ourselves on our core values of integrity, reliability, and innovation. We continuously strive to improve our services, adapt to changing market needs, and exceed customer expectations. Thank you for choosing RS Swift Couriers. We look forward to serving you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
