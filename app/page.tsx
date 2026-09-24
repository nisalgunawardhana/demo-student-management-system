"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Student } from "@/lib/students";

type FormState = {
  name: string;
  email: string;
  course: string;
  age: string;
};

const emptyForm: FormState = { name: "", email: "", course: "", age: "" };

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadStudents() {
    setLoading(true);
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load on mount
    loadStudents();
  }, []);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function startEdit(student: Student) {
    setEditingId(student.id);
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
      age: String(student.age),
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const url = editingId ? `/api/students/${editingId}` : "/api/students";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      return;
    }

    cancelEdit();
    await loadStudents();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this student?")) return;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    await loadStudents();
  }

  return (
    <div className="max-w-3xl mx-auto w-full p-6 flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold">Student Management</h1>
        <p className="text-sm text-gray-500">
          Demo CRUD app — data is stored in data.json
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-gray-200 rounded-lg p-4"
      >
        <h2 className="font-medium">
          {editingId ? "Edit Student" : "Add Student"}
        </h2>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            Name
            <input
              required
              className="border border-gray-300 rounded px-3 py-2"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Email
            <input
              required
              type="email"
              className="border border-gray-300 rounded px-3 py-2"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Course
            <input
              required
              className="border border-gray-300 rounded px-3 py-2"
              value={form.course}
              onChange={(e) => handleChange("course", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Age
            <input
              required
              type="number"
              min={1}
              className="border border-gray-300 rounded px-3 py-2"
              value={form.age}
              onChange={(e) => handleChange("age", e.target.value)}
            />
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-black text-white rounded px-4 py-2 text-sm"
          >
            {editingId ? "Update Student" : "Add Student"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="border border-gray-300 rounded px-4 py-2 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="flex flex-col gap-3">
        <h2 className="font-medium">Students</h2>

        {loading && <p className="text-sm text-gray-500">Loading...</p>}

        {!loading && students.length === 0 && (
          <p className="text-sm text-gray-500">No students yet.</p>
        )}

        {!loading && students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-gray-200">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Course</th>
                  <th className="py-2 pr-4">Age</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100">
                    <td className="py-2 pr-4">{student.name}</td>
                    <td className="py-2 pr-4">{student.email}</td>
                    <td className="py-2 pr-4">{student.course}</td>
                    <td className="py-2 pr-4">{student.age}</td>
                    <td className="py-2 pr-4 flex gap-2">
                      <button
                        onClick={() => startEdit(student)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
