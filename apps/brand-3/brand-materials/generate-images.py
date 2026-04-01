#!/usr/bin/env python3
"""
Brand-3 "Rugged Authenticity" — DALL-E 3 image generator
Generates 6 landscape images for Oceantech Commercial Diving site.
Uses Python stdlib only.
"""

import json
import base64
import time
import urllib.request
import urllib.error
import os
import sys

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

ENV_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".env"
)
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")

PROMPTS = [
    {
        "filename": "hero.png",
        "prompt": (
            "Documentary style photograph of a commercial diver sitting on the edge "
            "of a weathered wooden dive boat in tropical waters, putting on equipment, "
            "natural warm morning light, film grain texture, candid moment, authentic "
            "working atmosphere, earthy warm color grading with greens and warm tones, "
            "editorial photography style"
        ),
    },
    {
        "filename": "about.png",
        "prompt": (
            "Candid documentary photograph of experienced divers sharing a moment on "
            "a boat deck after a dive, tropical harbor background with fishing boats, "
            "warm golden hour light, genuine smiles, weathered equipment, film grain "
            "texture, authentic and human, National Geographic style photography"
        ),
    },
    {
        "filename": "service-welding.png",
        "prompt": (
            "Documentary style underwater photograph of a commercial diver welding, "
            "warm orange glow from the welding arc, bubbles and sediment in the water, "
            "natural and raw feeling, film grain texture, authentic working conditions, "
            "not overly dramatic, earthy warm color grading"
        ),
    },
    {
        "filename": "service-hull.png",
        "prompt": (
            "Documentary photograph of a commercial diver preparing to enter the water "
            "from a work boat next to a large vessel hull, equipment being handed down, "
            "team working together, natural daylight, tropical harbor setting, candid "
            "and real, film grain, warm earthy tones"
        ),
    },
    {
        "filename": "service-inspection.png",
        "prompt": (
            "Documentary style photograph of a diver conducting an underwater inspection "
            "of old concrete pier pilings, natural light filtering through tropical water, "
            "marine growth on structures, authentic working scene, film grain texture, "
            "earthy green and warm tones, editorial photography"
        ),
    },
    {
        "filename": "cta-background.png",
        "prompt": (
            "Aerial photograph of a traditional wooden dive boat moored in calm turquoise "
            "tropical water near a small harbor village, warm afternoon light, natural and "
            "authentic, not luxury tourism, working boats and equipment visible, film grain, "
            "earthy warm color palette, documentary drone photography"
        ),
    },
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_api_key(env_path: str) -> str:
    """Read OPENAI_API from .env file."""
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1].strip()
    raise RuntimeError("OPENAI_API not found in .env")


def generate_image(api_key: str, prompt: str) -> str:
    """Call DALL-E 3 and return the base64-encoded PNG data."""
    url = "https://api.openai.com/v1/images/generations"
    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1792x1024",
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

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            body = json.loads(resp.read().decode("utf-8"))
            return body["data"][0]["b64_json"]
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        print(f"  HTTP {e.code}: {error_body}", file=sys.stderr)
        raise


def save_image(b64_data: str, path: str) -> None:
    """Decode base64 data and write to a PNG file."""
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64_data))


def save_prompts_md(prompts: list, output_dir: str) -> None:
    """Write image-prompts.md alongside the generated images."""
    md_path = os.path.join(output_dir, "image-prompts.md")
    lines = [
        "# Brand-3 \"Rugged Authenticity\" — Image Prompts",
        "",
        "Generated with DALL-E 3 at 1792x1024 (landscape).",
        "",
    ]
    for i, entry in enumerate(prompts, 1):
        lines.append(f"## {i}. {entry['filename']}")
        lines.append("")
        lines.append(entry["prompt"])
        lines.append("")
    with open(md_path, "w") as f:
        f.write("\n".join(lines))
    print(f"Saved prompts to {md_path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    api_key = load_api_key(ENV_PATH)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    total = len(PROMPTS)
    for i, entry in enumerate(PROMPTS):
        filename = entry["filename"]
        prompt = entry["prompt"]
        out_path = os.path.join(OUTPUT_DIR, filename)

        print(f"\n[{i + 1}/{total}] Generating {filename} ...")
        print(f"  Prompt: {prompt[:80]}...")

        try:
            b64_data = generate_image(api_key, prompt)
            save_image(b64_data, out_path)
            size_kb = os.path.getsize(out_path) / 1024
            print(f"  Saved  {out_path}  ({size_kb:.0f} KB)")
        except Exception as exc:
            print(f"  FAILED: {exc}", file=sys.stderr)

        # 5-second delay between requests (skip after last)
        if i < total - 1:
            print("  Waiting 5 seconds before next request...")
            time.sleep(5)

    # Write the prompts markdown file
    save_prompts_md(PROMPTS, OUTPUT_DIR)
    print("\nDone.")


if __name__ == "__main__":
    main()
