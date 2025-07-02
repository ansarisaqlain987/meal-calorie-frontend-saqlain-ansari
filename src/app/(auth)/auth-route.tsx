"use client";

import { useToken } from "@/context/token-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading } = useToken();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
