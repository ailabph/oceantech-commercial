#!/usr/bin/env python3
"""
Generate 6 site images for Oceantech Commercial Diving (brand-1) via DALL-E 3.
Uses only Python stdlib: json, urllib, base64, pathlib, time.
"""

import base64
import json
import time
import urllib.request
from pathlib import Path

# --- Configuration ---
PROJECT_ROOT = Path("/Users/dannyalmaden/projects/oceantech-commercial")
ENV_PATH = PROJECT_ROOT / ".env"
OUTPUT_DIR = PROJECT_ROOT / "apps" / "brand-1" / "brand-materials" / "images"
PROMPTS_DOC = OUTPUT_DIR / "image-prompts.md"

DALLE_URL = "https://api.openai.com/v1/images/generations"
IMAGE_SIZE = "1792x1024"
RESPONSE_FORMAT = "b64_json"
DELAY_SECONDS = 5


# --- Load API key from .env ---
def load_api_key():
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1]
    raise ValueError("OPENAI_API not found in .env")


API_KEY = load_api_key()

# --- Image Prompts ---
IMAGES = [
    {
        "filename": "hero.png",
        "label": "Hero Banner",
        "prompt": (
            "Cinematic wide shot of a commercial diver descending into deep tropical "
            "ocean water, dramatic sunlight rays penetrating from above, wearing full "
            "surface-supplied diving equipment, warm teal and orange color grading, "
            "professional underwater photography style, industrial and awe-inspiring"
        ),
    },
    {
        "filename": "about.png",
        "label": "About Section",
        "prompt": (
            "Editorial style photograph of an experienced dive team preparing equipment "
            "on a boat deck at sunrise in a tropical harbor, warm golden light, commercial "
            "diving gear laid out, team working together, authentic and professional "
            "atmosphere, teal ocean in background"
        ),
    },
    {
        "filename": "service-welding.png",
        "label": "Service - Underwater Welding",
        "prompt": (
            "Dramatic underwater photograph of a commercial diver performing underwater "
            "welding, bright orange welding arc illuminating the dark water, sparks and "
            "bubbles, surface-supplied diving helmet, industrial underwater scene, "
            "professional commercial diving photography"
        ),
    },
    {
        "filename": "service-hull.png",
        "label": "Service - Hull Cleaning",
        "prompt": (
            "Commercial diver performing hull cleaning on a large ship hull underwater, "
            "diver using hydraulic cleaning tool, marine growth being removed, bubbles "
            "rising, dark hull surface with patches of clean metal revealed, professional "
            "underwater photography, teal water tones"
        ),
    },
    {
        "filename": "service-inspection.png",
        "label": "Service - Inspection",
        "prompt": (
            "Commercial diver conducting underwater structural inspection of a pier "
            "piling, using underwater camera equipment, concrete pier structure covered "
            "in marine growth, tropical clear water, professional documentation work, "
            "industrial diving scene"
        ),
    },
    {
        "filename": "cta-background.png",
        "label": "CTA Background",
        "prompt": (
            "Aerial view of a commercial diving support vessel in calm tropical waters "
            "near a port, warm sunset light reflecting off the water, teal and orange "
            "color palette, cinematic drone photography style, tropical harbor setting"
        ),
    },
]


def generate_image(prompt: str) -> dict:
    """Call DALL-E 3 API and return the response data."""
    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "size": IMAGE_SIZE,
        "quality": "standard",
        "response_format": RESPONSE_FORMAT,
        "n": 1,
    }).encode("utf-8")

    req = urllib.request.Request(
        DALLE_URL,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {API_KEY}",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=120) as resp:
        body = json.loads(resp.read().decode("utf-8"))

    return body


def run():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    total = len(IMAGES)
    results = []

    for i, item in enumerate(IMAGES, start=1):
        filename = item["filename"]
        label = item["label"]
        prompt = item["prompt"]
        filepath = OUTPUT_DIR / filename

        print(f"\n[{i}/{total}] Generating: {label} ({filename})")
        print(f"  Prompt: {prompt[:90]}...")

        try:
            body = generate_image(prompt)
            image_b64 = body["data"][0]["b64_json"]
            revised_prompt = body["data"][0].get("revised_prompt", "")

            # Decode and save the image
            img_bytes = base64.b64decode(image_b64)
            with open(filepath, "wb") as f:
                f.write(img_bytes)

            size_kb = len(img_bytes) / 1024
            print(f"  Saved: {filepath} ({size_kb:.0f} KB)")
            print(f"  Revised prompt: {revised_prompt[:120]}...")

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

        # Delay between requests to avoid rate limits
        if i < total:
            print(f"  Waiting {DELAY_SECONDS}s before next request...")
            time.sleep(DELAY_SECONDS)

    return results


def write_prompts_doc(results):
    """Save documentation of all prompts and revised prompts."""
    lines = [
        "# Oceantech Commercial Diving (Brand-1) - Site Image Prompts",
        "",
        f"Generated via DALL-E 3 ({IMAGE_SIZE}, standard quality, {RESPONSE_FORMAT} format).",
        "",
        "---",
        "",
    ]

    for r in results:
        lines.append(f"## {r['label']}")
        lines.append("")
        lines.append(f"**File:** `images/{r['filename']}`")
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
    print("Oceantech Commercial Diving (Brand-1) - Site Image Generation")
    print("=" * 60)

    results = run()

    success_count = sum(1 for r in results if r["status"] == "success")
    print(f"\n{'=' * 60}")
    print(f"Generation complete: {success_count}/{len(IMAGES)} successful")
    print(f"{'=' * 60}")

    write_prompts_doc(results)
    print("Done.")
