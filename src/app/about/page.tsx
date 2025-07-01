"use client";

import { useEffect } from "react";
import { trackPage } from "@/lib/eventTracker";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  useEffect(() => {
    trackPage();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">
        About Page is Here
      </h1>

      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-6 text-center text-lg font-medium text-white">
          Wait for{" "}
          <span className="font-bold text-yellow-300">3 seconds... And then move to next page </span>
        </CardContent>
      </Card>
    </div>
  );
}
