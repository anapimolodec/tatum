import { NextResponse } from "next/server";
import users from "@/data/user_list.json";
import tasks from "@/data/task_list.json";
import { ROLES } from "@/lib/constants/types";

export async function POST(request) {
  try {
    const { userRole, userName } = await request.json();

    if (!userRole || !userName) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let filteredTasks;
    switch (userRole) {
      case ROLES.ADMIN:
      case ROLES.PRIME:
        filteredTasks = tasks;
        break;
      case ROLES.REGULAR:
        filteredTasks = tasks.filter((task) => task.reporter === userName);
        break;
      case ROLES.VIEWER:
        filteredTasks = tasks.filter((task) => task.assignee === userName);
        break;
      default:
        filteredTasks = [];
    }

    let filteredUsers;
    switch (userRole) {
      case ROLES.ADMIN:
      case ROLES.PRIME:
        filteredUsers = users;
        break;
      case ROLES.REGULAR:
        filteredUsers = users.filter((u) => u.userName === userName);
        break;
      default:
        filteredUsers = [];
    }
    return NextResponse.json({
      users: filteredUsers,
      tasks: filteredTasks,
    });
  } catch (error) {
    console.log("Fetch error:", error);
    return NextResponse.json(
      { error: "An error occurred during fetching data" },
      { status: 500 }
    );
  }
}
