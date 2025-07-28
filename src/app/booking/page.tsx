"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackagePlus, PlaneTakeoff, Ship } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const domesticBookingSchema = z.object({
    fromPincode: z.string().length(6, "Must be 6 digits"),
    toPincode: z.string().length(6, "Must be 6 digits"),
    weight: z.coerce.number().min(0.1, "Weight must be positive"),
    length: z.coerce.number().min(1, "Must be at least 1cm"),
    width: z.coerce.number().min(1, "Must be at least 1cm"),
    height: z.coerce.number().min(1, "Must be at least 1cm"),
});

const internationalBookingSchema = domesticBookingSchema.extend({
    country: z.string().min(2, "Country is required"),
});

type DomesticBookingFormValues = z.infer<typeof domesticBookingSchema>;
type InternationalBookingFormValues = z.infer<typeof internationalBookingSchema>;
type BookingFormValues = DomesticBookingFormValues | InternationalBookingFormValues;


export default function BookingPage() {
  return (
    <div className="bg-secondary py-16">
        <div className="container">
            <Card className="max-w-4xl mx-auto shadow-md border">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary rounded-sm p-3 w-fit mb-4">
                        <PackagePlus className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Book a Shipment</CardTitle>
                    <CardDescription>Select shipment type and fill in the details to get a price quote.</CardDescription>
                </CardHeader>
                <CardContent>
                <Tabs defaultValue="domestic" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-12">
                        <TabsTrigger value="domestic" className="h-full text-base gap-2 font-semibold"><Ship className="h-5 w-5"/>Domestic</TabsTrigger>
                        <TabsTrigger value="international" className="h-full text-base gap-2 font-semibold"><PlaneTakeoff className="h-5 w-5"/>International</TabsTrigger>
                    </TabsList>
                    <TabsContent value="domestic" className="border rounded-b-md p-6">
                        <BookingForm type="Domestic" />
                    </TabsContent>
                    <TabsContent value="international" className="border rounded-b-md p-6">
                        <BookingForm type="International" />
                    </TabsContent>
                </Tabs>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

function BookingForm({ type }: { type: 'Domestic' | 'International' }) {
    const { toast } = useToast();
    const isInternational = type === 'International';
    
    const form = useForm<BookingFormValues>({
        resolver: zodResolver(isInternational ? internationalBookingSchema : domesticBookingSchema),
        defaultValues: {
            fromPincode: "",
            toPincode: "",
            weight: 0.5,
            length: 10,
            width: 10,
            height: 10,
            ...(isInternational && { country: "" }),
        }
    });

    function onSubmit(values: any) {
        console.log(values);
        toast({
            title: "Quote Requested",
            description: "Calculating the best price for you...",
        })
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-2">
        <div className="grid md:grid-cols-2 gap-6">
            <FormField control={form.control} name="fromPincode" render={({ field }) => (
                <FormItem>
                    <FormLabel>Origin Pincode</FormLabel>
                    <FormControl><Input placeholder="e.g., 110001" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="toPincode" render={({ field }) => (
                <FormItem>
                    <FormLabel>Destination Pincode</FormLabel>
                    <FormControl><Input placeholder="e.g., 400001" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>
        
        {isInternational && (
            <FormField control={form.control} name="country" render={({ field }) => (
                <FormItem>
                    <FormLabel>Destination Country</FormLabel>
                    <FormControl><Input placeholder="e.g., United States" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        )}
        
        <div className="grid md:grid-cols-2 gap-6 items-end">
            <FormField control={form.control} name="weight" render={({ field }) => (
                <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl><Input type="number" step="0.1" {...field} className="h-11" /></FormControl>
                    <FormMessage />
                </FormItem>
            )} />
            <div className="space-y-2">
                <FormLabel>Dimensions (L x W x H in cm)</FormLabel>
                <div className="grid grid-cols-3 gap-2">
                    <FormField control={form.control} name="length" render={({ field }) => (
                        <FormItem><FormControl><Input type="number" placeholder="L" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="width" render={({ field }) => (
                        <FormItem><FormControl><Input type="number" placeholder="W" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="height" render={({ field }) => (
                        <FormItem><FormControl><Input type="number" placeholder="H" {...field} className="h-11" /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            </div>
        </div>
        <Button type="submit" size="lg" className="w-full text-lg py-6">
            Get Quote & Book
        </Button>
        </form>
    </Form>
  )
}
