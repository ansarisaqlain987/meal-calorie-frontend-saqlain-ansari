import { TokenProvider } from "@/context/token-context";
import { ThemeProvider } from "./theme.provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TokenProvider>{children}</TokenProvider>
    </ThemeProvider>
  );
}
