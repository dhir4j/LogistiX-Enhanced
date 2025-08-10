
"use client";

import { useState, useMemo } from 'react';
import { useApi } from '@/hooks/use-api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreHorizontal, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface Shipment {
    id: number;
    shipment_id_str: string;
    sender_name: string;
    receiver_name: string;
    receiver_address_city: string;
    booking_date: string;
    status: string;
    total_with_tax_18_percent: number;
}

interface ShipmentsApiResponse {
    shipments: Shipment[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
}

export function AdminOrdersTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const { toast } = useToast();

    const queryParams = useMemo(() => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', '10');
        if (search) params.append('q', search);
        if (status && status !== 'all') params.append('status', status);
        return params.toString();
    }, [page, search, status]);

    const { data, isLoading, error, mutate } = useApi<ShipmentsApiResponse>(`/api/admin/shipments?${queryParams}`);

    const handleStatusUpdate = async (shipmentId: string, newStatus: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/shipments/${shipmentId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus, location: "Admin Update", activity: `Status updated to ${newStatus} by admin.` }),
            });
            if (response.ok) {
                toast({ title: "Success", description: "Shipment status updated." });
                mutate();
            } else {
                const err = await response.json();
                toast({ title: "Error", description: err.error || "Failed to update status.", variant: "destructive"});
            }
        } catch (err) {
            toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        }
    };
    
    const exportToCSV = () => {
        if (!data?.shipments.length) return;
        const headers = ["Order ID", "Sender", "Receiver", "Destination", "Date", "Amount", "Status"];
        const rows = data.shipments.map(s => [
            s.shipment_id_str,
            s.sender_name,
            s.receiver_name,
            s.receiver_address_city,
            new Date(s.booking_date).toLocaleDateString(),
            s.total_with_tax_18_percent,
            s.status
        ].join(','));

        let csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "shipments.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-background border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search by Order ID, Name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="Pending Payment">Pending Payment</SelectItem>
                            <SelectItem value="Booked">Booked</SelectItem>
                            <SelectItem value="In Transit">In Transit</SelectItem>
                            <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" onClick={exportToCSV} disabled={!data?.shipments.length}>
                    <Download className="mr-2 h-4 w-4" />
                    Export to CSV
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Receiver</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell colSpan={8}><Skeleton className="h-8 w-full" /></TableCell>
                        </TableRow>
                    ))}
                    {error && <TableRow><TableCell colSpan={8} className="text-center text-red-500">Failed to load shipments.</TableCell></TableRow>}
                    {!isLoading && !error && data?.shipments.map((s) => (
                        <TableRow key={s.id}>
                            <TableCell className="font-medium">{s.shipment_id_str}</TableCell>
                            <TableCell>{s.sender_name}</TableCell>
                            <TableCell>{s.receiver_name}</TableCell>
                            <TableCell>{s.receiver_address_city}</TableCell>
                            <TableCell>{new Date(s.booking_date).toLocaleDateString()}</TableCell>
                            <TableCell>₹{s.total_with_tax_18_percent.toFixed(2)}</TableCell>
                            <TableCell>{s.status}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {['Booked', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'].map(st => (
                                            <DropdownMenuItem key={st} onClick={() => handleStatusUpdate(s.shipment_id_str, st)}>
                                                Set as {st}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <span className="text-sm">Page {data?.currentPage || 1} of {data?.totalPages || 1}</span>
                <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={!data || page === data.totalPages}>
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    );
}
