import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const infoLinks = [
    { href: '/about-us', label: 'About Us' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/shipping-delivery', label: 'Shipping & Delivery' },
    { href: '/refund-cancellation', label: 'Refund & Cancellation' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/customer-care', label: 'Customer Care' },
  ];

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-2">
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
          <div className="flex flex-col items-center md:items-start space-y-2">
            <h3 className="font-headline text-lg font-semibold mb-2 flex items-center">
              <Phone className="mr-2 h-5 w-5 text-primary" />
              Contact Number
            </h3>
            <p className="text-sm text-muted-foreground">
              <a href="tel:+919541195406" className="hover:text-primary transition-colors">+919541195406</a>
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-2">
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
          <div className="flex flex-col items-center md:items-start space-y-2">
             <h3 className="font-headline text-lg font-semibold mb-2">Quick Links</h3>
             <ul className="space-y-2 text-left">
                {infoLinks.map(link => (
                    <li key={link.href}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center md:justify-start">
                            <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}
             </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RS SWIFT COURIERS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
