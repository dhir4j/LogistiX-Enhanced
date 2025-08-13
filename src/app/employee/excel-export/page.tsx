
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDown } from "lucide-react";

export default function ExcelExportPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 w-full">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileDown />
                    Excel Export
                </CardTitle>
                <CardDescription>
                    This feature is coming soon. You will be able to filter your shipments and export them to a CSV file from here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Stay tuned for updates!</p>
            </CardContent>
        </Card>
    </div>
  );
}
