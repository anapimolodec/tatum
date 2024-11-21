"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userStore } from "@/lib/store/userStore";

export default function DashboardPage() {
  const router = useRouter();
  const user = userStore((state) => state.user);
  useEffect(() => {
    router.push("/dashboard/users");
  }, [router]);

  if (!user) {
    return null;
  }

  return null;
}
