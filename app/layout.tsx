import { Inter } from "next/font/google";
import "./globals.css";
import Warnings from "./components/warnings";
import { assistantId } from "./assistant-config";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your AI assistant",
  description: "Your AI that will help you achieve anything!",
  icons: {
    icon: "/omar.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {assistantId ? children : <Warnings />}
        <img className="logo" src="/omar.png" alt="OpenAI Logo" />
      </body>
    </html>
  );
}
