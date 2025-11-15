import { NextResponse } from "next/server";

let queue: any[] = []; // temporary in-memory queue

export async function POST(request: Request) {
  const data = await request.json();

  // Add a timestamp + queue position
  const entry = {
	id: Date.now(), // simple unique ID
	name: data.name,
	symptoms: data.symptoms,
	history: data.history,
	language: data.language,
	checkedInAt: new Date().toISOString(),
	position: queue.length + 1,
  };

  queue.push(entry);

  return NextResponse.json({
	success: true,
	queuePosition: entry.position,
  });
}

// TEMP: allow viewing the queue in the browser
export async function GET() {
  return NextResponse.json(queue);
}
