import { Inter } from "next/font/google";
import { assistantId } from "./assistant-config";
import Warnings from "./components/warnings";
import { AuthProvider } from "./context/AuthContext";
import { Providers } from "./context/Providers";
import RootLayout from "./rootLayout";

import "./../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your AI assistant",
  description: "Your AI that will help you achieve anything!",
  icons: {
    icon: "/omar.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <RootLayout>
              {assistantId ? children : <Warnings />}
              {/* <img className="logo" src="/omar.png" alt="OpenAI Logo" /> */}
            </RootLayout>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
