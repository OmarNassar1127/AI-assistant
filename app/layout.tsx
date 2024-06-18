import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
import RootLayout from "./rootLayout";
import { AuthProvider } from "./context/AuthContext";

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <RootLayout>
            {assistantId ? children : <Warnings />}
            {/* <img className="logo" src="/omar.png" alt="OpenAI Logo" /> */}
          </RootLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
