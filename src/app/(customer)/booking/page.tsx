"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import * as z from "zod";

const domesticShipmentSchema = z.object({
  // Sender
  sender_name: z.string().min(3, "Sender name is required"),
  sender_address_line1: z.string().min(5, "Address Line 1 is required"),
  sender_address_line2: z.string().optional(),
  sender_address_city: z.string().min(2, "City is required"),
  sender_address_state: z.string().min(2, "State is required"),
  sender_address_pincode: z.string().min(6, "A valid 6-digit pincode is required").max(6),
  sender_phone: z.string().min(10, "A valid 10-digit phone number is required").max(10),

  // Receiver
  receiver_name: z.string().min(3, "Receiver name is required"),
  receiver_address_line1: z.string().min(5, "Address Line 1 is required"),
  receiver_address_line2: z.string().optional(),
  receiver_address_city: z.string().min(2, "City is required"),
  receiver_address_state: z.string().min(2, "State is required"),
  receiver_address_pincode: z.string().min(6, "A valid 6-digit pincode is required").max(6),
  receiver_phone: z.string().min(10, "A valid 10-digit phone number is required").max(10),
  
  // Package
  package_weight_kg: z.coerce.number().min(0.1, "Weight must be at least 0.1 kg"),
  pickup_date: z.date({ required_error: "Pickup date is required" }),
  service_type: z.string({ required_error: "Service type is required" }),
});

type DomesticShipmentFormValues = z.infer<typeof domesticShipmentSchema>;


export default function CustomerBookingPage() {
    const { toast } = useToast();
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();
    const [priceDetails, setPriceDetails] = useState<{ total_price: number } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    
    const form = useForm<DomesticShipmentFormValues>({
        resolver: zodResolver(domesticShipmentSchema),
        defaultValues: {
            sender_name: "", sender_address_line1: "", sender_address_line2: "", sender_address_city: "",
            sender_address_state: "", sender_address_pincode: "", sender_phone: "",
            receiver_name: "", receiver_address_line1: "", receiver_address_line2: "", receiver_address_city: "",
            receiver_address_state: "", receiver_address_pincode: "", receiver_phone: "",
            package_weight_kg: 0.5, pickup_date: new Date(), service_type: "Standard",
        },
    });

    useEffect(() => {
        if (!isSessionLoading && !session) {
            router.push('/login');
        }
    }, [session, isSessionLoading, router]);

    const handleCalculatePrice = async () => {
        const values = form.getValues();
        const { receiver_address_state, package_weight_kg, service_type } = values;

        if (!receiver_address_state || !package_weight_kg || !service_type) {
             toast({ title: "Missing Information", description: "Please fill in receiver state, weight, and service type to calculate price.", variant: "destructive" });
            return;
        }
        
        setIsCalculating(true);
        setPriceDetails(null);

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/domestic/price`;
        const body = { state: receiver_address_state, weight: package_weight_kg, mode: service_type };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (response.ok) {
                setPriceDetails(data);
                toast({ title: "Price Calculated", description: `Total price is ₹${data.total_price.toFixed(2)}.` });
            } else {
                toast({ title: "Pricing Error", description: data.error || "Could not calculate price.", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Network Error", description: "Failed to connect to pricing service.", variant: "destructive" });
        } finally {
            setIsCalculating(false);
        }
    };
    
    const onSubmit = (values: DomesticShipmentFormValues) => {
        // This is where the booking submission logic would go
        console.log("Form Submitted", values);
        toast({ title: "Proceeding to Next Step", description: "Please confirm details to book your shipment." });
    };

    if (isSessionLoading || !session) {
        return (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Create a New Domestic Shipment</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sender Details</CardTitle>
                            <CardDescription>Enter the address where the shipment will be picked up from.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="sender_name" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField name="sender_address_line1" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField name="sender_address_line2" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address Line 2 (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <div className="grid md:grid-cols-3 gap-4">
                                <FormField name="sender_address_city" control={form.control} render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="sender_address_state" control={form.control} render={({ field }) => ( <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="sender_address_pincode" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                            <FormField name="sender_phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Receiver Details</CardTitle>
                            <CardDescription>Enter the destination address for the shipment.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="receiver_name" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField name="receiver_address_line1" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField name="receiver_address_line2" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address Line 2 (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <div className="grid md:grid-cols-3 gap-4">
                                <FormField name="receiver_address_city" control={form.control} render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="receiver_address_state" control={form.control} render={({ field }) => ( <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="receiver_address_pincode" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                            <FormField name="receiver_phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Package & Service</CardTitle>
                            <CardDescription>Provide details about the package and choose a service.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="grid md:grid-cols-3 gap-4">
                                <FormField name="package_weight_kg" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="pickup_date" control={form.control} render={({ field }) => (
                                    <FormItem className="flex flex-col"><FormLabel>Pickup Date</FormLabel>
                                        <Popover><PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
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
                                <FormField name="service_type" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Service Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Standard">Standard</SelectItem>
                                                <SelectItem value="Express">Express</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage /></FormItem>
                                )} />
                            </div>
                            <Separator />
                            <div className="flex flex-col items-center gap-4">
                                <Button type="button" size="lg" onClick={handleCalculatePrice} disabled={isCalculating}>
                                    {isCalculating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Calculate Price
                                </Button>
                                {priceDetails && (
                                    <div className="text-center">
                                        <p className="text-muted-foreground">Estimated Price:</p>
                                        <p className="text-2xl font-bold">₹{priceDetails.total_price.toFixed(2)}</p>
                                         <Button type="submit" size="lg" className="mt-4">
                                            Proceed to Book
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}

    