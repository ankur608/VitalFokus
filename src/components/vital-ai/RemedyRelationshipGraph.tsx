"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  RemedyGraphNode, 
  RemedyGraphLink, 
  GRAPH_NODES, 
  GRAPH_LINKS, 
  RelationType 
} from "@/lib/remedyGraphData";
import { 
  Network, 
  Search, 
  Filter, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Info,
  Maximize2,
  RefreshCw,
  ExternalLink
} from "lucide-react";

interface RemedyRelationshipGraphProps {
  onOpenRemedyMM?: (remedyId: string) => void;
  onSelectRemedy?: (remedyId: string) => void;
}

export const RemedyRelationshipGraph: React.FC<RemedyRelationshipGraphProps> = ({
  onOpenRemedyMM,
  onSelectRemedy
}) => {
  const [selectedRelationType, setSelectedRelationType] = useState<RelationType | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<RemedyGraphNode | null>(GRAPH_NODES[0]); // Arsenicum
  const [hoveredLink, setHoveredLink] = useState<RemedyGraphLink | null>(null);

  const [nodes, setNodes] = useState<RemedyGraphNode[]>([]);
  const [links, setLinks] = useState<RemedyGraphLink[]>([]);

  // Simple deterministic circular / force layout positioning
  useEffect(() => {
    const width = 760;
    const height = 520;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 210;

    const positionedNodes = GRAPH_NODES.map((node, idx) => {
      const angle = (idx / GRAPH_NODES.length) * 2 * Math.PI;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle) + (Math.sin(idx * 3) * 25),
        y: centerY + radius * Math.sin(angle) + (Math.cos(idx * 2) * 25)
      };
    });

    setNodes(positionedNodes);
    setLinks(GRAPH_LINKS);
  }, []);

  // Filter links
  const filteredLinks = links.filter((l) => {
    if (selectedRelationType !== "All" && l.type !== selectedRelationType) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const srcNode = nodes.find(n => n.id === l.source);
      const tgtNode = nodes.find(n => n.id === l.target);
      return (
        srcNode?.name.toLowerCase().includes(q) ||
        tgtNode?.name.toLowerCase().includes(q) ||
        l.notes.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Related links for selected node
  const nodeLinks = links.filter(
    (l) => l.source === selectedNode?.id || l.target === selectedNode?.id
  );

  const getKingdomColor = (kingdom: string) => {
    switch (kingdom) {
      case "Plant": return "from-emerald-500 to-teal-600 border-emerald-400";
      case "Mineral": return "from-teal-500 to-indigo-600 border-teal-400";
      case "Animal": return "from-indigo-500 to-purple-600 border-indigo-400";
      default: return "from-amber-500 to-orange-600 border-amber-400";
    }
  };

  const getLinkColor = (type: RelationType) => {
    switch (type) {
      case "AcuteChronic": return "#06B6D4"; // Cyan
      case "Complementary": return "#10B981"; // Emerald
      case "Antidote": return "#F59E0B"; // Amber
      case "Inimical": return "#F43F5E"; // Rose
    }
  };

  return (
    <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 backdrop-blur-md shadow-2xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Network className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-100">Remedy Relationship & Family Graph</h2>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Acute-Chronic Trios • Antidotes • Complementaries
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Interactive clinical relationship network mapping complementary pairings, acute-to-chronic evolution chains, and antidotes.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-56">
            <Search className="w-4 h-4 text-slate-600 dark:text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remedy link..."
              className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Relation Type Toggle Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedRelationType("All")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
            selectedRelationType === "All"
              ? "bg-slate-700 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-800"
          }`}
        >
          All Relationships ({links.length})
        </button>

        <button
          onClick={() => setSelectedRelationType("AcuteChronic")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            selectedRelationType === "AcuteChronic"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-800"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          Acute-to-Chronic Chains (Trios)
        </button>

        <button
          onClick={() => setSelectedRelationType("Complementary")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            selectedRelationType === "Complementary"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-800"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Complementary Pairs
        </button>

        <button
          onClick={() => setSelectedRelationType("Antidote")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            selectedRelationType === "Antidote"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-800"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          Antidotes
        </button>

        <button
          onClick={() => setSelectedRelationType("Inimical")}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            selectedRelationType === "Inimical"
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-800"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          Inimical (Incompatible)
        </button>
      </div>

      {/* Main Grid: Interactive Canvas/SVG Graph (8 cols) + Selected Node Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Canvas Container (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 relative overflow-hidden flex items-center justify-center min-h-[500px]">
          <svg className="w-full h-[500px] select-none" viewBox="0 0 760 520">
            {/* Draw Links */}
            {filteredLinks.map((link, idx) => {
              const src = nodes.find(n => n.id === link.source);
              const tgt = nodes.find(n => n.id === link.target);
              if (!src || !tgt || src.x === undefined || tgt.x === undefined) return null;

              const isHighlighted =
                selectedNode && (link.source === selectedNode.id || link.target === selectedNode.id);

              return (
                <g key={idx} className="cursor-pointer group">
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke={getLinkColor(link.type)}
                    strokeWidth={isHighlighted ? 3 : 1.5}
                    strokeDasharray={link.type === "Complementary" ? "4,4" : undefined}
                    opacity={isHighlighted ? 0.95 : 0.4}
                    className="transition-all"
                  />
                  {/* Invisible wider hit area for hover tooltip */}
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke="transparent"
                    strokeWidth={14}
                    onMouseEnter={() => setHoveredLink(link)}
                    onMouseLeave={() => setHoveredLink(null)}
                  />
                </g>
              );
            })}

            {/* Draw Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              if (node.x === undefined || node.y === undefined) return null;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    r={isSelected ? 22 : 17}
                    className={`transition-all duration-300 ${
                      isSelected
                        ? "fill-teal-500 stroke-white stroke-2 shadow-lg"
                        : "fill-slate-800 stroke-slate-600 hover:fill-teal-600 hover:stroke-teal-400 stroke-1"
                    }`}
                  />
                  <text
                    textAnchor="middle"
                    dy="4"
                    className="text-[10px] font-bold font-mono fill-white pointer-events-none select-none"
                  >
                    {node.abbr.slice(0, 4)}
                  </text>
                  <text
                    textAnchor="middle"
                    dy="28"
                    className={`text-[9px] font-medium pointer-events-none transition-all ${
                      isSelected ? "fill-teal-300 font-bold" : "fill-slate-400 group-hover:fill-slate-200"
                    }`}
                  >
                    {node.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Hover Tooltip Overlay */}
          {hoveredLink && (
            <div className="absolute top-4 left-4 max-w-sm p-3 bg-slate-900/95 border border-slate-700 rounded-xl shadow-xl text-xs space-y-1 animate-fade-in pointer-events-none">
              <span className="font-bold text-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {hoveredLink.type} Link
              </span>
              <p className="text-slate-800 dark:text-slate-200">{hoveredLink.notes}</p>
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-slate-900/90 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-[10px] text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1 font-semibold">
              <span className="w-2.5 h-0.5 bg-cyan-400" /> Acute-Chronic Trio
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <span className="w-2.5 h-0.5 border-b border-dashed border-emerald-400" /> Complementary
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <span className="w-2.5 h-0.5 bg-amber-400" /> Antidote
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <span className="w-2.5 h-0.5 bg-rose-400" /> Inimical
            </span>
          </div>
        </div>

        {/* Selected Node Inspector (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4">
          {selectedNode ? (
            <>
              <div className="border-b border-slate-700 pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-100">{selectedNode.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-700 dark:text-slate-300">
                    #{selectedNode.remedyNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium">
                    {selectedNode.kingdom}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">{selectedNode.thermalState}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-600 dark:text-slate-400">{selectedNode.miasm} Miasm</span>
                </div>
              </div>

              {/* Relationship Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-400" />
                  Clinical Relationships ({nodeLinks.length})
                </h4>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                  {nodeLinks.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">No direct relationship links mapped for this remedy yet.</p>
                  ) : (
                    nodeLinks.map((link, idx) => {
                      const isSource = link.source === selectedNode.id;
                      const otherId = isSource ? link.target : link.source;
                      const otherNode = nodes.find(n => n.id === otherId);

                      return (
                        <div
                          key={idx}
                          className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/80 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center gap-1" style={{ color: getLinkColor(link.type) }}>
                              {link.type}
                            </span>
                            <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                              {otherNode?.name} ({otherNode?.abbr})
                            </span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">{link.notes}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {(onOpenRemedyMM || onSelectRemedy) && (
                <button
                  onClick={() => (onOpenRemedyMM || onSelectRemedy)?.(selectedNode.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Full {selectedNode.name} Materia Medica
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-slate-500 text-xs">
              Click any remedy node in the graph to inspect clinical relationships.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
