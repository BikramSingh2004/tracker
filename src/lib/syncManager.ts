import localforage from "localforage";

export async function syncNow() {
  const events = (await localforage.getItem("offline_events")) || [];

  console.log("🛰️ Syncing events to backend:", events); // ✅ DEBUG

  if (!Array.isArray(events) || events.length === 0) {
    console.warn("No events to sync or invalid data.");
    return;
  }

  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(events),
    });

    if (!res.ok) throw new Error("Failed to sync events");

    // Clear local cache if synced
    await localforage.removeItem("offline_events");
    console.log("✅ Events synced and cleared");
  } catch (err) {
    console.error("❌ Failed to sync events", err);
  }
}
