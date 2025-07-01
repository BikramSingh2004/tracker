"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const r = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) return r.push("/login");

    fetch("/api/verify", {
      headers: { Authorization: `Bearer ${t}` },
    }).then((res) => {
      if (!res.ok) return r.push("/login");
      setOk(true);
    });
  }, []);

  if (!ok) return null;

  return <>{children}</>;
}
