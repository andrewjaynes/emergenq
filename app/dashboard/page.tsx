"use client";

import { useEffect, useState } from "react";

type Patient = {
  id: number;
  name: string;
  symptoms: string;
  history: string;
  language: string;
  severityLevel: "high" | "medium" | "low";
  severityScore: number;
  position: number;
  estWaitMin: number;
  checkedInAt: string;
};

export default function DashboardPage() {
  const [queue, setQueue] = useState<Patient[]>([]);

  async function fetchQueue() {
    const res = await fetch("/api/check-in");
    const json = await res.json();
    setQueue(json);
  }

  useEffect(() => {
    fetchQueue();
    const id = setInterval(fetchQueue, 3000); // refresh every 3s
    return () => clearInterval(id);
  }, []);

  function severityColor(level: string) {
    if (level === "high") return "#ffe5e5";
    if (level === "medium") return "#fff6e0";
    return "#e8ffe8";
  }

  function severityLabel(level: string) {
    if (level === "high") return "HIGH";
    if (level === "medium") return "MEDIUM";
    return "LOW";
  }

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        EmergenQ – Live ER Queue
      </h1>
      <p style={{ marginBottom: "1.5rem", color: "#555" }}>
        This screen is meant to be visible to the doctors in the ER waiting room.
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "0.5rem" }}>Pos</th>
            <th style={{ padding: "0.5rem" }}>Name</th>
            <th style={{ padding: "0.5rem" }}>Symptoms</th>
            <th style={{ padding: "0.5rem" }}>Severity</th>
            <th style={{ padding: "0.5rem" }}>Est. Wait</th>
            <th style={{ padding: "0.5rem" }}>Language</th>
          </tr>
        </thead>
        <tbody>
          {queue.map((p) => (
            <tr
              key={p.id}
              style={{
                background: severityColor(p.severityLevel),
                borderTop: "1px solid #ddd",
              }}
            >
              <td style={{ padding: "0.5rem", fontWeight: 600 }}>
                {p.position}
              </td>
              <td style={{ padding: "0.5rem" }}>{p.name}</td>
              <td style={{ padding: "0.5rem" }}>{p.symptoms}</td>
              <td style={{ padding: "0.5rem", fontWeight: 700 }}>
                {severityLabel(p.severityLevel)}
              </td>
              <td style={{ padding: "0.5rem" }}>
                {p.estWaitMin} min
              </td>
              <td style={{ padding: "0.5rem" }}>{p.language}</td>
            </tr>
          ))}
          {queue.length === 0 && (
            <tr>
              <td
                colSpan={6}
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#777",
                }}
              >
                No patients in queue yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
