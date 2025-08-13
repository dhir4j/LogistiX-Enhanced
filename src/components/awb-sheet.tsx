
"use client";

import Image from 'next/image';
import Barcode from 'react-barcode';

interface AwbSheetProps {
    shipment: {
        shipment_id_str: string;
        service_type: string;
        booking_date: string;
        total_with_tax_18_percent: number;
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
    };
}

export default function AwbSheet({ shipment }: AwbSheetProps) {
    
    return (
      <div className="p-4 bg-white text-black font-sans text-[10px]">
        <div className="border border-black p-2 space-y-2">
            {/* Header */}
            <div className="flex justify-between items-start pb-2 border-b-2 border-black">
                <div className="flex items-center space-x-2">
                    <Image src="/images/logo/logo.png" alt="HK Speed Couriers Logo" width={60} height={60} />
                    <div>
                        <h1 className="text-xl font-bold">HK SPEED COURIERS</h1>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold">www.hkspeedcouriers.com</p>
                    <p>Hkspeedcouriersprivatelimited@gmail.com</p>
                </div>
            </div>

            {/* Shipment Details */}
            <div className="grid grid-cols-5 gap-2 border-b-2 border-black pb-2">
                <div>
                    <p className="font-bold">AWB Number:</p>
                    <p>{shipment.shipment_id_str}</p>
                </div>
                <div>
                    <p className="font-bold">Service Type:</p>
                    <p>{shipment.service_type.toUpperCase()}</p>
                </div>
                <div>
                    <p className="font-bold">Date:</p>
                    <p>{new Date(shipment.booking_date).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="font-bold">Currency:</p>
                    <p>INR</p>
                </div>
                <div>
                    <p className="font-bold">Amount:</p>
                    <p>₹{shipment.total_with_tax_18_percent.toFixed(2)}</p>
                </div>
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-2">
                {/* From (Shipper) */}
                <div className="border-r-2 border-black pr-2">
                    <h2 className="font-bold text-lg mb-1">From (Shipper)</h2>
                    <p><span className="font-bold">Name:</span> {shipment.sender_name}</p>
                    <p><span className="font-bold">Company Name:</span> N/A</p>
                    <p><span className="font-bold">Address:</span> {shipment.sender_address_street}</p>
                    <p>{shipment.sender_address_city}, {shipment.sender_address_state}, {shipment.sender_address_pincode}</p>
                    <p><span className="font-bold">Country:</span> {shipment.sender_address_country}</p>
                    <p><span className="font-bold">Phone:</span> {shipment.sender_phone}</p>
                    <p><span className="font-bold">Email:</span> {shipment.user_email}</p>
                </div>
                {/* To (Receiver) */}
                <div>
                    <h2 className="font-bold text-lg mb-1">To (Receiver)</h2>
                    <p><span className="font-bold">Name:</span> {shipment.receiver_name}</p>
                    <p><span className="font-bold">Company Name:</span> N/A</p>
                    <p><span className="font-bold">Address:</span> {shipment.receiver_address_street}</p>
                    <p>{shipment.receiver_address_city}, {shipment.receiver_address_state}, {shipment.receiver_address_pincode}</p>
                    <p><span className="font-bold">Country:</span> {shipment.receiver_address_country}</p>
                    <p><span className="font-bold">Phone:</span> {shipment.receiver_phone}</p>
                    <p><span className="font-bold">Email:</span> N/A</p>
                </div>
            </div>
            
             {/* Package Info */}
            <div className="border-t-2 border-black pt-2">
                <h2 className="font-bold text-lg mb-1">Package Information</h2>
                <div className="grid grid-cols-5 gap-2">
                    <p><span className="font-bold">No. of Pieces:</span> 1</p>
                    <p><span className="font-bold">Weight:</span> {shipment.package_weight_kg.toFixed(2)} kg</p>
                    <p><span className="font-bold">Dimensions:</span> {shipment.package_length_cm}x{shipment.package_width_cm}x{shipment.package_height_cm} cm</p>
                    <p><span className="font-bold">Declared Value:</span> ₹{shipment.total_with_tax_18_percent.toFixed(2)}</p>
                    <p className="col-span-2"><span className="font-bold">Special Instructions:</span> None</p>
                </div>
            </div>

            {/* Terms & Conditions */}
            <div className="border-t-2 border-black pt-2 text-[8px]">
                <h3 className="font-bold text-base mb-1">Terms & Conditions</h3>
                <p>By giving us your shipment, you agree to the terms and conditions set forth. Insurance for shipments is optional and must be requested at the time of booking. Liability for any loss or damage is limited to the lesser of ₹1,000 or the actual value of the goods, unless a higher value is declared and additional insurance is paid for. The shipper certifies that the particulars given in this Air Waybill are correct and that the shipment does not contain any prohibited items. The consignee is responsible for all customs duties, taxes, and fees that may be levied.</p>
            </div>

            {/* Signature */}
            <div className="border-t-2 border-black pt-2 grid grid-cols-2 gap-4">
                 <div className="mt-8">
                    <div className="border-t border-black w-full"></div>
                    <p className="text-center font-bold mt-1">Shipper's Signature</p>
                </div>
                 <div className="mt-8">
                    <div className="border-t border-black w-full"></div>
                    <p className="text-center font-bold mt-1">Courier Representative</p>
                </div>
            </div>
            
            {/* Footer */}
            <div className="border-t-2 border-black pt-2 mt-2 text-center">
                 <div className="mx-auto" style={{width: 'fit-content'}}>
                    <Barcode value={shipment.shipment_id_str} height={40} width={1.5} fontSize={12} />
                 </div>
                <p className="font-bold mt-2">Thank you for choosing HK SPEED COURIERS!</p>
                <p>Contact: +91-89689-27612 | Hkspeedcouriersprivatelimited@gmail.com</p>
            </div>
        </div>
      </div>
    );
}
