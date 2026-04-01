#!/usr/bin/env python3
"""
Generate 6 site images for Oceantech Brand-3 (Rugged Authenticity)
using DALL-E 3 via OpenAI API. Saves directly to public/images/.
"""

import json
import base64
import time
import os
import urllib.request
import urllib.error

# Load API key from .env
ENV_PATH = "/Users/dannyalmaden/projects/oceantech-commercial/.env"
OUTPUT_DIR = "/Users/dannyalmaden/projects/oceantech-commercial/apps/brand-3/public/images"

def load_api_key():
    with open(ENV_PATH, "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENAI_API="):
                return line.split("=", 1)[1]
    raise ValueError("OPENAI_API not found in .env")

API_KEY = load_api_key()

# Image definitions: (filename, prompt)
IMAGES = [
    (
        "hero.png",
        "Documentary style photograph of a Filipino diver sitting on the edge of a traditional Philippine bangka outrigger boat gearing up with scuba tank and BCD, warm morning light, the bangka has bamboo outriggers and colorful paint, calm tropical water, Cebu harbor with other bangka boats in soft background, film grain texture, earthy warm color grading with greens and warm tones, authentic and candid"
    ),
    (
        "about.png",
        "Candid documentary photograph of Filipino divers sharing a moment on a traditional bangka outrigger boat deck after a dive, tropical Philippine harbor background with fishing bangkas and small boats, warm golden hour light, genuine smiles, scuba gear visible, film grain texture, authentic and human, earthy warm tones, National Geographic style"
    ),
    (
        "service-welding.png",
        "Documentary style underwater photograph of a Filipino diver in wetsuit and scuba mask welding underwater, warm orange glow from welding arc, bubbles and sediment in tropical water, natural and raw feeling, film grain, authentic working conditions not overly dramatic, earthy warm color grading, no brass diving helmet"
    ),
    (
        "service-hull.png",
        "Documentary photograph of a Filipino commercial diver preparing to enter the water from a bangka work boat next to a large vessel hull, team on the bangka handing down scuba equipment, natural daylight, tropical Philippine harbor setting, candid and real, film grain, warm earthy tones, no diving helmets"
    ),
    (
        "service-inspection.png",
        "Documentary style photograph of a diver in scuba gear conducting underwater inspection of old concrete pier pilings in a Philippine harbor, natural light filtering through tropical water, marine growth on structures, authentic working scene, film grain texture, earthy green and warm tones, no heavy diving helmet"
    ),
    (
        "cta-background.png",
        "Aerial photograph of traditional Philippine bangka outrigger boats moored in calm turquoise tropical water near a small harbor village in Cebu, colorful wooden bangkas with bamboo outriggers, warm afternoon light, natural and authentic not luxury tourism, working boats and fishing equipment visible, film grain, earthy warm color palette, documentary drone photography"
    ),
]


def generate_image(prompt, filename):
    """Generate a single image via DALL-E 3 and save it."""
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
            "Authorization": f"Bearer {API_KEY}",
        },
        method="POST",
    )

    print(f"  Requesting DALL-E 3 generation...")
    resp = urllib.request.urlopen(req, timeout=120)
    body = json.loads(resp.read().decode("utf-8"))

    b64_data = body["data"][0]["b64_json"]
    revised_prompt = body["data"][0].get("revised_prompt", "")

    img_bytes = base64.b64decode(b64_data)
    out_path = os.path.join(OUTPUT_DIR, filename)
    with open(out_path, "wb") as f:
        f.write(img_bytes)

    size_kb = len(img_bytes) / 1024
    print(f"  Saved: {out_path} ({size_kb:.0f} KB)")
    if revised_prompt:
        print(f"  Revised prompt: {revised_prompt[:120]}...")
    return out_path


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Generating {len(IMAGES)} images for Brand-3 (Rugged Authenticity)")
    print(f"Output directory: {OUTPUT_DIR}")
    print()

    for i, (filename, prompt) in enumerate(IMAGES):
        print(f"[{i+1}/{len(IMAGES)}] Generating {filename}")
        try:
            generate_image(prompt, filename)
        except urllib.error.HTTPError as e:
            error_body = e.read().decode("utf-8") if e.fp else "no body"
            print(f"  ERROR ({e.code}): {error_body}")
        except Exception as e:
            print(f"  ERROR: {e}")

        if i < len(IMAGES) - 1:
            print(f"  Waiting 5s before next request...")
            time.sleep(5)
        print()

    print("Done! All images generated.")


if __name__ == "__main__":
    main()
