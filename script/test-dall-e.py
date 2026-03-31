#!/usr/bin/env python3
"""
Test DALL-E 3 image generation via OpenAI API.
Generates a simple test image and saves it locally.
"""

import json
import sys
import urllib.request
import urllib.error
import base64
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = PROJECT_ROOT / ".env"
OUTPUT_DIR = PROJECT_ROOT / "script" / "test-output"


def load_openai_key():
    """Load OPENAI_API from .env file."""
    if not ENV_PATH.exists():
        print("[FAIL] .env file not found")
        return None

    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            if key.strip() == "OPENAI_API":
                value = value.strip().strip("'\"")
                if value and value != "your_openai_api_key_here":
                    return value

    print("[FAIL] OPENAI_API not found or is placeholder")
    return None


def generate_image(api_key):
    """Generate a test image with DALL-E 3."""
    prompt = "A minimalist logo icon of a diving helmet, flat vector style, deep ocean blue, on white background, simple clean lines"

    print(f"Prompt: {prompt}")
    print()
    print("Generating image...")

    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024",
        "response_format": "b64_json",
    }).encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode())

            image_data = data["data"][0]
            b64 = image_data.get("b64_json")
            revised_prompt = image_data.get("revised_prompt", "")

            if revised_prompt:
                print(f"Revised prompt: {revised_prompt}")
                print()

            # Save image
            OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
            timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
            filename = f"dall-e-3-test-{timestamp}.png"
            filepath = OUTPUT_DIR / filename

            image_bytes = base64.b64decode(b64)
            with open(filepath, "wb") as f:
                f.write(image_bytes)

            size_kb = len(image_bytes) / 1024
            print(f"[OK] Image saved: {filepath}")
            print(f"     Size: {size_kb:.1f} KB")
            return True

    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        try:
            err = json.loads(body)
            msg = err.get("error", {}).get("message", body)
        except Exception:
            msg = body
        print(f"[FAIL] HTTP {e.code}: {msg}")
        return False
    except Exception as e:
        print(f"[FAIL] {e}")
        return False


def main():
    print("=" * 60)
    print("  DALL-E 3 Test")
    print("=" * 60)
    print()

    api_key = load_openai_key()
    if not api_key:
        sys.exit(1)

    print("[OK] OpenAI API key loaded")
    print()

    success = generate_image(api_key)

    print()
    print("=" * 60)
    if success:
        print("  DALL-E 3 is working.")
    else:
        print("  DALL-E 3 test failed. Check output above.")
    print("=" * 60)

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
