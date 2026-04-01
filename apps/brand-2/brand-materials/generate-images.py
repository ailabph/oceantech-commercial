#!/usr/bin/env python3
"""
Generate brand-2 "Industrial Precision" site imagery using DALL-E 3.
Dark, dramatic, premium, industrial — deep navy/dark tones with gold/warm highlights.
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
OUTPUT_DIR = Path(__file__).resolve().parent / "images"
PROMPTS_FILE = OUTPUT_DIR / "image-prompts.md"

IMAGE_SIZE = "1792x1024"
MODEL = "dall-e-3"
RESPONSE_FORMAT = "b64_json"
DELAY_SECONDS = 5

IMAGES = [
    {
        "filename": "hero.png",
        "prompt": (
            "Cinematic dark dramatic shot of a commercial diver underwater "
            "illuminated by a single powerful work light, deep dark ocean, "
            "navy blue and gold color grading, high contrast, industrial "
            "atmosphere, surface-supplied diving equipment, professional "
            "underwater photography, dramatic and powerful"
        ),
    },
    {
        "filename": "about.png",
        "prompt": (
            "Dramatic low-angle photograph of commercial diving equipment on "
            "a steel deck at dusk, hard industrial lighting, welding equipment "
            "and diving helmets arranged with precision, dark moody atmosphere "
            "with warm golden accent light, cinematic industrial photography"
        ),
    },
    {
        "filename": "service-welding.png",
        "prompt": (
            "Dramatic close-up of underwater welding in progress, intense "
            "bright golden welding arc against deep dark water, sparks flying, "
            "commercial diver in full equipment, high contrast cinematic "
            "photography, dark navy tones with bright gold light, powerful "
            "industrial scene"
        ),
    },
    {
        "filename": "service-hull.png",
        "prompt": (
            "Dark dramatic underwater shot of a commercial diver working on "
            "the hull of a massive vessel, diver silhouetted against the "
            "enormous dark hull, single work light creating dramatic shadows, "
            "deep ocean tones, industrial scale and power, professional "
            "underwater photography"
        ),
    },
    {
        "filename": "service-inspection.png",
        "prompt": (
            "Commercial diver using advanced inspection equipment on an "
            "underwater structure, LED work lights illuminating steel and "
            "concrete in dark water, technical precision, industrial "
            "atmosphere, dark navy and silver tones, high-tech commercial "
            "diving photography"
        ),
    },
    {
        "filename": "cta-background.png",
        "prompt": (
            "Dramatic aerial photograph of a commercial vessel and diving "
            "support boat at twilight, dark ocean with golden reflections "
            "from the last light, moody atmospheric clouds, cinematic color "
            "grading in navy and gold tones, powerful and premium feeling"
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


def save_prompts_markdown(images: list[dict], path: Path) -> None:
    """Write all prompts to a Markdown reference file."""
    lines = ["# Brand-2 Image Prompts", ""]
    lines.append("Generated with DALL-E 3 at 1792x1024 (landscape).")
    lines.append("")
    for img in images:
        lines.append(f"## {img['filename']}")
        lines.append("")
        lines.append(f"> {img['prompt']}")
        lines.append("")
    path.write_text("\n".join(lines))
    print(f"Saved prompts to {path}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    api_key = load_api_key(ENV_PATH)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    total = len(IMAGES)
    for idx, img in enumerate(IMAGES, start=1):
        filename = img["filename"]
        prompt = img["prompt"]
        out_path = OUTPUT_DIR / filename

        print(f"\n[{idx}/{total}] Generating {filename} ...")
        print(f"  Prompt: {prompt[:80]}...")

        png_bytes = generate_image(api_key, prompt)
        out_path.write_bytes(png_bytes)
        print(f"  Saved to {out_path} ({len(png_bytes):,} bytes)")

        if idx < total:
            print(f"  Waiting {DELAY_SECONDS}s before next request...")
            time.sleep(DELAY_SECONDS)

    # Save prompts reference
    save_prompts_markdown(IMAGES, PROMPTS_FILE)

    print("\nAll images generated successfully.")


if __name__ == "__main__":
    main()
