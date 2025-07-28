"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    toast({
      title: "Login Successful",
      description: "Redirecting to your dashboard...",
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md shadow-md border">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary rounded-sm p-3 w-fit mb-4">
            <LogIn className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-headline">Client Login</CardTitle>
          <CardDescription>Access your account to manage your shipments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="h-11" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full text-lg py-6">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          <p className="text-muted-foreground">
            {"Don't have an account? "}
            <Button variant="link" asChild className="p-0 h-auto font-semibold">
              <Link href="/signup">Register Here</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
