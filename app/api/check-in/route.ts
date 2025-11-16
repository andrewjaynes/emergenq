// app/api/check-in/route.ts

// In-memory queue for the demo.
// In production you'd use a real database.
let queue: any[] = [];

// Very simple "AI-like" severity scorer based on keywords.
// Later you can swap this for a real LLM or ML model.
function scoreSeverity(symptoms: string = "", history: string = "") {
  const text = (symptoms + " " + history).toLowerCase();

  const HIGH = [
    "chest pain",
    "shortness of breath",
    "difficulty breathing",
    "cant breathe",
    "can't breathe",
    "not breathing",
    "unconscious",
    "seizure",
    "stroke",
    "numbness",
    "weak on one side",
    "severe bleeding",
    "bleeding a lot",
    "overdose",
    "suicidal",
    "suicide",
    "crushing pain",
  ];

  const MED = [
    "fever",
    "vomit",
    "vomiting",
    "diarrhea",
    "dehydrated",
    "dizzy",
    "dizziness",
    "abdominal pain",
    "stomach pain",
    "infection",
    "worsening",
    "moderate pain",
  ];

  let score = 0;

  for (const phrase of HIGH) {
    if (text.includes(phrase)) score += 3;
  }
  for (const phrase of MED) {
    if (text.includes(phrase)) score += 1;
  }

  let level: "high" | "medium" | "low" = "low";
  if (score >= 3) level = "high";
  else if (score >= 1) level = "medium";

  return { level, score };
}

// Rough wait-time estimation in minutes based on position in queue.
// You can tweak the numbers to tell the story you want in your pitch.
function estimateWait(position: number) {
  // e.g. 1st in line ~5 minutes, then +7 minutes per extra person
  return Math.max(1, 5 + (position - 1) * 7);
}

export async function POST(req: Request) {
  const body = await req.json();

  const name = (body.name as string) || "Anonymous";
  const symptoms = (body.symptoms as string) || "";
  const history = (body.history as string) || "";
  const language = (body.language as string) || "English";

  const severity = scoreSeverity(symptoms, history);

  const newEntry = {
    id: Date.now(), // simple unique-ish id
    name,
    symptoms,
    history,
    language,
    severityLevel: severity.level,
    severityScore: severity.score,
    checkedInAt: new Date().toISOString(),
  };

  // Add to queue
  queue.push(newEntry);

  // Sort queue by severityScore (desc), then by arrival time
  queue.sort((a, b) => {
    if (b.severityScore !== a.severityScore) {
      return b.severityScore - a.severityScore;
    }
    return new Date(a.checkedInAt).getTime() - new Date(b.checkedInAt).getTime();
  });

  // Recompute positions + wait estimates
  queue = queue.map((entry, index) => {
    const position = index + 1;
    const estWaitMin = estimateWait(position);
    return { ...entry, position, estWaitMin };
  });

  // Find this patient's updated record
  const myRecord = queue.find((q) => q.id === newEntry.id);

  return Response.json({
    message: "Checked in",
    queuePosition: myRecord?.position ?? null,
    estWaitMin: myRecord?.estWaitMin ?? null,
    severityLevel: myRecord?.severityLevel ?? severity.level,
  });
}

export async function GET() {
  // Return the whole queue (ordered)
  return Response.json(queue);
}
