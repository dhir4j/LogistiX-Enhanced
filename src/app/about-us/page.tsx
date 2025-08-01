import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="bg-background p-8 border shadow-sm">
            <div className="text-center pb-8">
              <div className="mx-auto bg-primary/10 text-primary rounded-sm p-3 w-fit mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-headline font-bold">About HK SPEED COURIERS</h1>
              <p className="text-lg text-muted-foreground mt-2">Your Partner in Professional Logistics</p>
            </div>
            <div className="space-y-6 text-base max-w-4xl mx-auto">
              <div className="relative w-full h-64 rounded-sm overflow-hidden border">
                  <Image src="/images/about_us.jpg" alt="About HK Speed Couriers" fill className="object-cover" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to HK SPEED COURIERS, where we redefine logistics with a commitment to speed, reliability, and unparalleled customer service. Founded on the principle of bridging distances, we provide seamless and efficient delivery solutions tailored to meet the diverse needs of individuals and businesses. Our extensive experience in the logistics industry forms the bedrock of our professional and dependable services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to deliver more than just packages; we deliver peace of mind. By integrating state-of-the-art technology with a dedicated network of logistics professionals, we ensure that every shipment is tracked, secure, and delivered on time. We are devoted to a customer-centric approach, making your satisfaction our top priority.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At HK SPEED COURIERS, we recognize that every parcel holds value. From critical business documents and high-value cargo to personal gifts, we handle each item with the utmost care and precision. Our team is expertly trained to manage complex logistics, providing transparent communication and real-time tracking throughout the entire delivery journey.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Integrity, innovation, and reliability are the core values that drive us. We continuously strive to enhance our services, adapt to the dynamic needs of the market, and consistently exceed our customers' expectations. Thank you for placing your trust in HK SPEED COURIERS. We are honored to be your logistics partner and look forward to serving you.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
