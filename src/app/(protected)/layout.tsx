import { Container } from "@/components/container";
import ProtectedRoute from "./protected-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <Container>{children}</Container>
    </ProtectedRoute>
  );
}
