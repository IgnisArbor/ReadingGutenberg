// src/App.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyse } from "./lib/api.ts";
import { Graph } from "./components/Graph.tsx";

export default function App() {
  const [bookId, setBookId] = useState<number>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["graph", bookId],
    enabled: !!bookId,
    queryFn: () => analyse(bookId!),
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Gutenberg Character Graph</h1>

      <input
        placeholder="Enter Gutenberg ID (e.g., 1342)"
        className="px-3 py-2 rounded bg-gray-800 w-60"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const id = Number((e.target as HTMLInputElement).value.trim());
            if (id) setBookId(id);
          }
        }}
      />
      {isLoading && <span className="ml-3 animate-pulse">Analysing…</span>}

      {error && (
        <p className="mt-4 text-red-400">
          {(error as Error).message || "Something went wrong"}
        </p>
      )}

      {data && (
        <div className="mt-8 h-[700px] border rounded-xl">
          <Graph data={data} />
        </div>
      )}
    </div>
  );
}