export default function CheckInPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
        EmergenQ – Patient Check-In
      </h1>

      <p style={{ marginBottom: "1.5rem" }}>
        Please enter your information to join the ER queue.
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Name */}
        <div>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Symptoms */}
        <div>
          <label>Your Symptoms</label>
          <textarea
            placeholder="Describe what brings you in..."
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Language */}
        <div>
          <label>Preferred Language</label>
          <select
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>Chinese</option>
            <option>Arabic</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Join Queue
        </button>
      </form>
    </div>
  );
}
