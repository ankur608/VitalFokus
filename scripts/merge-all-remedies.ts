import fs from "fs";
import path from "path";
import { remediesData as original40 } from "../prisma/remediesData";

const additionalPath = path.join(__dirname, "remedies_148.json");
const additional148 = JSON.parse(fs.readFileSync(additionalPath, "utf8"));

// Assign remedy numbers 1 to 40
const numbered40 = original40.map((r, idx) => ({
  remedyNumber: idx + 1,
  ...r
}));

// Assign remedy numbers 41 to 188
const numbered148 = additional148.map((r: any, idx: number) => ({
  remedyNumber: 41 + idx,
  ...r
}));

const all188 = [...numbered40, ...numbered148];

console.log(`Total assembled remedies: ${all188.length}`);

const fileContent = `export interface RemedySeed {
  remedyNumber: number;
  name: string;
  abbreviation: string;
  commonName: string;
  kingdom: string;
  miasm: string;
  thermalState: string;
  isPolycrest: boolean;
  shortDescription: string;
  mindKeynotes: string;
  generalsKeynotes: string;
  modalitiesKeynotes: string;
  complementary: string;
  antidotes: string;
  followsWell: string;
  inimical: string;
  materiaMedica: {
    section: string;
    content: string;
  }[];
}

export const remediesData: RemedySeed[] = ${JSON.stringify(all188, null, 2)};
`;

const outputPath = path.join(__dirname, "../prisma/remediesData.ts");
fs.writeFileSync(outputPath, fileContent, "utf8");

console.log(`Successfully generated ${all188.length} numbered remedies in ${outputPath}!`);
