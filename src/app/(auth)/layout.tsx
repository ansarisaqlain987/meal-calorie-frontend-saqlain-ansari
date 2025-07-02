import AuthRoute from "./auth-route";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthRoute>{children}</AuthRoute>;
}
