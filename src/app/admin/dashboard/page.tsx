"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Result = {
  _id: string;
  count: number;
  avgTime: number;
};

const pageMap: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/form": "Form",
  "/admin/dashboard": "Admin",
};

export default function Page() {
  const [token, setToken] = useState("");
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rawData, setRawData] = useState<Result[]>([]);
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [selectedPage, setSelectedPage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (t) {
      setToken(t);
      setLogged(true);
    } else {
      alert("Login with:\nEmail: admin@example.com\nPassword: 12345");
    }
  }, []);

  useEffect(() => {
    if (logged) fetchData();
  }, [logged]);

  const login = async () => {
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password: pass }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (res.ok) {
      localStorage.setItem("admin_token", json.token);
      setToken(json.token);
      setLogged(true);
    } else {
      setErr(json.error || "Invalid login");
    }
    setLoading(false);
  };

  const fetchData = async () => {
    const params = new URLSearchParams();

    if (selectedPage && selectedPage !== "all") {
      params.append("page_Name", selectedPage);
    }
    if (userId) params.append("user_Id", userId);
    if (sessionId) params.append("session_Id", sessionId);
    if (startDate) {
      const from = new Date(startDate);
      from.setHours(0, 0, 0, 0);
      params.append("start", from.toISOString());
    }
    if (endDate) {
      const to = new Date(endDate);
      to.setHours(23, 59, 59, 999);
      params.append("end", to.toISOString());
    }

    const res = await fetch(`/api/analytics?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    setRawData(result);
  };

  const filteredKeys =
    selectedPage && selectedPage !== "all"
      ? [selectedPage]
      : Object.keys(pageMap);

  const displayData = rawData
    .filter((row) => filteredKeys.includes(row._id))
    .map((row) => ({
      key: row._id,
      label: pageMap[row._id] || row._id,
      count: row.count,
      avgTime: row.avgTime,
    }));

  if (!logged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[340px] shadow-xl border">
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">Admin Login</h2>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button onClick={login} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            {err && <p className="text-sm text-red-500">{err}</p>}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6 shadow-md">
          <CardContent className="py-6 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Filter user activity across pages and sessions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-36"
              />
              <Input
                type="text"
                placeholder="Session ID"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="w-36"
              />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-36"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-36"
              />
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  {Object.entries(pageMap).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={fetchData}>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="px-4 sm:px-6 py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Avg Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      No data available. Try changing filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayData.map((row) => (
                    <TableRow key={row.key}>
                      <TableCell>{row.label}</TableCell>
                      <TableCell>{row.count}</TableCell>
                      <TableCell>{Math.round(row.avgTime)} ms</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
