import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg font-semibold mb-2 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Address
            </h3>
            <p className="text-sm text-muted-foreground">
              18AX MODEL TOWN EXTENSION
              <br />
              LUDHIANA, NEAR PUNJAB & SIND BANK
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg font-semibold mb-2 flex items-center">
              <Phone className="mr-2 h-5 w-5 text-primary" />
              Contact Number
            </h3>
            <p className="text-sm text-muted-foreground">
              <a href="tel:+919541195406" className="hover:text-primary transition-colors">+919541195406</a>
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-headline text-lg font-semibold mb-2 flex items-center">
              <Mail className="mr-2 h-5 w-5 text-primary" />
              Email ID
            </h3>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:RSSWIFTCOURIERS@GMAIL.COM" className="hover:text-primary transition-colors">
                RSSWIFTCOURIERS@GMAIL.COM
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RS SWIFT COURIERS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
