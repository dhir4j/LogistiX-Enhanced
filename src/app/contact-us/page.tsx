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
    <div className="bg-secondary py-16 sm:py-24">
      <div className="container">
        <div className="max-w-6xl mx-auto bg-background p-8 border shadow-sm">
            <div className="text-center pb-12">
              <h1 className="text-3xl font-headline font-bold">Get in Touch</h1>
              <p className="text-lg text-muted-foreground mt-2">We're here to help with any questions you may have.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-bold">Send us a Message</h2>
                 <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
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
                      <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="Please type your message here..." {...field} rows={5} /></FormControl><FormMessage /></FormItem>
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
                <h2 className="text-2xl font-headline font-bold">Contact Information</h2>
                <p className="text-muted-foreground">You can also reach us through the following channels. We're available during standard business hours.</p>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Address</h3>
                          <p className="text-muted-foreground">18AX MODEL TOWN EXTENSION, LUDHIANA<br/>NEAR PUNJAB & SIND BANK</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
                          <Phone className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Phone</h3>
                          <p className="text-muted-foreground"><a href="tel:+919541195406" className="hover:text-primary transition-colors">+91-95411-95406</a></p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-sm bg-primary/10 text-primary shrink-0">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Email</h3>
                          <p className="text-muted-foreground"><a href="mailto:RSSWIFTCOURIERS@GMAIL.COM" className="hover:text-primary transition-colors break-all">RSSWIFTCOURIERS@GMAIL.COM</a></p>
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