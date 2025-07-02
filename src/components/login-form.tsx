"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useToken } from "@/context/token-context";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});

export function LoginForm({
  login: onLogin,
}: {
  login: (body: { email: string; password: string }) => Promise<{
    success: boolean;
    message?: string;
    data?: {
      token: string;
      user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      };
    };
  }>;
}) {
  const router = useRouter();
  const { setToken } = useToken();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    const resp = await onLogin({ email, password });
    if (!resp.success) {
      alert(resp?.message ?? "Unauthorized");
      return;
    }
    setToken(resp.data?.token ?? "");
    router.replace("/dashboard");
  }
  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-6">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          prefetch
          href={"/sign-up"}
          className="underline underline-offset-4"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
