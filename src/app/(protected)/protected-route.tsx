// components/LoginButton.tsx
"use client";

import { useToken } from "@/context/token-context";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = useToken();
  const router = useRouter();

  if (!isAuthenticated()) {
    router.replace("/sign-in");
    return;
  }

  return <>{children}</>;
}
