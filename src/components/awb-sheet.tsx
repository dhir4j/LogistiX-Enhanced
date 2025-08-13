
"use client";

import Barcode from 'react-barcode';
import Image from 'next/image';

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
    const today = new Date(shipment.booking_date);
    const date = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <div className="p-1 bg-white text-black font-sans text-[9px]">
            <div className="border-2 border-black p-1">
                {/* Header */}
                <div className="flex justify-between items-center pb-1 border-b-2 border-black">
                    <div className="w-1/3">
                        <Image src="/images/logo/logo.png" alt="HK Speed Couriers Logo" width={80} height={40} className="h-10 w-auto" />
                        <p className="text-[7px] font-semibold">www.hkspeedcouriers.com</p>
                        <p className="text-[7px] font-semibold">info@hkspeedcouriers.com</p>
                    </div>
                    <div className="w-1/3 text-center">
                        <p className="font-bold">CNC</p>
                        <p className="font-bold text-lg">{shipment.shipment_id_str}</p>
                    </div>
                    <div className="w-1/3 text-right">
                        <Barcode value={shipment.shipment_id_str} height={30} width={1.5} displayValue={false} margin={0} />
                        <p className="font-bold text-lg tracking-[0.2em]">{shipment.shipment_id_str}</p>
                    </div>
                </div>

                {/* Main Content Table */}
                <table className="w-full border-collapse">
                    <tbody>
                        <tr>
                            {/* Left Column */}
                            <td className="w-1/2 border-r-2 border-black align-top">
                                <table className="w-full border-collapse">
                                    <tbody>
                                        <tr className="border-b-2 border-black">
                                            <td className="border-r-2 border-black p-1 w-1/3">
                                                <div className="text-center font-bold">1</div>
                                                <p className="font-bold">ACCOUNT</p>
                                                <p>{shipment.user_email.split('@')[0].toUpperCase()}</p>
                                            </td>
                                            <td className="p-1 w-2/3">
                                                <p>FROM SHIPPER</p>
                                            </td>
                                        </tr>
                                        <tr className="border-b-2 border-black">
                                            <td colSpan={2} className="p-1">
                                                <p><span className="font-bold">COMPANY NAME:</span> {shipment.sender_name}</p>
                                                <p><span className="font-bold">SENDER'S NAME:</span> {shipment.sender_name}</p>
                                                <p className="font-bold">ADDRESS:</p>
                                                <p>{shipment.sender_address_street}</p>
                                                <p>{shipment.sender_address_city}</p>
                                                <p>{shipment.sender_address_state}</p>
                                                <p><span className="font-bold">PIN CODE:</span> {shipment.sender_address_pincode}</p>
                                                <p><span className="font-bold">TEL:</span> {shipment.sender_phone}</p>
                                            </td>
                                        </tr>
                                        <tr className="border-b-2 border-black">
                                            <td className="border-r-2 border-black p-1">
                                                <div className="text-center font-bold">2</div>
                                                <p>CUSTOMER REF</p>
                                                <p>{shipment.sender_name}</p>
                                            </td>
                                            <td className="p-1">
                                                <p>ALT REFERENCE</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className="p-1">
                                                 <div className="text-center font-bold">3</div>
                                                <p className="font-bold">SHIPPER'S AGREEMENT AND SIGNATURE</p>
                                                <p>Received for HK Speed Couriers</p>
                                                <div className="flex justify-between mt-2">
                                                    <p>DATE: {date}</p>
                                                    <p>TIME: A.M/P.M</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            {/* Right Column */}
                            <td className="w-1/2 align-top">
                                <table className="w-full border-collapse">
                                    <tbody>
                                        <tr className="border-b-2 border-black">
                                            <td className="border-r-2 border-black p-1 w-1/3">
                                                <div className="text-center font-bold">4</div>
                                                <p className="font-bold">TO RECEIVER</p>
                                            </td>
                                            <td className="p-1 w-2/3">
                                                <div className="text-center font-bold">6</div>
                                                <p>TYPE OF SERVICE</p>
                                                <p className="font-bold text-center">{shipment.service_type.toUpperCase()}</p>
                                            </td>
                                        </tr>
                                        <tr className="border-b-2 border-black">
                                            <td className="p-1 border-r-2 border-black">
                                                <p><span className="font-bold">COMPANY NAME:</span> {shipment.receiver_name}</p>
                                                <p><span className="font-bold">RECEIVER'S NAME:</span> {shipment.receiver_name}</p>
                                                <p className="font-bold">ADDRESS:</p>
                                                <p>{shipment.receiver_address_street}</p>
                                                <p><span className="font-bold">CITY:</span> {shipment.receiver_address_city}</p>
                                                <p><span className="font-bold">STATE:</span> {shipment.receiver_address_state}</p>
                                                <p><span className="font-bold">POST CODE:</span> {shipment.receiver_address_pincode}</p>
                                                <p><span className="font-bold">TEL:</span> {shipment.receiver_phone}</p>
                                                <p><span className="font-bold">COUNTRY:</span> {shipment.receiver_address_country}</p>
                                            </td>
                                            <td className="p-1 align-top">
                                                <p>DESCRIPTION OF CONTENTS</p>
                                                <div className="h-10"></div>
                                                <p className="border-t-2 border-black mt-2 pt-1">SPECIAL INSTRUCTION</p>
                                                <div className="h-10"></div>
                                            </td>
                                        </tr>
                                        <tr className="border-b-2 border-black">
                                            <td className="p-1 border-r-2 border-black">
                                                <div className="text-center font-bold">5</div>
                                                <p>DUTIES/TAXES/VALUE/CODE NOS.</p>
                                                <p><span className="font-bold">VALUE DECLARED FOR CUSTOMS PURPOSE:</span></p>
                                                <p>Amount: {shipment.total_with_tax_18_percent.toFixed(2)} Currency: INR</p>
                                            </td>
                                            <td className="p-1">
                                                <div className="text-center font-bold">7</div>
                                                <p>SIZE & WEIGHT</p>
                                                <p>NO. OF PCS: 1</p>
                                                <p>TOTAL WEIGHT: {shipment.package_weight_kg.toFixed(3)}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-1 border-r-2 border-black">
                                                <p>CODE NOS/VAT/GST/HS NOS. ECT FOR CLEARANCE/DUTISE</p>
                                                 <table className="w-full text-center mt-1 border-2 border-black border-collapse">
                                                    <thead>
                                                        <tr>
                                                            <th className="border-r border-black p-0.5 w-1/3">1</th>
                                                            <th className="border-r border-black p-0.5 w-1/3">DESCRIPTION</th>
                                                            <th className="p-0.5 w-1/3">CODE NO.</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-t border-black"><td className="h-4"></td><td></td><td></td></tr>
                                                        <tr className="border-t border-black"><td className="h-4"></td><td></td><td></td></tr>
                                                    </tbody>
                                                </table>
                                                <p className="text-center">All customs duties/taxes payable by consignee</p>
                                            </td>
                                            <td className="p-1 align-top">
                                                <p className="font-bold">PROOF OF DELIVERY</p>
                                                <p className="mt-4">SIGNATURE: ____________________</p>
                                                <p className="mt-2">NAME: _______________________</p>
                                                <p className="mt-2">DATE: __/__/____ TIME: __:__ A.M/P.M</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="p-1 text-[7px] border-t-2 border-black">
                                <p className="font-bold">Terms & Condition:</p>
                                <p>1) Maximum liability for lost shipment $100 or invoice value whichever lower.</p>
                                <p>2) Insurance available at additional cost.</p>
                                <p>3) We are authorized to digitize the invoice for Customs Declaration purposes.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
