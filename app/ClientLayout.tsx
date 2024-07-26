'use client'

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Preloader from "./components/preloader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 1000); // Ensure minimum 1 second display
    };

    handleRouteChange(); // Call on initial load

  }, [pathname, searchParams]); // This effect runs on route changes

  return (
    <>
      {loading && <Preloader />}
      <div className="min-h-screen">
        {children}
      </div>
      <footer className="py-6 text-center text-black-600">
        © 2024 ezPrep AI. All rights reserved.
      </footer>
    </>
  );
}