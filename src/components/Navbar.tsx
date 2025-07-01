"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const path = usePathname();
  const r = useRouter();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLogged(!!token);
  }, [path]);

  const isActive = (href: string) => path === href;

  const logout = () => {
    localStorage.removeItem("admin_token");
    setLogged(false);
    r.push("/login");
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/form", label: "Form" },
    { href: "/admin/dashboard", label: "Admin" },
  ];

  return (
    <div className="w-full px-4 py-3 border-b border-green-500 bg-blue-800 flex flex-wrap items-center gap-3">
      {links.map((link, i) => (
        <Link href={link.href} key={link.href}>
          <Button
            variant="ghost"
            className={`text-white px-4 py-2 rounded ${
              isActive(link.href) ? "bg-black" : "bg-blue-900"
            } ${i === 0 ? "ml-2" : ""}`}
          >
            {link.label}
          </Button>
        </Link>
      ))}

      {!logged && (
        <Link href="/login" className="ml-auto">
          <Button
            variant="ghost"
            className="bg-yellow-500 text-black px-4 py-2 rounded"
          >
            Login
          </Button>
        </Link>
      )}

      {logged && (
        <Button
          onClick={logout}
          className="bg-black-600 ml-9 text-white px-4 py-2 rounded"
        >
          Logout
        </Button>
      )}
    </div>
  );
}
