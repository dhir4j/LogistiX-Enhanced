
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
import { CalendarIcon, Loader2, Globe, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const bookingSchema = z.object({
  shipmentType: z.enum(['domestic', 'international']),
  // Sender
  sender_name: z.string().min(3, "Sender name is required"),
  sender_address_street: z.string().min(5, "Address is required"),
  sender_address_city: z.string().min(2, "City is required"),
  sender_address_state: z.string().min(2, "State is required"),
  sender_address_pincode: z.string().min(5, "A valid pincode is required"),
  sender_phone: z.string().min(10, "A valid phone number is required"),
  sender_address_country: z.string().default("India"),

  // Receiver
  receiver_name: z.string().min(3, "Receiver name is required"),
  receiver_address_street: z.string().min(5, "Address is required"),
  receiver_address_city: z.string().min(2, "City is required"),
  receiver_address_state: z.string().min(2, "State/Province is required"),
  receiver_address_pincode: z.string().min(5, "Pincode/ZIP is required"),
  receiver_phone: z.string().min(10, "A valid phone number is required"),
  receiver_address_country: z.string().min(2, "Country is required"),
  
  // Package
  package_weight_kg: z.coerce.number().min(0.1, "Weight must be at least 0.1 kg"),
  pickup_date: z.date({ required_error: "Pickup date is required" }),
  service_type: z.string().optional(),
});

type ShipmentFormValues = z.infer<typeof bookingSchema>;


export default function CustomerBookingPage() {
    const { toast } = useToast();
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();
    const [priceDetails, setPriceDetails] = useState<{ total_price: number } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm<ShipmentFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            shipmentType: "domestic",
            sender_name: "", sender_address_street: "", sender_address_city: "",
            sender_address_state: "", sender_address_pincode: "", sender_phone: "",
            receiver_name: "", receiver_address_street: "", receiver_address_city: "",
            receiver_address_state: "", receiver_address_pincode: "", receiver_phone: "", receiver_address_country: "India",
            package_weight_kg: 0.5, pickup_date: new Date(), service_type: "Standard",
        },
    });

    const shipmentType = useWatch({ control: form.control, name: "shipmentType" });
    const watchedPriceFields = useWatch({ control: form.control, name: ["receiver_address_country", "receiver_address_state", "package_weight_kg", "service_type", "shipmentType"] });

    useEffect(() => {
        if (!isSessionLoading && !session) {
            router.push('/login');
        }
    }, [session, isSessionLoading, router]);
    
     useEffect(() => {
        // Reset receiver country when switching between domestic/international
        if (shipmentType === 'domestic') {
            form.setValue('receiver_address_country', 'India');
        } else {
             form.setValue('receiver_address_country', '');
        }
        setPriceDetails(null);
    }, [shipmentType, form.setValue]);


    const handleCalculatePrice = async () => {
        const values = form.getValues();
        const { receiver_address_state, receiver_address_country, package_weight_kg, service_type, shipmentType } = values;

        let isReady = false;
        let url = '';
        let body = {};
        
        if (shipmentType === 'domestic' && receiver_address_state && package_weight_kg > 0 && service_type) {
            isReady = true;
            url = `${process.env.NEXT_PUBLIC_API_URL}/api/domestic/price`;
            body = { state: receiver_address_state, weight: package_weight_kg, mode: service_type };
        } else if (shipmentType === 'international' && receiver_address_country && package_weight_kg > 0) {
            isReady = true;
            url = `${process.env.NEXT_PUBLIC_API_URL}/api/international/price`;
            body = { country: receiver_address_country, weight: package_weight_kg };
        }

        if (!isReady) {
            return;
        }
        
        setIsCalculating(true);
        setPriceDetails(null);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            if (response.ok) {
                setPriceDetails(data);
            } else {
                toast({ title: "Pricing Error", description: data.error || "Could not calculate price.", variant: "destructive" });
            }
        } catch (error) {
            toast({ title: "Network Error", description: "Failed to connect to pricing service.", variant: "destructive" });
        } finally {
            setIsCalculating(false);
        }
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            handleCalculatePrice();
        }, 500); // Debounce API calls
        return () => clearTimeout(timer);
    }, [watchedPriceFields, form.getValues]);
    
    const onSubmit = async (values: ShipmentFormValues) => {
        if (!priceDetails) {
            toast({ title: "Booking Error", description: "Please calculate a price before booking.", variant: "destructive" });
            return;
        }
        if (!session?.email) {
             toast({ title: "Authentication Error", description: "Please log in to create a shipment.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);

        const payload = {
            ...values,
            user_email: session.email,
            pickup_date: format(values.pickup_date, 'yyyy-MM-dd'),
            final_total_price_with_tax: priceDetails.total_price
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                toast({ title: "Booking Successful", description: `Shipment ${result.shipment_id_str} has been created.` });
                router.push(`/track/${result.shipment_id_str}`);
            } else {
                 toast({ title: "Booking Failed", description: result.error || "An unknown error occurred.", variant: "destructive" });
            }

        } catch (error) {
            toast({ title: "Network Error", description: "Failed to connect to the booking service.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="shipmentType"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid grid-cols-2 gap-4"
                                    >
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="domestic" className="sr-only" />
                                            </FormControl>
                                            <FormLabel className={cn(
                                                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                                field.value === 'domestic' && "border-primary"
                                            )}>
                                                <Truck className="mb-3 h-6 w-6" />
                                                Domestic
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroupItem value="international" className="sr-only" />
                                            </FormControl>
                                             <FormLabel className={cn(
                                                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                                field.value === 'international' && "border-primary"
                                            )}>
                                                <Globe className="mb-3 h-6 w-6" />
                                                International
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Card>
                        <CardHeader>
                            <CardTitle>Sender Details</CardTitle>
                            <CardDescription>Enter the address where the shipment will be picked up from.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="sender_name" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField name="sender_address_street" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
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
                            <FormField name="receiver_address_street" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <div className="grid md:grid-cols-3 gap-4">
                                <FormField name="receiver_address_city" control={form.control} render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="receiver_address_state" control={form.control} render={({ field }) => ( <FormItem><FormLabel>State/Province</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="receiver_address_pincode" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Pincode/ZIP</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                {shipmentType === 'international' && (
                                    <FormField name="receiver_address_country" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                )}
                                <FormField name="receiver_phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Package & Service</CardTitle>
                            <CardDescription>Provide details about the package and choose a service.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="grid md:grid-cols-2 gap-4">
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
                                {shipmentType === 'domestic' && (
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
                                )}
                            </div>
                            <Separator />
                            <div className="flex flex-col items-center gap-4">
                                {isCalculating && (
                                    <div className="flex items-center text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Calculating price...</div>
                                )}
                                {priceDetails && !isCalculating && (
                                    <div className="text-center w-full">
                                        <div className="text-muted-foreground">Estimated Price:</div>
                                        <div className="text-3xl font-bold my-2">₹{priceDetails.total_price.toFixed(2)}</div>
                                         <Button type="submit" size="lg" className="w-full max-w-xs" disabled={isSubmitting}>
                                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                            {isSubmitting ? "Booking..." : "Create Booking"}
                                        </Button>
                                    </div>
                                )}
                                 {!priceDetails && !isCalculating && (
                                    <div className="text-center text-muted-foreground p-4">
                                        <p>Please fill in all the required details to get a price estimate.</p>
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

    