import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, RotateCcw, ZoomIn } from "lucide-react";

export default function EmployeeDashboardPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <Card className="w-full max-w-2xl shadow-lg border-2">
        <CardContent className="p-8">
          <div className="flex items-center gap-4">
            <Input
              type="text"
              placeholder="Enter the AWB"
              className="flex-1 h-12 text-lg border-2"
            />
            <Button size="lg" className="h-12 text-lg">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <Button variant="ghost" className="text-muted-foreground">
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              <ZoomIn className="mr-2 h-5 w-5" />
              Zoom
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
