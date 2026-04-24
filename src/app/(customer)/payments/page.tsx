"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet, CreditCard, Loader2, IndianRupee, RefreshCw } from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Transaction {
    id: number;
    order_id: string;
    amount: number;
    status: string;
    payment_mode: string | null;
    created_at: string;
}

interface BalanceData {
    balance: number;
    transactions: Transaction[];
}

function statusBadge(status: string) {
    if (status === "Success") return <Badge variant="default" className="bg-green-600">Success</Badge>;
    if (status === "Failed")  return <Badge variant="destructive">Failed</Badge>;
    return <Badge variant="secondary">Pending</Badge>;
}

export default function PaymentsPage() {
    const { session, isLoading: isSessionLoading } = useSession();
    const router = useRouter();
    const { toast } = useToast();

    const [data, setData]           = useState<BalanceData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [amount, setAmount]       = useState("");
    const [isPaying, setIsPaying]   = useState(false);

    const formRef = useRef<HTMLFormElement>(null);
    const [ccParams, setCcParams]   = useState<{ enc_request: string; access_code: string; payment_url: string } | null>(null);

    const fetchBalance = async (email: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API}/api/payment/balance?email=${encodeURIComponent(email)}`);
            if (res.ok) setData(await res.json());
        } catch {
            toast({ title: "Error", description: "Could not fetch balance.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isSessionLoading) {
            if (!session) { router.push("/login"); return; }
            fetchBalance(session.email);
        }
    }, [session, isSessionLoading]);

    // Auto-submit CCAvenue form once we have params
    useEffect(() => {
        if (ccParams && formRef.current) {
            formRef.current.submit();
        }
    }, [ccParams]);

    const handlePayNow = async () => {
        const amt = parseFloat(amount);
        if (!amt || amt < 1) {
            toast({ title: "Invalid amount", description: "Minimum recharge is ₹1.", variant: "destructive" });
            return;
        }
        if (!session) return;

        setIsPaying(true);
        try {
            const res = await fetch(`${API}/api/payment/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_email: session.email,
                    amount: amt,
                    name: `${session.firstName} ${session.lastName}`,
                    phone: "9999999999",
                }),
            });
            const result = await res.json();
            if (!res.ok) {
                toast({ title: "Payment Error", description: result.error, variant: "destructive" });
                setIsPaying(false);
                return;
            }
            setCcParams(result);
        } catch {
            toast({ title: "Network Error", description: "Could not initiate payment.", variant: "destructive" });
            setIsPaying(false);
        }
    };

    if (isSessionLoading || !session) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Billing & Payments</h1>

            {/* Hidden CCAvenue auto-submit form */}
            {ccParams && (
                <form ref={formRef} method="POST" action={ccParams.payment_url} style={{ display: "none" }}>
                    <input type="hidden" name="encRequest"   value={ccParams.enc_request} />
                    <input type="hidden" name="access_code"  value={ccParams.access_code} />
                </form>
            )}

            {/* Balance card */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Wallet className="h-5 w-5" /> Wallet Balance</CardTitle>
                        <CardDescription>Your current available balance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <Skeleton className="h-10 w-32" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <IndianRupee className="h-6 w-6 text-primary" />
                                <span className="text-4xl font-bold">{data?.balance.toFixed(2) ?? "0.00"}</span>
                            </div>
                        )}
                        <Button variant="ghost" size="sm" className="mt-3" onClick={() => fetchBalance(session.email)}>
                            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Recharge Wallet</CardTitle>
                        <CardDescription>Add funds via Kotak payment gateway.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (₹)</Label>
                            <Input
                                id="amount"
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled={isPaying}
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {[500, 1000, 2000, 5000].map((preset) => (
                                <Button key={preset} variant="outline" size="sm" onClick={() => setAmount(String(preset))} disabled={isPaying}>
                                    ₹{preset}
                                </Button>
                            ))}
                        </div>
                        <Button className="w-full" onClick={handlePayNow} disabled={isPaying || !amount}>
                            {isPaying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting...</> : "Pay Now"}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Transaction history */}
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Last 20 wallet recharge transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="space-y-2">
                            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}
                        </div>
                    ) : data?.transactions.length === 0 ? (
                        <p className="text-muted-foreground text-sm text-center py-8">No transactions yet.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Mode</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.transactions.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell className="font-mono text-xs">{t.order_id}</TableCell>
                                        <TableCell>₹{t.amount.toFixed(2)}</TableCell>
                                        <TableCell>{t.payment_mode ?? "—"}</TableCell>
                                        <TableCell>{statusBadge(t.status)}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {new Date(t.created_at).toLocaleString("en-IN")}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
