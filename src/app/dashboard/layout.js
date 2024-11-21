"use client";

import { useEffect, useState } from "react";
import SideBar from "@/components/Dashboard/SideBar";
import Header from "@/components/Dashboard/Header";
import { userStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import { strings } from "@/lib/constants/strings";

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
    return <p>{strings.something_is_wrong}</p>;
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
