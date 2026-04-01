#!/usr/bin/env python3
"""
Generate 8 DALL-E 3 logo concepts for Oceantech Commercial Diving (Brand-3: Rugged Authenticity).
Uses only Python stdlib. Reads OPENAI_API from .env file.
"""

import json
import base64
import time
import os
import urllib.request
import urllib.error

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", ".."))
ENV_PATH = os.path.join(PROJECT_ROOT, ".env")
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "logos")

# ---------------------------------------------------------------------------
# Read API key from .env
# ---------------------------------------------------------------------------
def load_api_key(env_path: str) -> str:
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1]
    raise RuntimeError("OPENAI_API not found in .env")

API_KEY = load_api_key(ENV_PATH)

# ---------------------------------------------------------------------------
# Prompts
# ---------------------------------------------------------------------------
PROMPTS = [
    {
        "filename": "concept-01.png",
        "label": "Badge - Round",
        "prompt": (
            "A vintage-style round badge logo for a commercial diving company called "
            "OCEANTECH. Rugged hand-crafted aesthetic, deep green (#1B4332) and warm "
            "cream (#FAF3E8). Weathered texture, rope or circle border detail. Simple "
            "monoline illustration of ocean depth in center. Flat vector, vintage badge "
            "style, on white background"
        ),
    },
    {
        "filename": "concept-02.png",
        "label": "Badge - Rectangular",
        "prompt": (
            "A rugged rectangular badge logo for OCEANTECH COMMERCIAL DIVING with EST. "
            "1980. Deep sea green and rust orange color scheme. Vintage workwear patch "
            "aesthetic, bold condensed type, simple geometric ocean motif. Flat vector, "
            "worn heritage feel, on white background"
        ),
    },
    {
        "filename": "concept-03.png",
        "label": "Wordmark - Rugged",
        "prompt": (
            "A bold rugged wordmark logo for 'OCEANTECH' in a heavy slab-serif or "
            "characterful sans-serif font. Deep green (#1B4332) with subtle weathered "
            "texture. Simple, strong, could be stamped on a gear bag. Flat vector, no "
            "icons, on white background"
        ),
    },
    {
        "filename": "concept-04.png",
        "label": "Icon - Minimal",
        "prompt": (
            "A simple bold icon logo mark of a stylized downward arrow or descent symbol "
            "combined with an O shape. Deep sea green (#1B4332) and rust orange (#C1440E). "
            "Rugged, bold weight, simple, could be embroidered on a work shirt. Flat "
            "vector, minimal, on white background"
        ),
    },
    {
        "filename": "concept-05.png",
        "label": "Combination - Horizontal",
        "prompt": (
            "A horizontal combination logo with a simple bold icon and 'OCEANTECH' in "
            "heavy characterful type. Deep green and rust orange. Rugged outdoor brand "
            "aesthetic like Patagonia. Clean but with character, not corporate. Flat "
            "vector, on white background"
        ),
    },
    {
        "filename": "concept-06.png",
        "label": "Combination - Stacked",
        "prompt": (
            "A stacked logo with a simple bold icon above 'OCEANTECH' in heavy type with "
            "'COMMERCIAL DIVING' smaller below. Deep sea green (#1B4332) main with sand "
            "(#D4A574) and rust (#C1440E) accents. Heritage outdoor brand feel, workwear "
            "aesthetic. Flat vector, on white background"
        ),
    },
    {
        "filename": "concept-07.png",
        "label": "Stamp - Circular",
        "prompt": (
            "A circular rubber stamp style logo for OCEANTECH EST. 1980. Text arranged in "
            "a circle with a simple central motif suggesting ocean depth. Deep green and "
            "cream. Weathered, authentic, hand-stamped feel. Flat vector, vintage, on "
            "white background"
        ),
    },
    {
        "filename": "concept-08.png",
        "label": "Monoline - Illustration",
        "prompt": (
            "A monoline illustration style logo for a diving company. Simple single-weight "
            "line drawing suggesting ocean, depth, and craft enclosed in a rounded shape. "
            "Deep green (#1B4332) lines on white background. Artistic, hand-drawn feel, "
            "minimal, clean monoline style"
        ),
    },
]

# ---------------------------------------------------------------------------
# DALL-E 3 generation helper
# ---------------------------------------------------------------------------
ENDPOINT = "https://api.openai.com/v1/images/generations"


def generate_image(prompt: str) -> bytes:
    """Call DALL-E 3 and return raw PNG bytes (b64_json)."""
    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024",
        "response_format": "b64_json",
    }).encode("utf-8")

    req = urllib.request.Request(
        ENDPOINT,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=120) as resp:
        body = json.loads(resp.read().decode("utf-8"))

    b64_data = body["data"][0]["b64_json"]
    revised_prompt = body["data"][0].get("revised_prompt", "")
    png_bytes = base64.b64decode(b64_data)
    return png_bytes, revised_prompt


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    results = []

    for i, item in enumerate(PROMPTS, start=1):
        label = item["label"]
        filename = item["filename"]
        prompt = item["prompt"]
        out_path = os.path.join(OUTPUT_DIR, filename)

        print(f"[{i}/8] Generating {label} ({filename})...")
        try:
            png_bytes, revised_prompt = generate_image(prompt)
            with open(out_path, "wb") as f:
                f.write(png_bytes)
            size_kb = len(png_bytes) / 1024
            print(f"       Saved {out_path} ({size_kb:.0f} KB)")
            results.append({
                "index": i,
                "label": label,
                "filename": filename,
                "original_prompt": prompt,
                "revised_prompt": revised_prompt,
                "success": True,
            })
        except urllib.error.HTTPError as e:
            error_body = e.read().decode("utf-8", errors="replace")
            print(f"       ERROR (HTTP {e.code}): {error_body}")
            results.append({
                "index": i,
                "label": label,
                "filename": filename,
                "original_prompt": prompt,
                "revised_prompt": "",
                "success": False,
                "error": f"HTTP {e.code}: {error_body}",
            })
        except Exception as e:
            print(f"       ERROR: {e}")
            results.append({
                "index": i,
                "label": label,
                "filename": filename,
                "original_prompt": prompt,
                "revised_prompt": "",
                "success": False,
                "error": str(e),
            })

        # 3 second delay between requests (skip after last)
        if i < len(PROMPTS):
            print("       Waiting 3 seconds...")
            time.sleep(3)

    # Write results JSON for downstream use
    results_path = os.path.join(SCRIPT_DIR, "logo-generation-results.json")
    with open(results_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nResults saved to {results_path}")

    # Update the prompts markdown with revised prompts
    md_path = os.path.join(SCRIPT_DIR, "logo-prompts.md")
    with open(md_path, "r") as f:
        existing_md = f.read()

    revised_section = "\n\n---\n\n### Revised Prompts (returned by DALL-E 3)\n\n"
    for r in results:
        status = "OK" if r["success"] else "FAILED"
        revised_section += f"**Concept {r['index']:02d} - {r['label']}** [{status}]\n\n"
        if r["revised_prompt"]:
            revised_section += f"> {r['revised_prompt']}\n\n"
        elif not r["success"]:
            revised_section += f"> Error: {r.get('error', 'Unknown')}\n\n"
        else:
            revised_section += "> (no revised prompt returned)\n\n"

    with open(md_path, "w") as f:
        f.write(existing_md + revised_section)
    print(f"Updated {md_path} with revised prompts.")

    # Summary
    successes = sum(1 for r in results if r["success"])
    print(f"\nDone: {successes}/8 concepts generated successfully.")


if __name__ == "__main__":
    main()
