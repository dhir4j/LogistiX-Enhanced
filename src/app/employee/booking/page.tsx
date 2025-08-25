
"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { CalendarIcon, Loader2, BookUser, Globe, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { shipmentBookingSchema } from "@/lib/schemas";
import type { ShipmentBookingFormValues } from "@/lib/schemas";
import { Separator } from "@/components/ui/separator";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { useApi } from "@/hooks/use-api";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PriceResponse {
    total_price: number;
    [key: string]: any;
}

interface SavedAddress {
    id: number;
    address_type: 'sender' | 'receiver';
    nickname: string;
    name: string;
    address_street: string;
    address_city: string;
    address_state: string;
    address_pincode: string;
    address_country: string;
    phone: string;
}

export default function EmployeeBookingPage() {
    const { toast } = useToast();
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();
    const [priceDetails, setPriceDetails] = useState<PriceResponse | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { data: senderAddresses, mutate: mutateSenderAddresses } = useApi<SavedAddress[]>('/api/employee/addresses?type=sender');
    const { data: receiverAddresses, mutate: mutateReceiverAddresses } = useApi<SavedAddress[]>('/api/employee/addresses?type=receiver');
    
    const form = useForm<ShipmentBookingFormValues>({
        resolver: zodResolver(shipmentBookingSchema),
        defaultValues: {
            shipmentType: "domestic",
            sender_name: "", sender_address_street: "", sender_address_city: "",
            sender_address_state: "", sender_address_pincode: "", sender_address_country: "India",
            sender_phone: "", save_sender_address: false, sender_address_nickname: "",
            receiver_name: "", receiver_address_street: "", receiver_address_city: "",
            receiver_address_state: "", receiver_address_pincode: "", receiver_address_country: "India",
            receiver_phone: "", save_receiver_address: false, receiver_address_nickname: "",
            package_weight_kg: 0.5, package_width_cm: 10, package_height_cm: 10,
            package_length_cm: 10, pickup_date: new Date(), service_type: "Standard",
        },
    });

    const shipmentType = useWatch({ control: form.control, name: "shipmentType" });
    const watchedPriceFields = useWatch({ control: form.control, name: ["receiver_address_country", "receiver_address_state", "package_weight_kg", "service_type", "shipmentType"] });
    const watchSaveSender = useWatch({ control: form.control, name: "save_sender_address" });
    const watchSaveReceiver = useWatch({ control: form.control, name: "save_receiver_address" });

    useEffect(() => {
        if (!isSessionLoading && !session) {
            router.push('/employee-login');
        }
    }, [session, isSessionLoading, router]);

    useEffect(() => {
        if (shipmentType === 'domestic') {
            form.setValue('receiver_address_country', 'India');
        } else {
             form.setValue('receiver_address_country', '');
        }
        setPriceDetails(null);
    }, [shipmentType, form.setValue]);

    const handleGetPrice = async () => {
        const { receiver_address_state, receiver_address_country, package_weight_kg, service_type, shipmentType } = form.getValues();
        
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


        if (!isReady) return;

        setIsCalculating(true);
        setPriceDetails(null);

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
            handleGetPrice();
        }, 500); // Debounce API calls
        return () => clearTimeout(timer);
    }, [watchedPriceFields]);

    const saveAddress = async (type: 'sender' | 'receiver') => {
        const values = form.getValues();
        const addressData = {
            nickname: type === 'sender' ? values.sender_address_nickname : values.receiver_address_nickname,
            name: type === 'sender' ? values.sender_name : values.receiver_name,
            address_street: type === 'sender' ? values.sender_address_street : values.receiver_address_street,
            address_city: type === 'sender' ? values.sender_address_city : values.receiver_address_city,
            address_state: type === 'sender' ? values.sender_address_state : values.receiver_address_state,
            address_pincode: type === 'sender' ? values.sender_address_pincode : values.receiver_address_pincode,
            address_country: type === 'sender' ? values.sender_address_country : values.receiver_address_country,
            phone: type === 'sender' ? values.sender_phone : values.receiver_phone,
            address_type: type
        };

        if (!addressData.nickname) {
            toast({ title: "Save Error", description: "Please provide a nickname to save the address.", variant: "destructive" });
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employee/addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-User-Email': session!.email },
                body: JSON.stringify(addressData)
            });
            const result = await response.json();
            if (response.ok) {
                toast({ title: "Success", description: `Address "${addressData.nickname}" saved.`});
                if(type === 'sender') mutateSenderAddresses(); else mutateReceiverAddresses();
            } else {
                toast({ title: "Save Failed", description: result.error, variant: "destructive"});
            }
        } catch (error) {
            toast({ title: "Network Error", description: "Could not save address.", variant: "destructive"});
        }
    };

    const onSubmit = async (values: ShipmentBookingFormValues) => {
        if (!priceDetails) {
            toast({ title: "Error", description: "Please wait for price calculation before booking.", variant: "destructive" });
            return;
        }
        if (!session) {
            toast({ title: "Error", description: "You must be logged in to book.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        
        if (values.save_sender_address) await saveAddress('sender');
        if (values.save_receiver_address) await saveAddress('receiver');
        
        const apiEndpoint = values.shipmentType === 'domestic'
            ? '/api/shipments/domestic'
            : '/api/shipments/international';

        const payload = {
            ...values,
            user_email: session.email,
            pickup_date: format(values.pickup_date, 'yyyy-MM-dd'),
            final_total_price_with_tax: priceDetails.total_price,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiEndpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if(response.ok) {
                toast({ title: "Booking Successful", description: `Shipment ${result.data.shipment_id_str} has been created.` });
                router.push(`/employee/awb-tracking?id=${result.data.shipment_id_str}`);
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

    const applyAddress = (address: SavedAddress, type: 'sender' | 'receiver') => {
        form.setValue(`${type}_name`, address.name);
        form.setValue(`${type}_address_street`, address.address_street);
        form.setValue(`${type}_address_city`, address.address_city);
        form.setValue(`${type}_address_state`, address.address_state);
        form.setValue(`${type}_address_pincode`, address.address_pincode);
        form.setValue(`${type}_address_country`, address.address_country);
        form.setValue(`${type}_phone`, address.phone);
    };

    const AddressBookDialog = ({ type, addresses }: { type: 'sender' | 'receiver', addresses: SavedAddress[] | null | undefined }) => (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm"><BookUser className="mr-2 h-4 w-4" /> Address Book</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select {type === 'sender' ? 'Sender' : 'Receiver'} Address</DialogTitle>
                    <DialogDescription>
                        Click on an address to auto-fill the form.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                    {addresses?.map(addr => (
                         <DialogClose asChild key={addr.id}>
                            <Button variant="ghost" className="w-full justify-start h-auto" onClick={() => applyAddress(addr, type)}>
                                <div className="text-left">
                                    <p className="font-bold">{addr.nickname}</p>
                                    <p className="text-sm text-muted-foreground">{addr.name}, {addr.address_street}, {addr.address_city}</p>
                                </div>
                            </Button>
                        </DialogClose>
                    ))}
                    {!addresses || addresses.length === 0 && <p className="text-muted-foreground text-sm p-4 text-center">No saved addresses found for {type}.</p>}
                </div>
            </DialogContent>
        </Dialog>
    );

    if (isSessionLoading || !session) {
        return (
          <div className="flex justify-center items-center h-screen w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        );
    }

    return (
        <div className="w-full p-4 sm:p-6">
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
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Sender Details</CardTitle>
                                <CardDescription>Enter the address where the shipment will be picked up from.</CardDescription>
                            </div>
                            <AddressBookDialog type="sender" addresses={senderAddresses} />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="sender_name" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField name="sender_address_street" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <div className="grid md:grid-cols-3 gap-4">
                                <FormField name="sender_address_city" control={form.control} render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="sender_address_state" control={form.control} render={({ field }) => ( <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="sender_address_pincode" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Pincode</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                            <FormField name="sender_phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <Separator />
                            <FormField control={form.control} name="save_sender_address" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none"><FormLabel>Save this address to sender book</FormLabel></div>
                                </FormItem>
                            )}/>
                            {watchSaveSender && <FormField name="sender_address_nickname" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address Nickname</FormLabel><FormControl><Input {...field} placeholder="e.g. Head Office" /></FormControl><FormMessage /></FormItem> )}/>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle>Receiver Details</CardTitle>
                                <CardDescription>Enter the destination address for the shipment.</CardDescription>
                            </div>
                            <AddressBookDialog type="receiver" addresses={receiverAddresses} />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField name="receiver_name" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField name="receiver_address_street" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <div className="grid md:grid-cols-3 gap-4">
                                <FormField name="receiver_address_city" control={form.control} render={({ field }) => ( <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                 <FormField name="receiver_address_state" control={form.control} render={({ field }) => ( <FormItem><FormLabel>State/Province</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="receiver_address_pincode" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Pincode/ZIP</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField 
                                  name="receiver_address_country" 
                                  control={form.control} 
                                  render={({ field }) => ( 
                                    <FormItem>
                                      <FormLabel>Country</FormLabel>
                                      <FormControl>
                                        <Input {...field} disabled={shipmentType === 'domestic'} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem> 
                                  )}
                                />
                                <FormField name="receiver_phone" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                            <Separator />
                            <FormField control={form.control} name="save_receiver_address" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none"><FormLabel>Save this address to receiver book</FormLabel></div>
                                </FormItem>
                            )}/>
                            {watchSaveReceiver && <FormField name="receiver_address_nickname" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Address Nickname</FormLabel><FormControl><Input {...field} placeholder="e.g. Warehouse" /></FormControl><FormMessage /></FormItem> )}/>}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Package, Service & Price</CardTitle>
                            <CardDescription>Provide package details, choose a service, and confirm the price.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <FormField name="package_weight_kg" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" step="0.1" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="package_length_cm" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Length (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="package_width_cm" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Width (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                                <FormField name="package_height_cm" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Height (cm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField name="pickup_date" control={form.control} render={({ field }) => (
                                    <FormItem className="flex flex-col"><FormLabel>Pickup Date</FormLabel>
                                        <Popover><PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("w-full justify-start pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
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
                                {shipmentType === 'domestic' && <FormField name="service_type" control={form.control} render={({ field }) => (
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
                                {shipmentType === 'international' && <FormField name="service_type" control={form.control} render={({ field }) => (
                                    <FormItem><FormLabel>Service Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select service" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="International Express">International Express</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    <FormMessage /></FormItem>
                                )} />}
                            </div>
                            <Separator />
                            <div className="flex flex-col items-center gap-4">
                                {(isCalculating) && (
                                    <div className="flex items-center justify-center text-muted-foreground">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Calculating...
                                    </div>
                                )}
                                {priceDetails && !isCalculating && (
                                    <div className="text-center w-full">
                                        <div className="text-muted-foreground">Estimated Price:</div>
                                        <div className="text-3xl font-bold my-2">₹{priceDetails.total_price.toFixed(2)}</div>
                                         <p className="text-xs text-muted-foreground pb-4">This price is inclusive of all taxes and fees. Employee balance will be used for payment.</p>
                                        <Button type="submit" size="lg" className="w-full max-w-xs" disabled={!priceDetails || isSubmitting || isCalculating}>
                                            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                            {isSubmitting ? "Booking..." : "Book Shipment"}
                                        </Button>
                                    </div>
                                )}
                                {!priceDetails && !isCalculating && (
                                    <p className="text-sm text-muted-foreground text-center p-4">Fill in destination and weight details to see the price.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    );
}
