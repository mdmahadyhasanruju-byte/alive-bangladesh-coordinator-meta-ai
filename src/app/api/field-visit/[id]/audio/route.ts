import { fieldVisitStore } from '@/db/demo-store';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const audio = fieldVisitStore.get(id)?.audio;
  if (!audio) return new Response('Audio not found in this server session', { status: 404 });
  return new Response(new Uint8Array(audio.data), {
    headers: {
      'Content-Type': audio.mime,
      'Content-Length': String(audio.data.byteLength),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
