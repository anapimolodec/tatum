import { NextResponse } from "next/server";
import users from "@/data/user_list.json";
import tasks from "@/data/task_list.json";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = users.find((u) => u.userEmail === email);

    if (user) {
      const userSession = {
        userName: user.userName,
        userEmail: user.userEmail,
        userRole: user.userRole,
        lastLoggedInAt: new Date().toISOString(),
      };

      return NextResponse.json({
        user: userSession,
        users: users.map(({ password, ...user }) => user),
        tasks: tasks,
      });
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
