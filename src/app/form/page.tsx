
"use client";
import { useEffect } from "react";
import { useState } from "react";

import { trackPage } from "@/lib/eventTracker";
export default function Page() {
  useEffect(() => {
    trackPage(); // No need to pass anything
  }, []);

  const [form, setForm] = useState({
    name: "",
    role: "",
    dept: "",
  });

  const change = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const submit = () => {
    alert(`Submitted: ${JSON.stringify(form)}`);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="border-2 border-green-500 p-10 rounded w-[400px] text-white space-y-3">
        <h2 className="text-lg font-semibold">Employee Form</h2>
        <input
          placeholder="Name"
          className="w-full text-black bg-white px-3 py-4 rounded"
          value={form.name}
          onChange={(e) => change("name", e.target.value)}
        />
        <input
          placeholder="Role"
          className="w-full text-black  bg-white px-2 py-4 rounded"
          value={form.role}
          onChange={(e) => change("role", e.target.value)}
        />
        <input
          placeholder="Department"
          className="w-full text-black  bg-white  px-2 py-4 rounded"
          value={form.dept}
          onChange={(e) => change("dept", e.target.value)}
        />
        <button
          onClick={submit}
          className="bg-green-600 px-3 py-3 rounded text-sm"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
