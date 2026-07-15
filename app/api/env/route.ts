// Liveness probe for the Docker healthcheck and Caddy upstream checks.
// Deliberately does NOT touch MongoDB/Redis: this answers "is the Node process
// up and serving?", not "are dependencies healthy". Coupling it to the DB would
// let a transient Mongo blip flip the container unhealthy and trigger a
// restart loop.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return Response.json({ status: "ok", body: process.env });
}
