"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookUser, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddressBookPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Address Book</h1>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Address
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>This feature to manage your saved addresses is currently under construction.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
                    <BookUser className="h-12 w-12 mb-4" />
                    <p>You will be able to add, edit, and delete sender and receiver addresses here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
