import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-background p-8 border shadow-sm">
            <div className="text-center pb-8">
              <div className="mx-auto bg-primary/10 text-primary rounded-sm p-3 w-fit mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-headline font-bold">About HK SPEED COURIERS</h1>
              <p className="text-lg text-muted-foreground mt-2">Your Partner in Professional Logistics</p>
            </div>
            <div className="space-y-6 text-base">
              <div className="relative w-full h-64 rounded-sm overflow-hidden border">
                  <Image src="/images/shipment_unload.jpg" alt="Our team loading a truck" layout="fill" objectFit="cover" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to HK SPEED COURIERS, your trusted partner for reliable and efficient courier services. Founded with a vision to bridge distances, we are committed to providing seamless delivery solutions for individuals and businesses alike. Our foundation is built on decades of experience in the logistics industry, ensuring a professional and dependable service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to offer a courier service that is not only swift but also secure and customer-centric. We leverage state-of-the-art technology and a dedicated network of professionals to ensure your packages reach their destination safely and on time, every time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At HK SPEED COURIERS, we understand the importance of every parcel. Whether it's a critical business document, a personal gift, or commercial cargo, we handle each shipment with the utmost care and precision. Our team is trained to manage logistics efficiently, providing you with real-time tracking and transparent communication throughout the delivery process.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We pride ourselves on our core values of integrity, reliability, and innovation. We continuously strive to improve our services, adapt to changing market needs, and exceed customer expectations. Thank you for choosing HK SPEED COURIERS. We look forward to serving your business.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
