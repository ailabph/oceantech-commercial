#!/usr/bin/env python3
"""
Generate brand-2 site imagery v2 using DALL-E 3.
Philippine-accurate imagery with dark cinematic treatment.
Deep navy/dark tones with gold/warm highlights, high contrast.
"""

import urllib.request
import urllib.error
import json
import base64
import time
from pathlib import Path

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
ENV_PATH = Path(__file__).resolve().parents[3] / ".env"
OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "images"

IMAGE_SIZE = "1792x1024"
MODEL = "dall-e-3"
RESPONSE_FORMAT = "b64_json"
DELAY_SECONDS = 5

IMAGES = [
    {
        "filename": "hero.png",
        "prompt": (
            "Cinematic dark dramatic shot of a commercial diver in standard "
            "scuba gear and full-face mask underwater, illuminated by a single "
            "powerful work light, deep dark ocean, navy blue and gold color "
            "grading, high contrast, professional commercial diving, no brass "
            "diving helmet, dramatic and powerful atmosphere"
        ),
    },
    {
        "filename": "about.png",
        "prompt": (
            "Dramatic low-angle photograph of commercial diving scuba equipment "
            "arranged on a steel work boat deck at dusk in a Philippine harbor, "
            "hard industrial lighting with warm golden accents, scuba tanks BCDs "
            "regulators and welding equipment laid out with precision, dark moody "
            "atmosphere, cinematic photography, no old-style diving helmets"
        ),
    },
    {
        "filename": "service-welding.png",
        "prompt": (
            "Dramatic close-up of underwater welding in progress, diver wearing "
            "wetsuit and full-face scuba mask, intense bright golden welding arc "
            "against deep dark water, sparks flying underwater, high contrast "
            "cinematic photography, dark navy tones with bright gold welding "
            "light, no brass helmet, powerful industrial scene"
        ),
    },
    {
        "filename": "service-hull.png",
        "prompt": (
            "Dark dramatic underwater shot of a commercial diver in scuba gear "
            "working on the hull of a massive cargo vessel, diver with work "
            "light creating dramatic shadows on the enormous dark hull, deep "
            "ocean tones, industrial scale and power, professional underwater "
            "photography, no deep-sea helmet"
        ),
    },
    {
        "filename": "service-inspection.png",
        "prompt": (
            "Commercial diver in scuba gear using advanced inspection camera "
            "equipment on underwater concrete pier structure, LED work lights "
            "illuminating steel and concrete in dark water, technical precision, "
            "industrial atmosphere, dark navy and silver tones, no diving "
            "helmet, high-tech commercial diving"
        ),
    },
    {
        "filename": "cta-background.png",
        "prompt": (
            "Dramatic aerial photograph of a Philippine cargo vessel and a "
            "bangka support boat at twilight, dark ocean with golden reflections "
            "from last light, moody atmospheric clouds, cinematic color grading "
            "in navy and gold tones, powerful and premium atmosphere"
        ),
    },
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_api_key(env_path: Path) -> str:
    """Read OPENAI_API from the .env file."""
    text = env_path.read_text()
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("OPENAI_API="):
            return line.split("=", 1)[1].strip()
    raise RuntimeError(f"OPENAI_API not found in {env_path}")


def generate_image(api_key: str, prompt: str) -> bytes:
    """Call the OpenAI DALL-E 3 API and return raw PNG bytes."""
    url = "https://api.openai.com/v1/images/generations"
    payload = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "n": 1,
        "size": IMAGE_SIZE,
        "response_format": RESPONSE_FORMAT,
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
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"OpenAI API error {exc.code}: {error_body}"
        ) from exc

    b64_data = body["data"][0]["b64_json"]
    return base64.b64decode(b64_data)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    api_key = load_api_key(ENV_PATH)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Generating {len(IMAGES)} images with DALL-E 3 at {IMAGE_SIZE}\n")

    total = len(IMAGES)
    for idx, img in enumerate(IMAGES, start=1):
        filename = img["filename"]
        prompt = img["prompt"]
        out_path = OUTPUT_DIR / filename

        print(f"[{idx}/{total}] Generating {filename} ...")
        print(f"  Prompt: {prompt[:90]}...")

        png_bytes = generate_image(api_key, prompt)
        out_path.write_bytes(png_bytes)
        print(f"  Saved to {out_path} ({len(png_bytes):,} bytes)")

        if idx < total:
            print(f"  Waiting {DELAY_SECONDS}s before next request...")
            time.sleep(DELAY_SECONDS)

    print("\nAll 6 images generated successfully.")


if __name__ == "__main__":
    main()
