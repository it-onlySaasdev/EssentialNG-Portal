"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current page is dashboard OR admin
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAdminDashboard = pathname?.startsWith('/admin');
  
  // Hide header/footer on BOTH dashboard and admin pages
  const shouldHideHeaderFooter = isDashboard || isAdminDashboard;

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      {children}
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}