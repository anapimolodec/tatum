"use client";

import { useEffect, useState } from "react";
import SideBar from "@/components/Dashboard/SideBar";
import Header from "@/components/Dashboard/Header";
import { userStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import { Spinner } from "@radix-ui/themes";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const logout = userStore((state) => state.logout);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !user) {
      logout();
      router.replace("/");
    }
  }, [isHydrated, user, logout, router]);

  if (!isHydrated || !user) {
    return (
      <div className="flex min-h-screen h-full justify-center items-center">
        <Spinner className="h-16 w-16" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-6">
        <Header />
        {children}
      </div>
    </div>
  );
}
