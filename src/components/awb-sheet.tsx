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
        <div className="p-2 bg-white text-black font-mono text-[8px] leading-tight max-w-full overflow-hidden">
            <div className="border-2 border-black">
                {/* Header */}
                <div className="flex border-b-2 border-black">
                    {/* Logo Section */}
                    <div className="w-1/4 p-2 flex flex-col justify-center border-r-2 border-black">
                        <Image 
                            src="/images/logo/logo.png" 
                            alt="HK Speed Couriers Logo" 
                            width={60} 
                            height={30} 
                            className="mb-1 h-8 w-auto" 
                        />
                        <p className="text-[6px] font-semibold">www.hkspeedcouriers.com</p>
                        <p className="text-[6px] font-semibold">info@hkspeedcouriers.com</p>
                    </div>
                    
                    {/* Center Section */}
                    <div className="w-1/2 p-2 text-center flex flex-col justify-center border-r-2 border-black">
                        <p className="font-bold text-sm">CNC</p>
                        <p className="font-bold text-xl">{shipment.shipment_id_str}</p>
                    </div>
                    
                    {/* Barcode Section */}
                    <div className="w-1/4 p-2 flex flex-col justify-center items-center">
                        <div className="w-full mb-1 flex justify-center">
                            <Barcode 
                                value={shipment.shipment_id_str} 
                                height={25} 
                                width={1} 
                                displayValue={false} 
                                margin={0} 
                            />
                        </div>
                        <p className="font-bold text-[7px] tracking-widest break-all text-center">
                            {shipment.shipment_id_str}
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex">
                    {/* Left Half */}
                    <div className="w-1/2 border-r-2 border-black">
                        {/* Section 1 - Account */}
                        <div className="flex border-b-2 border-black">
                            <div className="w-1/3 border-r-2 border-black p-1 text-center">
                                <div className="font-bold text-xs mb-1">1</div>
                                <p className="font-bold">ACCOUNT</p>
                                <p className="break-all">{shipment.user_email.split('@')[0].toUpperCase()}</p>
                            </div>
                            <div className="w-2/3 p-1 flex items-center">
                                <p className="font-bold">FROM SHIPPER</p>
                            </div>
                        </div>

                        {/* Sender Details */}
                        <div className="border-b-2 border-black p-1 text-[7px]">
                            <div className="mb-1">
                                <span className="font-bold">COMPANY NAME: </span>{shipment.sender_name}
                            </div>
                            <div className="mb-1">
                                <span className="font-bold">SENDER'S NAME: </span>{shipment.sender_name}
                            </div>
                            <div className="mb-1">
                                <span className="font-bold">ADDRESS:</span>
                            </div>
                            <div>{shipment.sender_address_street}</div>
                            <div>{shipment.sender_address_city}</div>
                            <div>{shipment.sender_address_state}</div>
                            <div><span className="font-bold">PIN CODE: </span>{shipment.sender_address_pincode}</div>
                            <div><span className="font-bold">TEL: </span>{shipment.sender_phone}</div>
                        </div>

                        {/* Section 2 - Customer Ref */}
                        <div className="flex border-b-2 border-black">
                            <div className="w-1/2 border-r-2 border-black p-1">
                                <div className="font-bold text-xs text-center mb-1">2</div>
                                <p className="font-bold">CUSTOMER REF</p>
                                <p className="text-[7px] break-all">{shipment.sender_name}</p>
                            </div>
                            <div className="w-1/2 p-1">
                                <p className="font-bold">ALT REFERENCE</p>
                            </div>
                        </div>

                        {/* Section 3 - Shipper's Agreement */}
                        <div className="p-1">
                            <div className="font-bold text-xs text-center mb-1">3</div>
                            <p className="font-bold mb-1">SHIPPER'S AGREEMENT AND SIGNATURE</p>
                            <p className="text-[7px] mb-2">Received for HK Speed Couriers</p>
                            <div className="flex justify-between text-[7px]">
                                <span>DATE: {date}</span>
                                <span>TIME: A.M/P.M</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Half */}
                    <div className="w-1/2">
                        {/* Section 4 & 6 */}
                        <div className="flex border-b-2 border-black">
                            <div className="w-1/2 border-r-2 border-black p-1 text-center">
                                <div className="font-bold text-xs mb-1">4</div>
                                <p className="font-bold">TO RECEIVER</p>
                            </div>
                            <div className="w-1/2 p-1 text-center">
                                <div className="font-bold text-xs mb-1">6</div>
                                <p className="font-bold">TYPE OF SERVICE</p>
                                <p className="font-bold text-sm">{shipment.service_type ? shipment.service_type.toUpperCase() : "INTERNATIONAL"}</p>
                            </div>
                        </div>

                        {/* Receiver Details & Description */}
                        <div className="flex border-b-2 border-black min-h-[120px]">
                            <div className="w-1/2 border-r-2 border-black p-1 text-[7px]">
                                <div className="mb-1">
                                    <span className="font-bold">COMPANY NAME: </span>{shipment.receiver_name}
                                </div>
                                <div className="mb-1">
                                    <span className="font-bold">RECEIVER'S NAME: </span>{shipment.receiver_name}
                                </div>
                                <div className="mb-1">
                                    <span className="font-bold">ADDRESS:</span>
                                </div>
                                <div>{shipment.receiver_address_street}</div>
                                <div><span className="font-bold">CITY: </span>{shipment.receiver_address_city}</div>
                                <div><span className="font-bold">STATE: </span>{shipment.receiver_address_state}</div>
                                <div><span className="font-bold">POST CODE: </span>{shipment.receiver_address_pincode}</div>
                                <div><span className="font-bold">TEL: </span>{shipment.receiver_phone}</div>
                                <div><span className="font-bold">COUNTRY: </span>{shipment.receiver_address_country}</div>
                            </div>
                            <div className="w-1/2 p-1">
                                <p className="font-bold mb-2">DESCRIPTION OF CONTENTS</p>
                                <div className="h-8 border-b border-gray-300 mb-2"></div>
                                <p className="font-bold mb-2">SPECIAL INSTRUCTION</p>
                                <div className="h-8"></div>
                            </div>
                        </div>

                        {/* Section 5 & 7 */}
                        <div className="flex border-b-2 border-black">
                            <div className="w-1/2 border-r-2 border-black p-1">
                                <div className="font-bold text-xs text-center mb-1">5</div>
                                <p className="font-bold text-[7px] mb-1">DUTIES/TAXES/VALUE/CODE NOS.</p>
                                <p className="font-bold text-[7px] mb-1">VALUE DECLARED FOR CUSTOMS PURPOSE:</p>
                                <p className="text-[7px]">Amount: {shipment.total_with_tax_18_percent.toFixed(2)} Currency: INR</p>
                            </div>
                            <div className="w-1/2 p-1 text-center">
                                <div className="font-bold text-xs mb-1">7</div>
                                <p className="font-bold mb-1">SIZE & WEIGHT</p>
                                <p className="text-[7px]">NO. OF PCS: 1</p>
                                <p className="text-[7px]">TOTAL WEIGHT: {shipment.package_weight_kg.toFixed(3)}</p>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="flex min-h-[100px]">
                            <div className="w-1/2 border-r-2 border-black p-1">
                                <p className="font-bold text-[7px] mb-2">CODE NOS/VAT/GST/HS NOS. ECT FOR CLEARANCE/DUTIES</p>
                                <table className="w-full border border-black text-[6px] mb-2">
                                    <thead>
                                        <tr className="border-b border-black">
                                            <th className="border-r border-black p-0.5 w-1/3">1</th>
                                            <th className="border-r border-black p-0.5 w-1/3">DESCRIPTION</th>
                                            <th className="p-0.5 w-1/3">CODE NO.</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-black">
                                            <td className="border-r border-black p-0.5 h-3"></td>
                                            <td className="border-r border-black p-0.5"></td>
                                            <td className="p-0.5"></td>
                                        </tr>
                                        <tr>
                                            <td className="border-r border-black p-0.5 h-3"></td>
                                            <td className="border-r border-black p-0.5"></td>
                                            <td className="p-0.5"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="text-[6px] text-center">All customs duties/taxes payable by consignee</p>
                            </div>
                            <div className="w-1/2 p-1">
                                <p className="font-bold mb-2">PROOF OF DELIVERY</p>
                                <p className="text-[7px] mb-2">SIGNATURE: ____________________</p>
                                <p className="text-[7px] mb-2">NAME: _______________________</p>
                                <p className="text-[7px]">DATE: __/__/____ TIME: __:__ A.M/P.M</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="border-t-2 border-black p-1 text-[6px]">
                    <p className="font-bold">Terms & Condition:</p>
                    <p>1) Maximum liability for lost shipment $100 or invoice value whichever lower.</p>
                    <p>2) Insurance available at additional cost.</p>
                    <p>3) We are authorized to digitize the invoice for Customs Declaration purposes.</p>
                </div>
            </div>
        </div>
    );
}