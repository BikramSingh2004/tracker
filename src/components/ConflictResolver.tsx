"use client";
import { useState } from "react";

type Conflict = {
  page: string;
  localDuration: number;
  serverDuration: number;
};

export default function ConflictResolver() {
  const [conflicts, setConflicts] = useState<Conflict[]>([
    {
      page: "/one",
      localDuration: 4500,
      serverDuration: 3200,
    },
    {
      page: "/two",
      localDuration: 2000,
      serverDuration: 2300,
    },
  ]);

  const resolve = (page: string, keep: "local" | "server") => {
    setConflicts((prev) => prev.filter((c) => c.page !== page));
    // optionally call API to persist resolution
    console.log(`Resolved ${page} with ${keep} version`);
  };

  if (!conflicts.length) return null;

  return (
    <div className="border p-4 mt-6 rounded shadow text-sm bg-yellow-50">
      <h2 className="text-base font-semibold mb-2">
        ⚠️ Data Conflicts Detected
      </h2>
      {conflicts.map((c) => (
        <div key={c.page} className="mb-2">
          <div>
            Page: <b>{c.page}</b>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => resolve(c.page, "local")}
              className="bg-green-600 text-white px-2 py-1 rounded text-xs"
            >
              Keep Local ({c.localDuration}ms)
            </button>
            <button
              onClick={() => resolve(c.page, "server")}
              className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
            >
              Keep Server ({c.serverDuration}ms)
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
