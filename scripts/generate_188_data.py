# encoding: utf-8
import re
import os
import json

base_dir = os.path.dirname(os.path.abspath(__file__))
remedies_file = os.path.join(base_dir, "../prisma/remediesData.ts")

# 1. Parse existing 40 remedies from remediesData.ts
with open(remedies_file, "r", encoding="utf-8") as f:
    raw_content = f.read()

# Match each object { name: ... materiaMedica: [ ... ] }
# We can extract the raw text between `export const remediesData: RemedySeed[] = [` and the ending `];`
match = re.search(r"export const remediesData:\s*RemedySeed\[\]\s*=\s*\[(.*?)\];", raw_content, re.DOTALL)
if not match:
    print("Could not find remediesData array in file!")
    exit(1)

print("Found original remediesData block")
