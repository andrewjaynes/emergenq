"use client";

import { useState } from "react";

// FULL LIST OF LANGUAGES
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
  "Punjabi",
  "German",
  "Javanese",
  "Wu Chinese",
  "Korean",
  "French",
  "Turkish",
  "Vietnamese",
  "Urdu",
  "Italian",
  "Persian",
  "Polish",
  "Ukrainian",
  "Dutch",
  "Thai",
  "Gujarati",
  "Tamil",
  "Yoruba",
  "Hausa",
  "Swahili",
  "Amharic",
  "Telugu",
  "Marathi",
  "Cantonese",
  "Tagalog",
  "Romanian",
  "Serbian",
  "Czech",
  "Greek",
  "Hebrew",
  "Somali",
  "Nepali",
  "Burmese",
  "Malay",
  "Indonesian",
  "Zulu",
  "Afrikaans",
  "Armenian",
  "Albanian",
];

export default function CheckInPage() {
  const [submitted, setSubmitted] = useState(false);
  const [position, setPosition] = useState<number | null>(null);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/check-in", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setSubmitted(true);
    setPosition(json.queuePosition);
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
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Patient Check-In
      </h1>

      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Name:
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
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Symptoms:
        </label>
        <textarea
          name="symptoms"
          required
          placeholder="Describe your symptoms"
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
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Medical History:
        </label>
        <textarea
          name="history"
          placeholder="List any relevant medical history"
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
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Preferred Language:
        </label>
        <select
          name="language"
          defaultValue="English"
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Submit
        </button>
      </form>

      {/* SUCCESS MESSAGE */}
      {submitted && (
        <p
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#e8ffe8",
            border: "1px solid #9fdb9f",
            color: "#1a7f1a",
            borderRadius: "6px",
            fontSize: "1rem",
          }}
        >
          ✔️ Checked in! Your position in the queue is{" "}
          <strong>#{position}</strong>.
        </p>
      )}
    </div>
  );
}
