import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Headset } from "lucide-react";

const faqs = [
    { question: "How do I track my package?", answer: "You can track your package using the tracking ID on our homepage. Real-time updates will be provided as your package moves through our network." },
    { question: "What are your delivery hours?", answer: "Our standard delivery hours are from 9:00 AM to 6:00 PM, Monday to Saturday. Special arrangements can be made for deliveries outside these hours." },
    { question: "Can I change the delivery address?", answer: "Address changes may be possible depending on the shipment's status. Please contact our customer care team immediately with your tracking ID and new address details." },
    { question: "What if my package is lost or damaged?", answer: "In the rare event of a lost or damaged package, please file a claim through our customer care portal or contact us directly. We will investigate the issue promptly." }
]

export default function CustomerCarePage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
              <Headset className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-headline">Customer Care</CardTitle>
            <CardDescription>We're here to help. Find answers to common questions below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <p className="text-muted-foreground text-center">
              Our customer care team is available to assist you with any inquiries or issues. You can reach us via <a href="/contact-us" className="text-primary hover:underline">phone or email</a> during our business hours. We are dedicated to providing you with the best possible support.
            </p>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
