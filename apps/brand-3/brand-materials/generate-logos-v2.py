#!/usr/bin/env python3
"""
Generate Brand-3 "Rugged Authenticity" logo concepts v2 using DALL-E 3.
Oceantech Offshore Diving Services — heritage outdoor brand aesthetic.
"""

import base64
import json
import os
import time
import urllib.request
import urllib.error
import ssl

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
ENV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".env")
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logos", "v2")

def load_api_key():
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1]
    raise RuntimeError("OPENAI_API not found in .env")

API_KEY = load_api_key()

PROMPTS = [
    {
        "filename": "v2-01.png",
        "prompt": (
            "A vintage round badge logo for 'OCEANTECH OFFSHORE' with a rugged "
            "hand-crafted aesthetic. Deep sea green (#1B4332) and warm cream (#FAF3E8). "
            "Rope or circular border detail, simple ocean motif in center, EST 1981 at "
            "bottom. Heritage outdoor brand feel, weathered texture, flat vector, on white background"
        ),
    },
    {
        "filename": "v2-02.png",
        "prompt": (
            "A rugged rectangular badge logo for 'OCEANTECH OFFSHORE DIVING SERVICES' "
            "with EST. 1981. Deep sea green and rust orange (#C1440E) color scheme. "
            "Vintage workwear patch aesthetic, bold condensed type, simple geometric ocean "
            "motif. Flat vector, worn heritage feel, on white background"
        ),
    },
    {
        "filename": "v2-03.png",
        "prompt": (
            "A horizontal combination logo with a simple bold monoline icon and "
            "'OCEANTECH OFFSHORE' in heavy characterful slab-serif type. Deep sea green "
            "(#1B4332) and rust orange (#C1440E). Rugged outdoor brand aesthetic like "
            "Patagonia. Clean but with character, not corporate. Flat vector, on white background"
        ),
    },
    {
        "filename": "v2-04.png",
        "prompt": (
            "A minimal icon logo mark of a stylized compass or descent symbol combined "
            "with a circular ocean motif. Deep sea green (#1B4332) and rust orange (#C1440E) "
            "accent. Rugged, bold weight, simple, could be embroidered on a work shirt or "
            "stamped on a gear bag. Flat vector, minimal, on white background, no text"
        ),
    },
    {
        "filename": "v2-05.png",
        "prompt": (
            "A bold rugged wordmark logo for 'OCEANTECH OFFSHORE' in a heavy slab-serif "
            "font with character. Deep sea green (#1B4332) with a thin rust orange (#C1440E) "
            "underline accent. Slightly rough edges, could be stamped on equipment. Heritage "
            "feel, flat vector, on white background, no icon"
        ),
    },
    {
        "filename": "v2-06.png",
        "prompt": (
            "A circular rubber stamp style logo for 'OCEANTECH OFFSHORE EST. 1981'. "
            "Text arranged in a circle with a simple central motif suggesting ocean depth. "
            "Deep sea green and cream. Weathered, authentic, hand-stamped feel. Flat vector, "
            "vintage, on white background"
        ),
    },
]

# ---------------------------------------------------------------------------
# DALL-E 3 generation
# ---------------------------------------------------------------------------
ENDPOINT = "https://api.openai.com/v1/images/generations"

def generate_image(prompt_text: str) -> bytes:
    """Call DALL-E 3 and return raw PNG bytes (b64_json)."""
    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt_text,
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

    # Allow self-signed / system certs
    ctx = ssl.create_default_context()

    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
        body = json.loads(resp.read().decode("utf-8"))

    b64_data = body["data"][0]["b64_json"]
    return base64.b64decode(b64_data)


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    total = len(PROMPTS)

    for idx, item in enumerate(PROMPTS, start=1):
        filename = item["filename"]
        prompt = item["prompt"]
        out_path = os.path.join(OUTPUT_DIR, filename)

        print(f"\n[{idx}/{total}] Generating {filename} ...")
        print(f"  Prompt: {prompt[:90]}...")

        try:
            png_bytes = generate_image(prompt)
            with open(out_path, "wb") as f:
                f.write(png_bytes)
            size_kb = len(png_bytes) / 1024
            print(f"  Saved  -> {out_path}  ({size_kb:.0f} KB)")
        except urllib.error.HTTPError as e:
            error_body = e.read().decode("utf-8", errors="replace")
            print(f"  ERROR  -> HTTP {e.code}: {error_body}")
        except Exception as e:
            print(f"  ERROR  -> {e}")

        # Delay between requests (skip after last)
        if idx < total:
            print("  Waiting 3 seconds ...")
            time.sleep(3)

    print("\nDone. All logo concepts saved to:", OUTPUT_DIR)


if __name__ == "__main__":
    main()
