import { NextRequest, NextResponse } from "next/server";
import { 
  CLASSIC_MM_DATABASE, 
  CLASSIC_AUTHORS, 
  MMAuthor 
} from "@/lib/classicMMLibrary";
import { parseClinicalQuery } from "@/lib/searchEngine";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";
    const authorFilter = searchParams.get("author")?.trim()?.toLowerCase();
    const sectionFilter = searchParams.get("section")?.trim();

    if (!query) {
      return NextResponse.json({
        total: 0,
        query: "",
        results: []
      });
    }

    const parsed = parseClinicalQuery(query);
    // Collect all search terms and their spelling variants
    const allSearchTerms: string[] = [];
    parsed.expandedTerms.forEach((variants) => {
      variants.forEach((v) => allSearchTerms.push(v.toLowerCase()));
    });
    if (parsed.cleanTextQuery) {
      allSearchTerms.push(parsed.cleanTextQuery.toLowerCase());
    }
    const uniqueTerms = Array.from(new Set(allSearchTerms.filter((t) => t.length > 2)));

    // Fetch db remedy IDs to correlate with CLASSIC_MM_DATABASE entries
    const dbRemedies = await prisma.remedy.findMany({
      select: { id: true, name: true, abbreviation: true, kingdom: true }
    });

    const remedyMapByAbbr = new Map<string, { id: string; name: string; kingdom: string }>();
    dbRemedies.forEach((r) => {
      const cleanAbbr = r.abbreviation.toLowerCase().replace(/\.$/, "");
      remedyMapByAbbr.set(cleanAbbr, { id: r.id, name: r.name, kingdom: r.kingdom });
      remedyMapByAbbr.set(r.name.toLowerCase(), { id: r.id, name: r.name, kingdom: r.kingdom });
    });

    const results: Array<{
      remedyId: string;
      remedyName: string;
      abbreviation: string;
      kingdom: string;
      author: MMAuthor;
      authorName: string;
      bookTitle: string;
      badgeColor: string;
      matchedSection: string;
      snippet: string;
      matchScore: number;
    }> = [];

    for (const entry of Object.values(CLASSIC_MM_DATABASE)) {
      const dbInfo = remedyMapByAbbr.get(entry.abbreviation.toLowerCase().replace(/\.$/, "")) ||
                     remedyMapByAbbr.get(entry.remedyName.toLowerCase()) || {
                       id: entry.remedyId,
                       name: entry.remedyName,
                       kingdom: "Mineral"
                     };

      for (const [authorId, textObj] of Object.entries(entry.texts)) {
        if (authorFilter && authorFilter !== "all" && authorFilter !== authorId) {
          continue;
        }

        const authorMeta = CLASSIC_AUTHORS[authorId as MMAuthor] || {
          name: authorId,
          bookTitle: textObj.authorTitle,
          badgeColor: "bg-slate-500/20 text-slate-300 border-slate-500/30"
        };

        const sections: Array<[string, string]> = [
          ["Guiding Keynotes", textObj.guidingAffinity],
          ["Mind & Disposition", textObj.mind],
          ["Head & Neurological", textObj.head],
          ["Gastrointestinal & Abdomen", textObj.gastrointestinal],
          ["Modalities (< & >)", textObj.modalities],
          ["Clinical Applications", textObj.clinicalIndications],
          ["Remedy Relationships", textObj.relationships]
        ];

        for (const [secName, text] of sections) {
          if (sectionFilter && sectionFilter !== "All" && !secName.toLowerCase().includes(sectionFilter.toLowerCase())) {
            continue;
          }

          const lowerText = text.toLowerCase();
          let matchCount = 0;
          let firstMatchIndex = -1;
          let matchedTerm = "";

          for (const term of uniqueTerms) {
            const idx = lowerText.indexOf(term);
            if (idx !== -1) {
              matchCount++;
              if (firstMatchIndex === -1 || idx < firstMatchIndex) {
                firstMatchIndex = idx;
                matchedTerm = term;
              }
            }
          }

          if (matchCount > 0 && firstMatchIndex !== -1) {
            const start = Math.max(0, firstMatchIndex - 50);
            const end = Math.min(text.length, firstMatchIndex + matchedTerm.length + 90);
            let snippet = text.slice(start, end).trim();
            if (start > 0) snippet = "..." + snippet;
            if (end < text.length) snippet = snippet + "...";

            results.push({
              remedyId: dbInfo.id,
              remedyName: entry.remedyName,
              abbreviation: entry.abbreviation,
              kingdom: dbInfo.kingdom,
              author: authorId as MMAuthor,
              authorName: authorMeta.name,
              bookTitle: authorMeta.bookTitle,
              badgeColor: authorMeta.badgeColor,
              matchedSection: secName,
              snippet,
              matchScore: matchCount * 10 - (firstMatchIndex > 200 ? 5 : 0)
            });
          }
        }
      }
    }

    // Sort by match relevance
    results.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      query,
      parsedQuery: parsed,
      total: results.length,
      results: results.slice(0, 100)
    });
  } catch (error: any) {
    console.error("Error searching Materia Medica:", error);
    return NextResponse.json(
      { error: "Failed to search Materia Medica", details: error.message },
      { status: 500 }
    );
  }
}
