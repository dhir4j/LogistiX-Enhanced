"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plane, Menu, UserCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              RS SWIFT COURIERS
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 mr-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              variant="ghost"
              className={cn(
                pathname === link.href ? "bg-secondary text-secondary-foreground" : "",
                "font-semibold"
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">User Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/signup">Sign Up</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>


        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
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
