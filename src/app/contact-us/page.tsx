import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
            <CardDescription>We'd love to hear from you. Here's how you can reach us.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-8 text-center mt-6">
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg hover:bg-background transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg pt-2">Our Address</h3>
              <p className="text-muted-foreground">
                18AX MODEL TOWN EXTENSION
                <br />
                LUDHIANA, NEAR PUNJAB & SIND BANK
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg hover:bg-background transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg pt-2">Call Us</h3>
              <p className="text-muted-foreground">
                <a href="tel:+919541195406" className="hover:text-primary transition-colors">+919541195406</a>
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 rounded-lg hover:bg-background transition-colors">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg pt-2">Email Us</h3>
              <p className="text-muted-foreground">
                <a href="mailto:RSSWIFTCOURIERS@GMAIL.COM" className="hover:text-primary transition-colors break-all">
                  RSSWIFTCOURIERS@GMAIL.COM
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
