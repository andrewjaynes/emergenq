"use client";

import { useState } from "react";

// Shorter but good language list for demo.
// You can expand it again if you like.
const LANGUAGES = [
  "English",
  "Spanish",
  "Chinese (Mandarin)",
  "Hindi",
  "Arabic",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "French",
  "German",
  "Korean",
  "Vietnamese",
  "Italian",
  "Urdu",
  "Turkish",
  "Persian",
  "Swahili",
  "Amharic",
];

export default function CheckInPage() {
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [waitEstimate, setWaitEstimate] = useState<number | null>(null);
  const [severity, setSeverity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/check-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setSubmitted(true);
    setPosition(json.queuePosition);
    setWaitEstimate(json.estWaitMin);
    setSeverity(json.severityLevel);
    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        background: "white",
        borderRadius: "12px",
        border: "1px solid #ddd",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
        EmergenQ – Patient Check-In
      </h1>
      <p style={{ marginBottom: "1.5rem", color: "#555" }}>
        Enter your information to get a real-time estimate of your place in the ER
        queue.
      </p>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          Name
        </label>
        <input
          name="name"
          required
          placeholder="Your full name"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        />

        {/* SYMPTOMS */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          Symptoms
        </label>
        <textarea
          name="symptoms"
          required
          placeholder="Describe what brings you in today..."
          style={{
            width: "100%",
            height: "90px",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        />

        {/* MEDICAL HISTORY */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          Medical History
        </label>
        <textarea
          name="history"
          placeholder="Past conditions, surgeries, allergies..."
          style={{
            width: "100%",
            height: "90px",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        />

        {/* LANGUAGE */}
        <label style={{ display: "block", marginBottom: "0.25rem" }}>
          Preferred Language
        </label>
        <select
          name="language"
          defaultValue="English"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1.5rem",
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: loading ? "#999" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "default" : "pointer",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          {loading ? "Checking you in..." : "Join Queue"}
        </button>
      </form>

      {/* RESULT CARD */}
      {submitted && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #c6e6c6",
            background:
              severity === "high"
                ? "#ffe5e5"
                : severity === "medium"
                ? "#fff6e0"
                : "#e8ffe8",
          }}
        >
          <p style={{ marginBottom: "0.25rem" }}>
            ✅ <strong>You're checked in.</strong>
          </p>
          {position != null && (
            <p>
              You are currently <strong>#{position}</strong> in the queue.
            </p>
          )}
          {waitEstimate != null && (
            <p>
              Estimated wait time:{" "}
              <strong>{waitEstimate} minutes</strong>.
            </p>
          )}
          {severity && (
            <p>
              Severity assessment:{" "}
              <strong>
                {severity === "high"
                  ? "High priority"
                  : severity === "medium"
                  ? "Urgent"
                  : "Non-urgent"}
              </strong>
              .
            </p>
          )}
          <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "#555" }}>
            This estimate updates as new patients arrive and doctors become
            available.
          </p>
        </div>
      )}
    </div>
  );
}
