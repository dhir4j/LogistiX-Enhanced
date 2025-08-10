
"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shipmentBookingSchema } from "@/lib/schemas";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";

type ShipmentBookingFormValues = z.infer<typeof shipmentBookingSchema>;

interface PriceResponse {
    total_price: number;
    [key: string]: any;
}

export default function EmployeeBookingPage() {
    const { toast } = useToast();
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();
    const [priceDetails, setPriceDetails] = useState<PriceResponse | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        if (!isSessionLoading && !session) {
            router.push('/employee-login');
        }
    }, [session, isSessionLoading, router]);

    const form = useForm<ShipmentBookingFormValues>({
        resolver: zodResolver(shipmentBookingSchema),
        defaultValues: {
            sender_name: "",
            sender_address_street: "",
            sender_address_city: "",
            sender_address_state: "",
            sender_address_pincode: "",
            sender_address_country: "India",
            sender_phone: "",
            receiver_name: "",
            receiver_address_street: "",
            receiver_address_city: "",
            receiver_address_state: "",
            receiver_address_pincode: "",
            receiver_address_country: "India",
            receiver_phone: "",
            package_weight_kg: 0.5,
            package_width_cm: 10,
            package_height_cm: 10,
            package_length_cm: 10,
            pickup_date: new Date(),
            service_type: "Standard",
        },
    });

    const handleGetPrice = async () => {
        setIsCalculating(true);
        setPriceDetails(null);
        const { receiver_address_state, receiver_address_country, package_weight_kg, service_type } = form.getValues();

        const isDomestic = receiver_address_country.toLowerCase() === "india";
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api${isDomestic ? "/domestic/price" : "/international/price"}`;
        const body = isDomestic 
            ? { state: receiver_address_state, weight: package_weight_kg, mode: service_type }
            : { country: receiver_address_country, weight: package_weight_kg };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if(response.ok) {
                setPriceDetails(data);
            } else {
                toast({ title: "Error", description: data.error || "Could not calculate price.", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Error", description: "Failed to connect to pricing service.", variant: "destructive" });
        } finally {
            setIsCalculating(false);
        }
    };

    const onSubmit = async (values: ShipmentBookingFormValues) => {
        if (!priceDetails) {
            toast({ title: "Error", description: "Please calculate the price before booking.", variant: "destructive" });
            return;
        }
        if (!session) {
            toast({ title: "Error", description: "You must be logged in to book.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        const payload = {
            ...values,
            user_email: session.email,
            final_total_price_with_tax: priceDetails.total_price
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if(response.ok) {
                toast({ title: "Booking Successful", description: `Shipment ${result.shipment_id_str} has been created.` });
                form.reset();
                setPriceDetails(null);
            } else {
                toast({ title: "Booking Failed", description: result.error || "An unexpected error occurred.", variant: "destructive" });
            }
        } catch (error) {
             toast({ title: "Error", description: "Failed to connect to booking service.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDomestic = useWatch({ control: form.control, name: "receiver_address_country" })?.toLowerCase() === 'india';
    
    if (isSessionLoading || !session) {
        return (
          <div className="flex justify-center items-center h-screen w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        );
    }


    return (
        <div className="flex-1 p-4 sm:p-6 bg-gray-100">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Sender Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField name="sender_name" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField name="sender_address_street" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <FormField name="sender_address_city" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField name="sender_address_state" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField name="sender_address_pincode" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                <FormField name="sender_phone" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Receiver Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField name="receiver_name" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField name="receiver_address_street" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <FormField name="receiver_address_city" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                     <FormField name="receiver_address_state" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>State/Province</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField name="receiver_address_pincode" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Pincode/ZIP</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <FormField name="receiver_address_country" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField name="receiver_phone" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Package & Service</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="grid md:grid-cols-4 gap-4">
                                     <FormField name="package_weight_kg" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField name="package_length_cm" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Length (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField name="package_width_cm" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Width (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField name="package_height_cm" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                 </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <FormField name="pickup_date" control={form.control} render={({ field }) => (
                                        <FormItem className="flex flex-col"><FormLabel>Pickup Date</FormLabel>
                                            <Popover><PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))} />
                                            </PopoverContent>
                                            </Popover>
                                        <FormMessage /></FormItem>
                                    )}/>
                                    {isDomestic && <FormField name="service_type" control={form.control} render={({ field }) => (
                                        <FormItem><FormLabel>Service Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Standard">Standard</SelectItem>
                                                    <SelectItem value="Express">Express</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        <FormMessage /></FormItem>
                                    )} />}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pricing and Action Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                             <CardHeader><CardTitle>Price Details</CardTitle></CardHeader>
                             <CardContent className="space-y-4">
                                <Button type="button" className="w-full" onClick={handleGetPrice} disabled={isCalculating}>
                                    {isCalculating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isCalculating ? "Calculating..." : "Calculate Price"}
                                </Button>
                                {priceDetails && (
                                    <div className="space-y-2 text-sm">
                                        <Separator />
                                        <div className="flex justify-between"><span>Service:</span> <span className="font-medium">{isDomestic ? priceDetails.mode : "International Express"}</span></div>
                                        <div className="flex justify-between"><span>Weight:</span> <span className="font-medium">{priceDetails.rounded_weight} kg</span></div>
                                        <Separator />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total Price:</span>
                                            <span>₹{priceDetails.total_price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                )}
                             </CardContent>
                        </Card>
                        <Button type="submit" size="lg" className="w-full h-14 text-xl" disabled={!priceDetails || isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Booking..." : "Book Shipment"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
        </div>
    );
}
