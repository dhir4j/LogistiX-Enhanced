import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-background p-8 border shadow-sm">
            <div className="text-center pb-8">
              <h1 className="text-3xl font-headline font-bold">Contact Information</h1>
              <p className="text-lg text-muted-foreground mt-2">We welcome your inquiries. Please use the information below to contact us.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center mt-6">
              <div className="flex flex-col items-center space-y-3 p-6 rounded-sm border bg-background">
                <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-primary/10 text-primary">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg pt-2 uppercase tracking-wider">Address</h3>
                <p className="text-muted-foreground">
                  18AX MODEL TOWN EXTENSION
                  <br />
                  LUDHIANA, NEAR PUNJAB & SIND BANK
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 rounded-sm border bg-background">
                <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-primary/10 text-primary">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg pt-2 uppercase tracking-wider">Phone</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+919541195406" className="hover:text-primary transition-colors">+91-95411-95406</a>
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 rounded-sm border bg-background">
                <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-primary/10 text-primary">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-lg pt-2 uppercase tracking-wider">Email</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:RSSWIFTCOURIERS@GMAIL.COM" className="hover:text-primary transition-colors break-all">
                    RSSWIFTCOURIERS@GMAIL.COM
                  </a>
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
