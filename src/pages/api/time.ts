export const GET = ({ request }: { request: Request }) => {
  return new Response(JSON.stringify({ time: Date.now() }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store", // Ensure we always get fresh time
    },
  });
};
