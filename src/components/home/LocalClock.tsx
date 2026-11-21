// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
"use client";

import { useEffect, useState } from "react";

// shortcut: time zone is fixed to Dhaka; add a timezone field to the profile if the owner moves
const fmt = () =>
  new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" });

/** ", 22:14 local time" — rendered client-side only to avoid a hydration mismatch. */
export function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);

  return time ? <>, {time} local time</> : null;
}
