import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <Card className="max-w-4xl mx-auto shadow-lg border">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
              <Building2 className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-headline">About RS Swift Couriers</CardTitle>
            <CardDescription className="text-lg">Your Partner in Professional Logistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <div className="relative w-full h-64 rounded-md overflow-hidden">
                <Image src="https://placehold.co/800x320.png" alt="Our corporate office" layout="fill" objectFit="cover" data-ai-hint="corporate office" />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to RS Swift Couriers, your trusted partner for reliable and efficient courier services. Founded with a vision to bridge distances, we are committed to providing seamless delivery solutions for individuals and businesses alike. Our foundation is built on decades of experience in the logistics industry, ensuring a professional and dependable service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to offer a courier service that is not only swift but also secure and customer-centric. We leverage state-of-the-art technology and a dedicated network of professionals to ensure your packages reach their destination safely and on time, every time.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              At RS Swift Couriers, we understand the importance of every parcel. Whether it's a critical business document, a personal gift, or commercial cargo, we handle each shipment with the utmost care and precision. Our team is trained to manage logistics efficiently, providing you with real-time tracking and transparent communication throughout the delivery process.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We pride ourselves on our core values of integrity, reliability, and innovation. We continuously strive to improve our services, adapt to changing market needs, and exceed customer expectations. Thank you for choosing RS Swift Couriers. We look forward to serving your business.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
