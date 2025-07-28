import { Plane } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const infoLinks = [
    { href: '/about-us', label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/customer-care', label: 'Customer Care' },
    { href: '/services', label: 'Services' },
  ];

  const legalLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
    { href: '/shipping-delivery', label: 'Shipping & Delivery' },
    { href: '/refund-cancellation', label: 'Refund & Cancellation' },
  ];

  return (
    <footer className="bg-secondary text-foreground border-t">
      <div className="container py-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Plane className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline">
                RS SWIFT COURIERS
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for reliable and efficient logistics solutions.
            </p>
          </div>
          
          {/* Information Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-headline text-base font-semibold uppercase tracking-wider">Information</h3>
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
          <div className="flex flex-col space-y-4">
            <h3 className="font-headline text-base font-semibold uppercase tracking-wider">Legal</h3>
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
          <div className="flex flex-col space-y-4">
            <h3 className="font-headline text-base font-semibold uppercase tracking-wider">Head Office</h3>
            <p className="text-sm text-muted-foreground">
                18AX MODEL TOWN EXTENSION<br />
                LUDHIANA, NEAR PUNJAB & SIND BANK
            </p>
            <p className="text-sm text-muted-foreground">
              <a href="tel:+919541195406" className="hover:text-primary transition-colors">+91-95411-95406</a>
            </p>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:RSSWIFTCOURIERS@GMAIL.COM" className="hover:text-primary transition-colors break-all">
                RSSWIFTCOURIERS@GMAIL.COM
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RS SWIFT COURIERS. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
