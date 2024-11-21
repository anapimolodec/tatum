"use client";

import { userStore } from "@/lib/store/userStore";
import LoginCard from "@/components/LoginCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const isAuthenticated = userStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gradient-to-tr from-green-100 to-teal-700">
      <LoginCard />
    </div>
  );
}
