"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./homePageComp/Header";
import Footer from "./homePageComp/Footer";


type Props = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: Props) {
  const pathname = usePathname();
  const hideLayout = pathname?.startsWith("/dashboard"); // hide for dashboard routes

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
