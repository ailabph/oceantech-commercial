#!/usr/bin/env python3
"""
Generate 8 DALL-E 3 logo concepts for Oceantech Commercial Diving (Brand-2: Industrial Precision).
Uses only Python stdlib. Reads OPENAI_API from project .env file.
"""

import json
import base64
import os
import time
import urllib.request
import urllib.error
import ssl

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
ENV_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "..", ".env")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "logos")
PROMPTS_DOC = os.path.join(os.path.dirname(__file__), "logo-prompts.md")

PROMPTS = [
    (
        "Icon - Angular O",
        "A bold angular logo icon based on the letter O with sharp geometric cuts suggesting depth and precision. "
        "Deep navy (#0B1426) and electric gold (#D4A017) on white background. Industrial, sharp edges, heavy weight, "
        "flat vector, minimal, no text, no gradients",
    ),
    (
        "Icon - OT Industrial",
        "A heavy industrial monogram combining letters O and T with sharp angular geometry. Deep navy and metallic "
        "silver tones on white background. Engineered precision feel, bold weight, flat vector, stencil-like quality, "
        "minimal, no gradients, no realistic details",
    ),
    (
        "Icon - Chevron Depth",
        "A bold logo icon using downward-pointing chevron or diamond shape suggesting descent and depth. Deep navy "
        "(#0B1426) with electric gold (#D4A017) accent. Sharp angular geometry, industrial precision, flat vector, "
        "heavy bold lines, on white background, no text",
    ),
    (
        "Icon - Precision Mark",
        "A minimalist precision engineering logo mark. Sharp geometric abstract form with angular intersecting lines "
        "forming a cohesive symbol. Deep navy and gold color scheme. Industrial, technical, bold, flat vector, on "
        "white background, no text, no anchors, no waves",
    ),
    (
        "Combination - Left",
        "A bold combination logo with a sharp angular geometric icon to the left of the text 'OCEANTECH' in heavy "
        "condensed sans-serif capitals. Deep navy (#0B1426) and electric gold (#D4A017). Industrial, commanding, "
        "flat vector, on white background, premium feel",
    ),
    (
        "Combination - Stacked",
        "A stacked logo with a sharp angular geometric icon above 'OCEANTECH' in bold condensed capitals with "
        "'COMMERCIAL DIVING' in lighter weight below. Deep navy and gold. Industrial premium, heavy typography, "
        "flat vector, minimal, on white background",
    ),
    (
        "Icon - Diamond",
        "A bold diamond-shaped logo mark with internal geometric cuts creating an abstract pattern suggesting depth "
        "and precision. Deep navy (#0B1426) with steel silver (#8C9EAF) and gold (#D4A017) accents. Sharp, "
        "industrial, engineered, flat vector, on white background",
    ),
    (
        "Icon - Stamped",
        "A bold industrial logo mark that looks precision-stamped or engineered from metal. Abstract angular form "
        "based on letters O and T merged. Deep navy and gold on white background. Heavy, commanding, industrial "
        "stencil aesthetic, flat vector, no realistic textures",
    ),
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_api_key(env_path: str) -> str:
    """Parse .env file and return OPENAI_API value."""
    resolved = os.path.realpath(env_path)
    with open(resolved, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1].strip()
    raise RuntimeError("OPENAI_API not found in .env")


def generate_image(api_key: str, prompt: str) -> tuple[str, str]:
    """
    Call DALL-E 3 to generate a 1024x1024 image.
    Returns (b64_json_data, revised_prompt).
    """
    url = "https://api.openai.com/v1/images/generations"
    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024",
        "response_format": "b64_json",
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    # Allow default SSL context (works on macOS with certifi / system certs)
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
        body = json.loads(resp.read().decode("utf-8"))

    item = body["data"][0]
    return item["b64_json"], item.get("revised_prompt", "")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    api_key = load_api_key(ENV_PATH)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    results = []  # list of (label, original_prompt, revised_prompt, filename)

    for idx, (label, prompt) in enumerate(PROMPTS, start=1):
        filename = f"concept-{idx:02d}.png"
        filepath = os.path.join(OUTPUT_DIR, filename)
        print(f"\n[{idx}/8] Generating: {label}")
        print(f"  Prompt: {prompt[:90]}...")

        try:
            b64_data, revised = generate_image(api_key, prompt)
            img_bytes = base64.b64decode(b64_data)
            with open(filepath, "wb") as f:
                f.write(img_bytes)
            print(f"  Saved: {filename} ({len(img_bytes):,} bytes)")
            if revised:
                print(f"  Revised prompt: {revised[:100]}...")
            results.append((label, prompt, revised, filename))
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append((label, prompt, f"ERROR: {e}", filename))

        # 3-second delay between requests (skip after last)
        if idx < len(PROMPTS):
            print("  Waiting 3 seconds...")
            time.sleep(3)

    # ----- Write logo-prompts.md -----
    print(f"\nWriting prompt documentation to {PROMPTS_DOC}")
    with open(PROMPTS_DOC, "w") as f:
        f.write("## Phase 2: DALL-E 3 Logo Concepts\n\n")
        f.write("Brand direction: **Industrial Precision** (Brand-2)\n\n")
        f.write("| # | Label | Filename |\n")
        f.write("|---|-------|----------|\n")
        for idx, (label, _, _, filename) in enumerate(results, start=1):
            f.write(f"| {idx} | {label} | `{filename}` |\n")
        f.write("\n---\n\n")
        for idx, (label, original, revised, filename) in enumerate(results, start=1):
            f.write(f"### Concept {idx:02d} -- {label}\n\n")
            f.write(f"**File:** `{filename}`\n\n")
            f.write(f"**Original Prompt:**\n\n> {original}\n\n")
            f.write(f"**Revised Prompt (DALL-E 3):**\n\n> {revised}\n\n")
            f.write("---\n\n")

    print("\nDone. All concepts generated.")


if __name__ == "__main__":
    main()
