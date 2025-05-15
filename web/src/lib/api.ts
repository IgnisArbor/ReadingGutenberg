export interface GraphData {
  nodes: { id: string; count: number }[];
  links: { source: string; target: string; count: number }[];
}

export async function analyse(bookId: number): Promise<GraphData> {
  const url =
    `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/analyze/${bookId}`;
  const r = await fetch(url, { method: "POST" });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}