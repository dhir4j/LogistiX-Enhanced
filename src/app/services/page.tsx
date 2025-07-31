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

const deliveryItems = [
    { title: "Medical Equipment", image: "/images/services/Medical-Equipment.jpg", hint: "medical equipment" },
    { title: "Medical STAT", image: "/images/services/Medical-STAT-1024x683.jpg", hint: "medical documents" },
    { title: "Pharmaceuticals", image: "/images/services/Pharmaceuticals.jpg", hint: "pharmaceuticals production" },
    { title: "Legal Documents", image: "https://placehold.co/400x400.png", hint: "legal documents" },
    { title: "Machine & Auto Parts", image: "/images/services/Machine-auto-parts.jpg", hint: "auto parts" },
    { title: "Payroll", image: "/images/services/Payroll.jpg", hint: "payroll check" },
    { title: "Office Supplies", image: "/images/services/Office-Supplies.jpg", hint: "office supplies" },
    { title: "Postal Mail & Packages", image: "/images/services/Postal-Mail.jpg", hint: "postal mail" },
    { title: "Business to Business Delivery", image: "/images/services/b2b-Delivery.jpg", hint: "business delivery" },
    { title: "Business to Consumer Delivery", image: "/images/services/Consumer-Delivery.jpg", hint: "consumer delivery" },
]

export default function ServicesPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="bg-background p-8 border shadow-sm">
            <div className="text-center pb-8">
              <h1 className="text-3xl font-headline font-bold">Our Services</h1>
              <p className="text-lg text-muted-foreground mt-2">Comprehensive logistics solutions tailored for you.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
        
        <div className="bg-background p-8 border shadow-sm mt-16">
            <div className="text-center pb-8">
              <h2 className="text-3xl font-headline font-bold">WHAT CAN WE DELIVER FOR YOU?</h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Quick Courier's Account Managers will answer any questions regarding services offered to the industries noted below, as well as other businesses.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {deliveryItems.map((item) => (
                <div key={item.title} className="relative aspect-square rounded-sm overflow-hidden group">
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={item.hint} />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <h3 className="text-white text-lg font-bold text-center p-2 font-headline">{item.title}</h3>
                    </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
