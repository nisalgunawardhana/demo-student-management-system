import { NextRequest, NextResponse } from "next/server";
import { deleteStudent, updateStudent } from "@/lib/students";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { name, email, course, age } = body;

  if (!name || !email || !course || !age) {
    return NextResponse.json(
      { error: "name, email, course, and age are required" },
      { status: 400 }
    );
  }

  const student = await updateStudent(id, {
    name,
    email,
    course,
    age: Number(age),
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const success = await deleteStudent(id);

  if (!success) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
