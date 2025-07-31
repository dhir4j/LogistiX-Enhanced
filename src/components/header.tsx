"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, Menu, Mail, Phone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact-us', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container flex h-10 items-center justify-between text-xs">
          <div className="flex gap-4">
             <a href="mailto:HKCOURIERS@GMAIL.COM" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5" />
                HKCOURIERS@GMAIL.COM
             </a>
             <a href="tel:+919541195406" className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors">
                <Phone className="h-3.5 w-3.5" />
                +91-95411-95406
             </a>
          </div>
           <div className="hidden md:flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="text-xs h-8">
                <Link href="/login">Customer Login</Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="text-xs h-8">
                <Link href="/admin/login">Employee Login</Link>
              </Button>
            </div>
        </div>
      </div>

      <div className="container flex h-20 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/images/logo.jpg" alt="HK SPEED COURIERS Logo" width={50} height={50} className="h-12 w-auto" />
            <span className="font-bold font-headline text-2xl sm:inline-block">
              HK SPEED COURIERS
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2 mr-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              className={cn(
                "font-semibold text-base tracking-wide",
                pathname === link.href ? "text-primary hover:text-primary" : "text-foreground/80",
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
            <Button asChild size="lg">
                <Link href="/track">
                  <Search className="mr-2 h-5 w-5"/>
                  Track Order
                </Link>
            </Button>
        </div>


        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle>
                        <SheetClose asChild>
                            <Link href="/" className="flex items-center space-x-2">
                                <Image src="/images/logo.jpg" alt="HK SPEED COURIERS Logo" width={40} height={40} />
                                <span className="font-bold text-lg font-headline">HK SPEED COURIERS</span>
                            </Link>
                        </SheetClose>
                    </SheetTitle>
                    <SheetDescription>
                        Main menu for navigating the HK SPEED COURIERS website.
                    </SheetDescription>
                </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col space-y-1 p-4">
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Button
                        asChild
                        variant={pathname === link.href ? "secondary" : "ghost"}
                        className="justify-start text-base font-semibold"
                      >
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    </SheetClose>
                  ))}
                   <SheetClose asChild>
                      <Button asChild variant="ghost" className="justify-start text-base font-semibold"><Link href="/track">Track Order</Link></Button>
                   </SheetClose>
                </div>
                <div className="border-t p-4 mt-auto">
                    <div className="flex flex-col space-y-2">
                         <SheetClose asChild>
                            <Button asChild variant="default" className="w-full"><Link href="/login">Login</Link></Button>
                         </SheetClose>
                         <SheetClose asChild>
                            <Button asChild variant="outline" className="w-full"><Link href="/signup">Sign Up</Link></Button>
                         </SheetClose>
                    </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
