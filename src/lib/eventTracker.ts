import localforage from "localforage";
import { syncNow } from "./syncManager";

let start = 0;

export function trackPage() {
  start = Date.now();
  console.log("📍 trackPage called");
  window.addEventListener("beforeunload", save);
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") save();
  });
}

function save() {
  const user_Id = getUser();
  const session_Id = getSession();
  const duration = Date.now() - start;

  const ev = {
    type: "pageview",
    page_Name: window.location.pathname,
    user_Id,
    session_Id,
    duration,
    timestamp: new Date(),
  };

  console.log("🔁 Saving event:", ev); // ADD THIS

  localforage.getItem("offline_events").then((v) => {
    const arr = Array.isArray(v) ? v : [];
    arr.push(ev);
    localforage.setItem("offline_events", arr).then(() => {
      if (navigator.onLine) {
        console.log(" Online, syncing now...");
        syncNow();
      }
    });
  });
}

function getUser() {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("user_id", id);
  }
  return id;
}

function getSession() {
  let id = sessionStorage.getItem("session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("session_id", id);
  }
  return id;
}
