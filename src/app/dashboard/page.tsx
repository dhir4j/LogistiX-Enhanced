import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline flex items-center">
            <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
            Dashboard
          </CardTitle>
          <CardDescription>Welcome to your RS Swift Couriers dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            From here you can manage your shipments, view your booking history, and update your profile.
          </p>
          {/* Placeholder for dashboard content */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>My Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">You have no active shipments.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Manage your account settings.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
