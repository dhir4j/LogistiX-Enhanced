"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { contactSchema } from "@/lib/schemas";

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactUsPage() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We will get back to you shortly.",
    });
    form.reset();
  };

  return (
    <div className="bg-secondary py-12 sm:py-16">
      <div className="container">
        <div className="bg-background p-8 border shadow-sm">
            <div className="text-center pb-8">
              <h1 className="text-2xl font-headline font-bold">Get in Touch</h1>
              <p className="text-md text-muted-foreground mt-2">We're here to help with any questions you may have.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-headline font-bold">Send us a Message</h2>
                 <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="your.email@example.com" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem><FormLabel>Subject</FormLabel><FormControl><Input placeholder="Inquiry about shipping" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Please type your message here..." {...field} rows={4} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" size="lg" className="w-full text-lg py-6">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Information Section */}
              <div className="space-y-6">
                <h2 className="text-xl font-headline font-bold">Contact Information</h2>
                <p className="text-muted-foreground">You can also reach us through the following channels. We're available during standard business hours.</p>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Address</h3>
                          <p className="text-muted-foreground">SCF-148, FIRST FLOOR, URBAN ESTATE, PHASE-1,<br/>JALANDHAR, PUNJAB.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Phone</h3>
                          <p className="text-muted-foreground"><a href="tel:8968927612" className="hover:text-primary transition-colors">+91-89689-27612</a></p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Email</h3>
                          <p className="text-muted-foreground"><a href="mailto:Hkspeedcouriersprivatelimited@gmail.com" className="hover:text-primary transition-colors break-all">Hkspeedcouriersprivatelimited@gmail.com</a></p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
