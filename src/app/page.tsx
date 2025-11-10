'use client';

import { publicEnv } from "@/env/publicEnv";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(publicEnv);
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <div className="px-10"></div>
    </div>
  );
}
