"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Track' },
    { href: '/booking', label: 'Booking' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              RS SWIFT COURIERS
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant={pathname === link.href ? "secondary" : "ghost"}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-2 pt-6">
                <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setMenuOpen(false)}>
                    <Plane className="h-7 w-7 text-primary" />
                    <span className="font-bold text-lg font-headline">RS SWIFT COURIERS</span>
                </Link>
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className="justify-start text-base"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
