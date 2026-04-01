#!/usr/bin/env python3
"""
Generate 6 logo concepts for Oceantech Offshore Diving Services using DALL-E 3.
Brand-1 Colors: Deep Ocean Teal #0A4D68, Sunset Orange #E85D04, Copper #B87333, Charcoal #2D3436
"""

import base64
import json
import os
import time
import urllib.request
import urllib.error

# --- Config ---
ENV_PATH = "/Users/dannyalmaden/projects/oceantech-commercial/.env"
OUTPUT_DIR = "/Users/dannyalmaden/projects/oceantech-commercial/apps/brand-1/brand-materials/logos/v2"

# --- Load OPENAI_API from .env ---
def load_api_key(env_path):
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1]
    raise RuntimeError("OPENAI_API not found in .env")

API_KEY = load_api_key(ENV_PATH)

# --- Logo prompts ---
LOGOS = [
    {
        "filename": "v2-01.png",
        "prompt": (
            "A modern combination logo with an abstract geometric circular icon to the left of the text "
            "'OCEANTECH OFFSHORE'. The icon is a stylized O shape suggesting ocean depth with teal and orange tones. "
            "Bold geometric sans-serif typography. Deep teal (#0A4D68) and sunset orange (#E85D04) color scheme. "
            "Clean, professional, flat vector, on white background"
        ),
    },
    {
        "filename": "v2-02.png",
        "prompt": (
            "A horizontal combination logo for 'OCEANTECH OFFSHORE' with a minimal abstract icon suggesting "
            "descent into depth on the left. The word OCEANTECH is bold and OFFSHORE is lighter weight below or "
            "beside it. Deep teal (#0A4D68) main color with copper (#B87333) accent details. Modern geometric "
            "sans-serif font, flat vector, clean lines, on white background"
        ),
    },
    {
        "filename": "v2-03.png",
        "prompt": (
            "A stacked logo with a geometric abstract icon above the text 'OCEANTECH' in bold with 'OFFSHORE "
            "DIVING SERVICES' in smaller lighter text below. The icon combines depth and precision motifs. Deep "
            "teal and orange color palette. Modern, bold, professional, flat vector, on white background"
        ),
    },
    {
        "filename": "v2-04.png",
        "prompt": (
            "A minimal icon logo mark that is an abstract O shape combined with a downward arrow or descent motif, "
            "representing ocean depth. Deep teal (#0A4D68) with a sunset orange (#E85D04) accent element. Bold, "
            "geometric, modern, works at small sizes, flat vector, on white background, no text"
        ),
    },
    {
        "filename": "v2-05.png",
        "prompt": (
            "A bold wordmark logo for 'OCEANTECH OFFSHORE' in a strong geometric sans-serif font. The word "
            "OCEANTECH is larger and bolder, OFFSHORE is slightly smaller below. Deep teal (#0A4D68) color. A "
            "thin orange (#E85D04) line accent between the two words. Clean, modern, flat vector, on white "
            "background, no icon"
        ),
    },
    {
        "filename": "v2-06.png",
        "prompt": (
            "A combination logo for 'OCEANTECH OFFSHORE DIVING SERVICES' with a circular abstract icon. The icon "
            "features geometric shapes suggesting depth and the ocean in teal and orange. The company name is "
            "arranged with OCEANTECH OFFSHORE on the first line (bold) and DIVING SERVICES on the second line "
            "(lighter). Deep teal main color, flat vector, professional, on white background"
        ),
    },
]

# --- Generate images ---
def generate_image(prompt, filename, index, total):
    print(f"\n[{index}/{total}] Generating: {filename}")
    print(f"  Prompt: {prompt[:80]}...")

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
            "Authorization": f"Bearer {API_KEY}",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            body = json.loads(resp.read().decode("utf-8"))

        b64_data = body["data"][0]["b64_json"]
        revised_prompt = body["data"][0].get("revised_prompt", "")
        image_bytes = base64.b64decode(b64_data)

        out_path = os.path.join(OUTPUT_DIR, filename)
        with open(out_path, "wb") as f:
            f.write(image_bytes)

        size_kb = len(image_bytes) / 1024
        print(f"  Saved: {out_path} ({size_kb:.0f} KB)")
        if revised_prompt:
            print(f"  Revised prompt: {revised_prompt[:120]}...")
        return True

    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8") if e.fp else ""
        print(f"  ERROR {e.code}: {error_body[:300]}")
        return False
    except Exception as e:
        print(f"  ERROR: {e}")
        return False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    total = len(LOGOS)
    print(f"Generating {total} logo concepts for Oceantech Offshore Diving Services")
    print(f"Output directory: {OUTPUT_DIR}")
    print("=" * 70)

    success = 0
    for i, logo in enumerate(LOGOS, 1):
        ok = generate_image(logo["prompt"], logo["filename"], i, total)
        if ok:
            success += 1
        if i < total:
            print("  Waiting 3 seconds before next request...")
            time.sleep(3)

    print("\n" + "=" * 70)
    print(f"Done. {success}/{total} logos generated successfully.")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
