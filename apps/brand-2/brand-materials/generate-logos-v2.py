#!/usr/bin/env python3
"""
Generate Brand-2 "Industrial Precision" logo concepts for Oceantech Offshore Diving Services.
Uses DALL-E 3 via OpenAI API. Python stdlib only.
"""

import json
import base64
import time
import urllib.request
import urllib.error
import os
import sys

# --- Configuration ---
ENV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../..", ".env")
ENV_PATH = os.path.normpath(ENV_PATH)

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logos", "v2")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Read API key from .env
api_key = None
with open(ENV_PATH, "r") as f:
    for line in f:
        line = line.strip()
        if line.startswith("OPENAI_API="):
            api_key = line.split("=", 1)[1]
            break

if not api_key:
    print("ERROR: OPENAI_API not found in .env")
    sys.exit(1)

print(f"API key loaded (ends with ...{api_key[-6:]})")
print(f"Output directory: {OUTPUT_DIR}")
print()

# --- Logo Prompts ---
LOGOS = [
    {
        "filename": "v2-01.png",
        "prompt": (
            "A bold angular combination logo with a sharp geometric icon to the left of the text "
            "'OCEANTECH OFFSHORE'. The icon is a precision-cut angular O shape with sharp edges "
            "suggesting depth. Deep navy (#0B1426) and electric gold (#D4A017). Heavy condensed "
            "sans-serif typography. Industrial premium feel, flat vector, on white background"
        ),
    },
    {
        "filename": "v2-02.png",
        "prompt": (
            "A horizontal combination logo for 'OCEANTECH OFFSHORE' with a sharp diamond-shaped "
            "icon on the left. Angular geometric precision mark. Deep navy and gold color scheme. "
            "Bold condensed industrial typography. Engineered, commanding, flat vector, on white background"
        ),
    },
    {
        "filename": "v2-03.png",
        "prompt": (
            "A stacked logo with an angular geometric icon above 'OCEANTECH' in heavy condensed "
            "capitals with 'OFFSHORE DIVING SERVICES' in lighter weight below. Deep navy (#0B1426) "
            "and electric gold (#D4A017). Industrial stencil quality, sharp, premium, flat vector, "
            "on white background"
        ),
    },
    {
        "filename": "v2-04.png",
        "prompt": (
            "A minimal icon logo mark that is an angular geometric shape combining a downward chevron "
            "with an abstract O, suggesting depth and precision engineering. Deep navy (#0B1426) with "
            "electric gold (#D4A017) accent. Sharp edges, bold weight, industrial, works at small sizes, "
            "flat vector, on white background, no text"
        ),
    },
    {
        "filename": "v2-05.png",
        "prompt": (
            "A bold industrial wordmark logo for 'OCEANTECH OFFSHORE' in heavy condensed all-caps "
            "sans-serif font. Deep navy (#0B1426) main text. A thin gold (#D4A017) horizontal line "
            "accent between OCEANTECH and OFFSHORE. Sharp, engineered, stamped quality, flat vector, "
            "on white background, no icon"
        ),
    },
    {
        "filename": "v2-06.png",
        "prompt": (
            "A hexagonal badge logo for 'OCEANTECH OFFSHORE' with angular geometric internal pattern. "
            "Deep navy (#0B1426) and electric gold (#D4A017). Industrial precision, sharp geometry, "
            "engineering schematic feel, bold, flat vector, on white background"
        ),
    },
]

# --- Generation ---
API_URL = "https://api.openai.com/v1/images/generations"

def generate_image(prompt, filename):
    """Generate a single image via DALL-E 3 and save as PNG."""
    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024",
        "response_format": "b64_json",
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            body = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8") if e.fp else "no detail"
        print(f"  HTTP {e.code}: {error_body[:300]}")
        return False
    except Exception as e:
        print(f"  Request error: {e}")
        return False

    b64_data = body["data"][0]["b64_json"]
    revised_prompt = body["data"][0].get("revised_prompt", "")

    out_path = os.path.join(OUTPUT_DIR, filename)
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64_data))

    file_size_kb = os.path.getsize(out_path) / 1024
    print(f"  Saved: {out_path} ({file_size_kb:.0f} KB)")
    if revised_prompt:
        print(f"  Revised prompt: {revised_prompt[:120]}...")
    return True


def main():
    print("=" * 70)
    print("BRAND-2: Industrial Precision — Logo Generation (v2)")
    print("Generating 6 logo concepts via DALL-E 3")
    print("=" * 70)
    print()

    success_count = 0
    fail_count = 0

    for i, logo in enumerate(LOGOS, 1):
        print(f"[{i}/6] Generating {logo['filename']}...")
        ok = generate_image(logo["prompt"], logo["filename"])
        if ok:
            success_count += 1
        else:
            fail_count += 1

        # 3 second delay between requests (skip after last)
        if i < len(LOGOS):
            print("  Waiting 3 seconds...")
            time.sleep(3)
        print()

    print("=" * 70)
    print(f"Complete: {success_count} succeeded, {fail_count} failed")
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 70)


if __name__ == "__main__":
    main()
