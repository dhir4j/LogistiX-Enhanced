import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, Rocket, Lightbulb, ShieldCheck, ThumbsUp, Goal } from "lucide-react";
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
            <div className="space-y-12 max-w-4xl mx-auto">
              <div className="relative w-full h-64 rounded-sm overflow-hidden border">
                  <Image src="/images/about_us.jpg" alt="About HK Speed Couriers" fill className="object-cover" />
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg text-center">
                Welcome to HK SPEED COURIERS, where we redefine logistics with a commitment to speed, reliability, and unparalleled customer service. Founded on the principle of bridging distances, we provide seamless and efficient delivery solutions tailored to meet the diverse needs of individuals and businesses.
              </p>

              <div className="bg-muted p-8 rounded-lg border">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit ring-8 ring-primary/5">
                            <Goal className="h-10 w-10" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-headline font-bold">Our Mission</h2>
                        <p className="text-muted-foreground mt-2">
                            Our mission is to deliver more than just packages; we deliver peace of mind. By integrating state-of-the-art technology with a dedicated network of logistics professionals, we ensure that every shipment is tracked, secure, and delivered on time. We are devoted to a customer-centric approach, making your satisfaction our top priority.
                        </p>
                    </div>
                </div>
              </div>


              <div>
                  <h2 className="text-2xl font-headline font-bold text-center mb-8">Our Core Values</h2>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                      <div className="flex flex-col items-center">
                           <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                              <ShieldCheck className="w-8 h-8" />
                           </div>
                          <h3 className="font-semibold text-xl">Integrity</h3>
                          <p className="text-muted-foreground mt-2">We handle every parcel with the utmost care, recognizing its value. Our processes are transparent, ensuring you're informed every step of the way.</p>
                      </div>
                      <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                              <Lightbulb className="w-8 h-8" />
                          </div>
                          <h3 className="font-semibold text-xl">Innovation</h3>
                          <p className="text-muted-foreground mt-2">We continuously adapt and enhance our services by leveraging modern technology to meet the dynamic needs of the market and our clients.</p>
                      </div>
                       <div className="flex flex-col items-center">
                           <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                              <ThumbsUp className="w-8 h-8" />
                           </div>
                          <h3 className="font-semibold text-xl">Reliability</h3>
                          <p className="text-muted-foreground mt-2">Our commitment is to consistently exceed customer expectations through dependable and timely delivery, making us a logistics partner you can trust.</p>
                      </div>
                  </div>
              </div>

               <p className="text-muted-foreground leading-relaxed text-center pt-4">
                Thank you for placing your trust in HK SPEED COURIERS. We are honored to be your logistics partner and look forward to serving you.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
