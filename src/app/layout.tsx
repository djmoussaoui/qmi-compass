import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QMI Compass | بوصلة التعليم القرآني",
  description: "QMI Compass helps educators transform Qur'an-inspired educational principles and moral values into practical learning situations. تساعد بوصلة QMI المعلمين على تحويل المبادئ التربوية والقيم المستلهمة من القرآن إلى مواقف تعليمية عملية.",
  keywords: ["QMI", "Qur'an", "Education", "Moral Values", "Character Education", "القرآن", "التعليم", "القيم", "بوصلة"],
  authors: [{ name: "QMI Compass Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}