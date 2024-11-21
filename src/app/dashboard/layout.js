"use client";

import { useEffect } from "react";
import SideBar from "@/components/Dashboard/SideBar";
import Header from "@/components/Dashboard/Header";
import { userStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const logout = userStore((state) => state.logout);

  useEffect(() => {
    if (!user) {
      logout();
      router.replace("/");
    }
  }, [user, logout, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
