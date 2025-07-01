"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const path = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="text-xs text-center text-gray-300 border-t mt-10 bg-gradient-to-b from-black to-gray-800 py-6">
      <div className="flex justify-center gap-4 mb-4">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <button
              className={`px-4 py-1 rounded text-sm ${
                path === link.href
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              {link.label}
            </button>
          </Link>
        ))}
      </div>
      <div className="text-gray-400">
        © {new Date().getFullYear()} Offline Screen Tracker | All rights
        reserved
      </div>
    </div>
  );
}
