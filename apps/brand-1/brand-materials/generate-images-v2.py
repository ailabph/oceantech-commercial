#!/usr/bin/env python3
"""
Generate 6 site images for Oceantech Offshore Diving Services (Brand-1) via DALL-E 3.
Version 2: Corrected prompts — Philippine bangka boats, standard scuba gear, Filipino crew.
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
OUTPUT_DIR = PROJECT_ROOT / "apps" / "brand-1" / "public" / "images"

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

# --- Image Prompts (v2 — accuracy-corrected) ---
IMAGES = [
    {
        "filename": "hero.png",
        "label": "Hero Banner",
        "prompt": (
            "Cinematic wide shot of a Filipino commercial diver in standard scuba gear "
            "(BCD, tank, mask, wetsuit) descending into clear tropical ocean water near "
            "Cebu Philippines, dramatic warm sunlight rays penetrating from above creating "
            "teal and golden light beams, coral reef visible below, warm color grading, "
            "professional underwater photography, no diving helmet"
        ),
    },
    {
        "filename": "about.png",
        "label": "About Section",
        "prompt": (
            "Editorial photograph of a Filipino dive crew preparing scuba equipment on a "
            "traditional Philippine bangka outrigger boat at sunrise in a tropical harbor, "
            "bangka has bamboo outriggers and colorful paint, warm golden morning light, "
            "scuba tanks and BCDs laid out on deck, authentic working atmosphere, other "
            "bangka boats in background, Cebu Philippines setting"
        ),
    },
    {
        "filename": "service-welding.png",
        "label": "Service - Underwater Welding",
        "prompt": (
            "Dramatic underwater photograph of a commercial diver in wetsuit and full-face "
            "scuba mask performing underwater welding, bright orange welding arc illuminating "
            "murky tropical water, sparks and bubbles, no heavy brass diving helmet, "
            "realistic commercial diving scene, warm teal and orange tones"
        ),
    },
    {
        "filename": "service-hull.png",
        "label": "Service - Hull Cleaning",
        "prompt": (
            "Commercial diver in scuba gear performing hull cleaning on a large vessel hull "
            "underwater, diver wearing wetsuit and standard scuba equipment with surface "
            "supply hose, using hydraulic cleaning tool on the hull surface, bubbles rising, "
            "dark hull with marine growth being removed, tropical water tones, no deep sea helmet"
        ),
    },
    {
        "filename": "service-inspection.png",
        "label": "Service - Inspection",
        "prompt": (
            "Commercial diver in scuba gear conducting underwater inspection of concrete "
            "pier pilings in a Philippine harbor, diver using underwater camera, pier pilings "
            "covered in marine growth, clear tropical water with natural light filtering down, "
            "professional documentation work, no diving helmet"
        ),
    },
    {
        "filename": "cta-background.png",
        "label": "CTA Background",
        "prompt": (
            "Aerial drone photograph of traditional Philippine bangka outrigger boats moored "
            "in calm turquoise tropical water near a small harbor village in Cebu, warm "
            "afternoon golden light reflecting off water, colorful wooden bangka boats with "
            "bamboo outriggers, small coastal structures along shore, warm teal and orange "
            "color palette"
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


if __name__ == "__main__":
    print("=" * 60)
    print("Oceantech Offshore Diving Services (Brand-1) - Image Gen v2")
    print("=" * 60)
    print(f"Output directory: {OUTPUT_DIR}")

    results = run()

    success_count = sum(1 for r in results if r["status"] == "success")
    print(f"\n{'=' * 60}")
    print(f"Generation complete: {success_count}/{len(IMAGES)} successful")
    print(f"{'=' * 60}")
    print("Done.")
