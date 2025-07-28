import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Globe, PackageCheck, ShieldCheck, Truck, Ship, Plane } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Domestic Express",
    description: "Swift, time-definite delivery for your documents and small parcels across the country. Ideal for urgent shipments.",
    icon: Truck
  },
  {
    title: "International Shipping",
    description: "Seamless and reliable international courier services to connect your business to the world with full tracking.",
    icon: Globe
  },
  {
    title: "E-commerce Logistics",
    description: "Comprehensive logistics solutions for online businesses, including warehousing, order fulfillment, and last-mile delivery.",
    icon: PackageCheck
  },
  {
    title: "Corporate Solutions",
    description: "Customized courier and logistics services tailored to meet the specific needs of corporate clients.",
    icon: Briefcase
  },
  {
    title: "Secure & Insured",
    description: "High-security transport for valuable items with full insurance coverage for your peace of mind.",
    icon: ShieldCheck
  },
  {
    title: "Freight Services",
    description: "Specialized freight services for heavy or oversized shipments by air, sea, or land.",
    icon: Ship,
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-background p-8 border shadow-sm">
            <div className="text-center pb-8">
              <h1 className="text-3xl font-headline font-bold">Our Services</h1>
              <p className="text-lg text-muted-foreground mt-2">Comprehensive logistics solutions tailored for you.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="flex gap-6 items-start p-6 border rounded-sm">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-primary/10 text-primary">
                        <service.icon className="w-8 h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-headline font-semibold">{service.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
        <div className="max-w-4xl mx-auto bg-background p-8 border shadow-sm mt-8">
          <div className="relative h-80 w-full">
            <Image src="/images/shipment_car.jpg" alt="Shipment car" layout="fill" objectFit="cover" className="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
