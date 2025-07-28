"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, Menu, UserCircle, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/booking', label: 'Booking' },
    { href: '/about-us', label: 'About' },
    { href: '/contact-us', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container flex h-10 items-center justify-between text-xs">
          <div className="flex gap-4">
             <a href="mailto:RSSWIFTCOURIERS@GMAIL.COM" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5" />
                RSSWIFTCOURIERS@GMAIL.COM
             </a>
             <a href="tel:+919541195406" className="hidden sm:flex items-center gap-1.5 hover:text-primary transition-colors">
                <Phone className="h-3.5 w-3.5" />
                +91-95411-95406
             </a>
          </div>
           <div className="hidden md:flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="text-xs h-8">
                <Link href="/login">Client Login</Link>
              </Button>
              <Button asChild size="sm" variant="ghost" className="text-xs h-8">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            </div>
        </div>
      </div>

      <div className="container flex h-20 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Plane className="h-8 w-8 text-primary" />
            <span className="font-bold font-headline text-2xl sm:inline-block">
              RS SWIFT COURIERS
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
                <Link href="/booking">Get a Quote</Link>
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
              <div className="flex flex-col h-full">
                <div className="p-6 border-b">
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center space-x-2">
                            <Plane className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg font-headline">RS SWIFT COURIERS</span>
                        </Link>
                    </SheetClose>
                </div>
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
                </div>
                <div className="border-t p-4">
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
