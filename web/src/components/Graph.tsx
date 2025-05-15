import ForceGraph2D, { LinkObject, NodeObject } from "react-force-graph-2d";

interface Node extends NodeObject {
  id: string;
  count: number;
}
interface Link extends LinkObject {
  source: string;
  target: string;
  count: number;
}

export function Graph({ data }: { data: { nodes: Node[]; links: Link[] } }) {
  return (
    <ForceGraph2D
      graphData={data}
      nodeRelSize={4}
      nodeColor={() => "#60a5fa"}
      nodeLabel={(n) => `${(n as Node).id} (${(n as Node).count})`}
      linkWidth={(l) => Math.log2((l as Link).count) + 1}
      linkDirectionalParticles={1}
      linkDirectionalParticleSpeed={0.006}
    />
  );
}