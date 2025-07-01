"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const r = useRouter();

  const submit = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const d = await res.json();
      localStorage.setItem("admin_token", d.token);
      r.push("/admin/dashboard");
    } else setErr("Invalid");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[300px] flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="border px-2 py-1 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={submit}
          className="bg-black text-white px-2 py-1 rounded"
        >
          Login
        </button>
        {err && <div className="text-red-500 text-sm">{err}</div>}
      </div>
    </div>
  );
}
