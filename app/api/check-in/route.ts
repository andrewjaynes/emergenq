// app/api/check-in/route.ts

let queue: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  const patient = {
    id: Date.now(),
    ...body,
    checkedInAt: new Date().toISOString(),
    position: queue.length + 1,
  };

  queue.push(patient);

  return Response.json({
    message: "Checked in!",
    queuePosition: patient.position,
  });
}

export async function GET() {
  return Response.json(queue);
}
