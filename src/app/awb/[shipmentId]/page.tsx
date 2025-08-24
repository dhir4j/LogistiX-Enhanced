
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import AwbSheet from '@/components/awb-sheet';

interface ShipmentDetails {
    shipment_id_str: string;
    status: string;
    sender_name: string;
    sender_address_street: string;
    sender_address_city: string;
    sender_address_state: string;
    sender_address_pincode: string;
    sender_address_country: string;
    sender_phone: string;
    user_email: string;
    receiver_name: string;
    receiver_address_street: string;
    receiver_address_city: string;
    receiver_address_state: string;
    receiver_address_pincode: string;
    receiver_address_country: string;
    receiver_phone: string;
    package_weight_kg: number;
    package_length_cm: number;
    package_width_cm: number;
    package_height_cm: number;
    service_type: string;
    booking_date: string;
    total_with_tax_18_percent: number;
}


export default function AwbPage() {
    const params = useParams();
    const shipmentId = Array.isArray(params.shipmentId) ? params.shipmentId[0] : params.shipmentId;
    const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (shipmentId) {
            const fetchDetails = async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipments/${shipmentId}`);
                    if (!response.ok) {
                        const err = await response.json();
                        throw new Error(err.error || 'Shipment not found');
                    }
                    const data: ShipmentDetails = await response.json();
                    setShipmentDetails(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchDetails();
        }
    }, [shipmentId]);

    useEffect(() => {
      if (shipmentDetails) {
        // Use a timeout to ensure the content is rendered before printing
        const timer = setTimeout(() => {
          window.print();
        }, 500);
        return () => clearTimeout(timer);
      }
    }, [shipmentDetails]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="ml-2">Loading AWB...</p>
            </div>
        );
    }

    if (error) {
        return <div className="flex h-screen items-center justify-center text-red-500">Error: {error}</div>;
    }

    if (!shipmentDetails) {
        return <div className="flex h-screen items-center justify-center">No shipment details found.</div>;
    }

    return (
        <div className="bg-white">
            <AwbSheet shipment={shipmentDetails} />
        </div>
    );
}
