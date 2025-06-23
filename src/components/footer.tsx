import { MapPin, Phone, Mail, Plane } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const infoLinks = [
    { href: '/about-us', label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/customer-care', label: 'Customer Care' },
    { href: '/booking', label: 'Book a Shipment' },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/shipping-delivery', label: 'Shipping & Delivery' },
    { href: '/refund-cancellation', label: 'Refund & Cancellation' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand and Address */}
          <div className="flex flex-col space-y-4 items-center text-center lg:items-start lg:text-left">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline text-foreground">
                RS SWIFT COURIERS
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for reliable and fast courier services.
            </p>
            <div className="flex flex-col space-y-2 pt-2">
                <h3 className="font-headline text-lg font-semibold flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Our Office
                </h3>
                <p className="text-sm text-muted-foreground">
                    18AX MODEL TOWN EXTENSION<br />
                    LUDHIANA, NEAR PUNJAB & SIND BANK
                </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-4 items-center text-center lg:items-start lg:text-left">
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {infoLinks.map(link => (
                  <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.label}
                      </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col space-y-4 items-center text-center lg:items-start lg:text-left">
            <h3 className="font-headline text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(link => (
                  <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.label}
                      </Link>
                  </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col space-y-4 items-center text-center lg:items-start lg:text-left">
            <h3 className="font-headline text-lg font-semibold">Get in Touch</h3>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+919541195406" className="text-sm text-muted-foreground hover:text-primary transition-colors">+919541195406</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:RSSWIFTCOURIERS@GMAIL.COM" className="text-sm text-muted-foreground hover:text-primary transition-colors break-all">
                RSSWIFTCOURIERS@GMAIL.COM
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RS SWIFT COURIERS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
