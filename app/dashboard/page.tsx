"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch queue every 2 seconds (realtime will come in the next step)
  async function fetchQueue() {
    try {
      const res = await fetch("/api/check-in");
      const data = await res.json();
      setQueue(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load queue:", err);
    }
  }

  useEffect(() => {
    fetchQueue(); // load immediately
    const interval = setInterval(fetchQueue, 2000); // refresh every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        EmergenQ – Live Queue Dashboard
      </h1>

      <p style={{ marginBottom: "1.5rem", color: "#555" }}>
        (This screen will be shown to judges. It updates as patients check in.)
      </p>

      {loading && <p>Loading queue...</p>}

      {!loading && queue.length === 0 && (
        <p style={{ fontSize: "1.2rem", color: "#777" }}>
          No patients checked in yet.
        </p>
      )}

      {queue.length > 0 && (
        <table
          style={{
            width: "100%",
            background: "white",
            borderRadius: "10px",
            border: "1px solid #ddd",
            borderCollapse: "collapse",
            overflow: "hidden",
          }}
        >
          <thead style={{ background: "#0070f3", color: "white" }}>
            <tr>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>#</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Name</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>
                Symptoms
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>
                History
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>
                Language
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>
                Checked In
              </th>
            </tr>
          </thead>

          <tbody>
            {queue.map((p, index) => (
              <tr
                key={p.id}
                style={{
                  borderTop: "1px solid #eee",
                  background: index % 2 === 0 ? "#fafafa" : "#fff",
                }}
              >
                <td style={{ padding: "0.75rem" }}>{p.position}</td>
                <td style={{ padding: "0.75rem" }}>{p.name}</td>
                <td style={{ padding: "0.75rem" }}>{p.symptoms}</td>
                <td style={{ padding: "0.75rem" }}>{p.history}</td>
                <td style={{ padding: "0.75rem" }}>{p.language}</td>
                <td style={{ padding: "0.75rem" }}>
                  {new Date(p.checkedInAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
