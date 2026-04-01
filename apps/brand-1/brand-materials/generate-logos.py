#!/usr/bin/env python3
"""
Generate 8 logo concepts for Oceantech Commercial Diving via DALL-E 3.
Saves images as concept-01.png through concept-08.png and documents prompts.
"""

import base64
import os
import time
from pathlib import Path

from openai import OpenAI

# --- Configuration ---
PROJECT_ROOT = Path("/Users/dannyalmaden/projects/oceantech-commercial")
ENV_PATH = PROJECT_ROOT / ".env"
OUTPUT_DIR = PROJECT_ROOT / "apps" / "brand-1" / "brand-materials" / "logos"
PROMPTS_DOC = PROJECT_ROOT / "apps" / "brand-1" / "brand-materials" / "logo-prompts.md"

# Read OPENAI_API from .env
def load_api_key():
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1]
    raise ValueError("OPENAI_API not found in .env")

API_KEY = load_api_key()
client = OpenAI(api_key=API_KEY)

# --- Logo Prompts ---
PROMPTS = [
    {
        "label": "Prompt 1 (Icon - Abstract O)",
        "prompt": (
            "A minimalist abstract logo icon based on the letter O, representing ocean depth "
            "and descent. Deep teal (#0A4D68) and sunset orange (#E85D04) on white background. "
            "Geometric, clean bold lines, flat vector style, modern, no text, no gradients, no realistic details"
        ),
    },
    {
        "label": "Prompt 2 (Icon - OT Monogram)",
        "prompt": (
            "A modern geometric monogram logo combining the letters O and T into a single unified mark. "
            "Deep teal (#0A4D68) with copper bronze (#B87333) accent. Flat vector, minimalist, clean lines, "
            "on white background, no gradients, no realistic details"
        ),
    },
    {
        "label": "Prompt 3 (Icon - Depth Motif)",
        "prompt": (
            "A minimalist abstract logo icon suggesting downward descent into depth, using concentric "
            "geometric shapes. Deep teal (#0A4D68) with sunset orange (#E85D04) accent. Flat vector style, "
            "bold, modern, simple, on white background, no text, no water waves, no diver silhouette"
        ),
    },
    {
        "label": "Prompt 4 (Emblem - Geometric)",
        "prompt": (
            "A modern emblem logo for a commercial diving company. Abstract geometric form suggesting "
            "precision and depth, enclosed in a clean circular frame. Deep teal (#0A4D68) and charcoal "
            "(#2D3436). Flat vector, minimalist, no anchors, no diver helmets, no waves, on white background"
        ),
    },
    {
        "label": "Prompt 5 (Combination - Left)",
        "prompt": (
            "A combination logo with an abstract geometric icon to the left of the text 'OCEANTECH'. "
            "The icon suggests depth and precision using angular geometric shapes. Deep teal and sunset "
            "orange color palette. Modern, bold sans-serif typography, flat vector, clean, on white background"
        ),
    },
    {
        "label": "Prompt 6 (Combination - Stacked)",
        "prompt": (
            "A stacked combination logo with an abstract geometric icon above the text 'OCEANTECH DIVING'. "
            "The icon is a modern abstract O shape suggesting ocean depth. Deep teal (#0A4D68) main color "
            "with copper bronze (#B87333) accent. Bold geometric sans-serif font, flat vector, minimal, "
            "on white background"
        ),
    },
    {
        "label": "Prompt 7 (Icon - Industrial)",
        "prompt": (
            "A minimalist logo icon that merges concepts of industrial precision and ocean depth. Geometric "
            "abstract form with sharp angles and clean curves. Deep teal (#0A4D68) and sunset orange (#E85D04). "
            "Bold, modern, flat vector, simple shapes, on white background, no realistic details, no anchors, "
            "no helmets"
        ),
    },
    {
        "label": "Prompt 8 (Icon - Heritage Modern)",
        "prompt": (
            "An elegant minimalist logo mark that conveys established heritage and modern capability. "
            "Abstract geometric form inspired by depth and craftsmanship. Copper bronze (#B87333) and "
            "deep teal (#0A4D68). Clean lines, sophisticated, timeless, flat vector, on white background, "
            "no text, no cliches"
        ),
    },
]


def generate_logos():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    results = []

    for i, item in enumerate(PROMPTS, start=1):
        filename = f"concept-{i:02d}.png"
        filepath = OUTPUT_DIR / filename
        label = item["label"]
        prompt = item["prompt"]

        print(f"\n[{i}/8] Generating {label} ...")
        print(f"  Prompt: {prompt[:80]}...")

        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
                quality="standard",
                response_format="b64_json",
                n=1,
            )

            image_data = response.data[0].b64_json
            revised_prompt = response.data[0].revised_prompt

            # Decode and save
            img_bytes = base64.b64decode(image_data)
            with open(filepath, "wb") as f:
                f.write(img_bytes)

            print(f"  Saved: {filepath}")
            print(f"  Revised prompt: {revised_prompt[:100]}...")

            results.append({
                "label": label,
                "filename": filename,
                "original_prompt": prompt,
                "revised_prompt": revised_prompt,
                "status": "success",
            })

        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({
                "label": label,
                "filename": filename,
                "original_prompt": prompt,
                "revised_prompt": None,
                "status": f"error: {e}",
            })

        # Small delay between requests to avoid rate limits
        if i < 8:
            time.sleep(2)

    return results


def write_prompts_doc(results):
    lines = [
        "# Oceantech Commercial Diving - Logo Concept Prompts",
        "",
        "Generated via DALL-E 3 (1024x1024, standard quality, b64_json format).",
        "",
        "---",
        "",
    ]

    for r in results:
        lines.append(f"## {r['label']}")
        lines.append("")
        lines.append(f"**File:** `logos/{r['filename']}`")
        lines.append(f"**Status:** {r['status']}")
        lines.append("")
        lines.append("### Original Prompt")
        lines.append(f"> {r['original_prompt']}")
        lines.append("")
        lines.append("### Revised Prompt (DALL-E 3)")
        if r["revised_prompt"]:
            lines.append(f"> {r['revised_prompt']}")
        else:
            lines.append("> _(not available)_")
        lines.append("")
        lines.append("---")
        lines.append("")

    with open(PROMPTS_DOC, "w") as f:
        f.write("\n".join(lines))

    print(f"\nPrompts documented at: {PROMPTS_DOC}")


if __name__ == "__main__":
    print("=" * 60)
    print("Oceantech Commercial Diving - Logo Generation")
    print("=" * 60)

    results = generate_logos()

    success_count = sum(1 for r in results if r["status"] == "success")
    print(f"\n{'=' * 60}")
    print(f"Generation complete: {success_count}/8 successful")
    print(f"{'=' * 60}")

    write_prompts_doc(results)
    print("Done.")
