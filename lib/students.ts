import { promises as fs } from "fs";
import path from "path";

export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  age: number;
};

const dataFilePath = path.join(process.cwd(), "data.json");

async function readStudents(): Promise<Student[]> {
  try {
    const raw = await fs.readFile(dataFilePath, "utf-8");
    return JSON.parse(raw) as Student[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeStudents(students: Student[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(students, null, 2));
}

export async function getStudents(): Promise<Student[]> {
  return readStudents();
}

export async function getStudent(id: string): Promise<Student | undefined> {
  const students = await readStudents();
  return students.find((s) => s.id === id);
}

export async function createStudent(
  input: Omit<Student, "id">
): Promise<Student> {
  const students = await readStudents();
  const student: Student = { id: crypto.randomUUID(), ...input };
  students.push(student);
  await writeStudents(students);
  return student;
}

export async function updateStudent(
  id: string,
  input: Omit<Student, "id">
): Promise<Student | undefined> {
  const students = await readStudents();
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return undefined;
  const updated: Student = { id, ...input };
  students[index] = updated;
  await writeStudents(students);
  return updated;
}

export async function deleteStudent(id: string): Promise<boolean> {
  const students = await readStudents();
  const next = students.filter((s) => s.id !== id);
  if (next.length === students.length) return false;
  await writeStudents(next);
  return true;
}
