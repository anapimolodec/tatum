import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "data", "user_list.json");
    const data = await fs.readFile(dataPath, "utf8");
    const users = JSON.parse(data);

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
