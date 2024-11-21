import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  console.log("\n=== API Route: /api/tasks ===");

  try {
    const dataPath = path.join(process.cwd(), "data", "task_list.json");
    console.log("Looking for file at:", dataPath);

    const data = await fs.readFile(dataPath, "utf8");
    console.log("File contents loaded");

    const tasks = JSON.parse(data);
    console.log(`Successfully parsed ${tasks.length} tasks`);

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error in /api/tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
