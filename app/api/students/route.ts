import { NextRequest, NextResponse } from "next/server";
import { createStudent, getStudents } from "@/lib/students";

export async function GET() {
  const students = await getStudents();
  return NextResponse.json(students);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, course, age } = body;

  if (!name || !email || !course || !age) {
    return NextResponse.json(
      { error: "name, email, course, and age are required" },
      { status: 400 }
    );
  }

  const student = await createStudent({
    name,
    email,
    course,
    age: Number(age),
  });
  return NextResponse.json(student, { status: 201 });
}
