#!/usr/bin/env python3
"""
Generate wordmark and lettermark SVGs for Oceantech Commercial Diving (Brand-2)
using Gemini 2.5 Pro via OpenRouter.

Brand-2 Direction: "Industrial Precision"
Colors: Deep Navy #0B1426, Electric Gold #D4A017, Steel Silver #8C9EAF, True Black #111111
"""

import json
import os
import re
import ssl
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

# ── Paths ────────────────────────────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).resolve().parents[3]  # oceantech-commercial/
ENV_FILE = PROJECT_ROOT / ".env"
OUTPUT_DIR = Path(__file__).resolve().parent / "logos"
PROMPTS_LOG = Path(__file__).resolve().parent / "logo-prompts.md"

# ── Parse .env manually ─────────────────────────────────────────────────────
def load_env(env_path: Path) -> dict:
    env = {}
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, _, value = line.partition("=")
                env[key.strip()] = value.strip()
    return env

env = load_env(ENV_FILE)
API_KEY = env.get("OPENROUTER_API")
if not API_KEY:
    print("ERROR: OPENROUTER_API not found in .env")
    sys.exit(1)

print(f"[OK] Loaded API key: {API_KEY[:12]}...{API_KEY[-4:]}")

# ── Ensure output directory exists ───────────────────────────────────────────
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ── Concept definitions ─────────────────────────────────────────────────────
CONCEPTS = [
    {
        "id": "W1",
        "filename": "wordmark-01.svg",
        "title": "Industrial Wordmark",
        "prompt": """Generate a complete, valid SVG file for a wordmark logo.

Design specifications:
- The word "OCEANTECH" in heavy condensed all-caps lettering
- Deep navy color (#0B1426) for the text
- Letters should feel bold, industrial, and stencil-like — engineered type with a commanding presence
- A thin horizontal gold (#D4A017) underline accent positioned below the text
- The SVG viewBox should be appropriately sized (approximately 600x120)
- Use a heavy condensed sans-serif font-family such as: 'Bebas Neue', 'Oswald', 'Impact', Arial Black, sans-serif
- font-weight: 900, letter-spacing: 0.15em for industrial feel
- The underline should be a thin rect (about 3px height) spanning the width of the text, with a small gap below the text
- Background should be transparent
- The design should feel premium, sharp, and authoritative

Return ONLY the complete SVG code, starting with <svg and ending with </svg>. No explanation, no markdown fences.""",
    },
    {
        "id": "W2",
        "filename": "wordmark-02.svg",
        "title": "Wordmark with Tagline",
        "prompt": """Generate a complete, valid SVG file for a wordmark logo with tagline.

Design specifications:
- "OCEANTECH" in bold condensed all-caps, deep navy (#0B1426), large size (approx 56-64px)
- "COMMERCIAL DIVING" in steel silver (#8C9EAF) small caps, spaced below, smaller size (approx 16-20px)
- Industrial hierarchy with clean separation between the two lines
- Letter-spacing: 0.15em for "OCEANTECH", 0.35em for "COMMERCIAL DIVING" (wider tracking for the tagline)
- Use a heavy condensed sans-serif font-family: 'Bebas Neue', 'Oswald', 'Impact', Arial Black, sans-serif
- font-weight: 900 for the main word, font-weight: 600 for the tagline
- SVG viewBox approximately 600x150
- Background should be transparent
- A subtle thin horizontal line (1-2px, gold #D4A017) between the two text lines as a separator
- The design should feel clean, industrial, and premium

Return ONLY the complete SVG code, starting with <svg and ending with </svg>. No explanation, no markdown fences.""",
    },
    {
        "id": "W3",
        "filename": "wordmark-03.svg",
        "title": "OT Lettermark",
        "prompt": """Generate a complete, valid SVG file for an "OT" monogram/lettermark.

Design specifications:
- Bold angular "OT" monogram using sharp geometric shapes
- The "O" should be deep navy (#0B1426) — geometric, angular (consider an octagonal or squared-off O rather than a perfect circle)
- The "T" should be electric gold (#D4A017) — bold, angular, with sharp clean lines
- The letters should have angular intersections where they overlap or connect
- Industrial precision feel — every angle should be deliberate
- Use geometric path/polygon elements rather than text elements for more control
- SVG viewBox approximately 200x200 (square format for a monogram)
- The overall composition should feel like an engineered industrial mark
- Consider having the T slightly overlap or integrate with the O
- Stroke width for outlines (if any): 2-3px
- Background transparent
- The design should feel bold, commanding, and premium

Return ONLY the complete SVG code, starting with <svg and ending with </svg>. No explanation, no markdown fences.""",
    },
    {
        "id": "W4",
        "filename": "wordmark-04.svg",
        "title": "Full Lockup",
        "prompt": """Generate a complete, valid SVG file for a full brand lockup.

Design specifications:
- "OCEANTECH" in heavy condensed all-caps, deep navy (#0B1426), large size (approx 56-64px)
- font-weight: 900, letter-spacing: 0.15em, font-family: 'Bebas Neue', 'Oswald', 'Impact', Arial Black, sans-serif
- Below the text: a horizontal gold (#D4A017) line spanning the full width (height ~3px)
- Below the gold line: "EST. 1980" in small technical tracking, steel silver (#8C9EAF), approx 12-14px
- Letter-spacing for "EST. 1980": 0.5em (very wide tracking for premium technical feel)
- font-weight: 400 for the date text
- SVG viewBox approximately 600x160
- Background transparent
- The composition should have: main wordmark → gold line → establishment date
- Spacing should be precise and clean — this is a premium, authoritative lockup
- The overall feel: industrial, commanding, heritage, precision

Return ONLY the complete SVG code, starting with <svg and ending with </svg>. No explanation, no markdown fences.""",
    },
]


# ── API call function ────────────────────────────────────────────────────────
def call_gemini(prompt: str, concept_id: str) -> str:
    """Call Gemini 2.5 Pro via OpenRouter and return the response text."""
    url = "https://openrouter.ai/api/v1/chat/completions"
    payload = json.dumps({
        "model": "google/gemini-2.5-pro",
        "messages": [
            {
                "role": "user",
                "content": prompt,
            }
        ],
    }).encode("utf-8")

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    req = urllib.request.Request(url, data=payload, headers=headers, method="POST")

    # Create an SSL context that works on macOS
    ctx = ssl.create_default_context()

    print(f"  [{concept_id}] Sending request to Gemini 2.5 Pro...")
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
            body = resp.read().decode("utf-8")
            data = json.loads(body)
    except Exception as e:
        print(f"  [{concept_id}] ERROR: {e}")
        raise

    # Extract the assistant message content
    try:
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError) as e:
        print(f"  [{concept_id}] ERROR parsing response: {e}")
        print(f"  [{concept_id}] Response: {json.dumps(data, indent=2)[:500]}")
        raise

    model_used = data.get("model", "unknown")
    usage = data.get("usage", {})
    print(f"  [{concept_id}] Response received. Model: {model_used}, "
          f"Tokens: {usage.get('prompt_tokens', '?')}/{usage.get('completion_tokens', '?')}")
    return content


def extract_svg(text: str) -> str:
    """Extract SVG content from response text."""
    # Try to find SVG between tags
    match = re.search(r'(<svg[\s\S]*?</svg>)', text, re.IGNORECASE)
    if match:
        return match.group(1)

    # If the whole response looks like SVG
    stripped = text.strip()
    if stripped.startswith("<svg") and stripped.endswith("</svg>"):
        return stripped

    # Try removing markdown code fences
    cleaned = re.sub(r'^```(?:xml|svg|html)?\s*\n?', '', stripped, flags=re.MULTILINE)
    cleaned = re.sub(r'\n?```\s*$', '', cleaned, flags=re.MULTILINE)
    match = re.search(r'(<svg[\s\S]*?</svg>)', cleaned, re.IGNORECASE)
    if match:
        return match.group(1)

    return ""


# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    print("=" * 70)
    print("Oceantech Commercial Diving — Brand-2 Wordmark Generator")
    print("Direction: Industrial Precision")
    print("Model: Gemini 2.5 Pro via OpenRouter")
    print(f"Output: {OUTPUT_DIR}")
    print("=" * 70)
    print()

    results = []
    log_entries = []

    for concept in CONCEPTS:
        cid = concept["id"]
        title = concept["title"]
        filename = concept["filename"]
        prompt = concept["prompt"]

        print(f"[{cid}] {title} ({filename})")
        print("-" * 50)

        try:
            raw_response = call_gemini(prompt, cid)
            svg_code = extract_svg(raw_response)

            if not svg_code:
                print(f"  [{cid}] WARNING: Could not extract SVG from response.")
                print(f"  [{cid}] Raw response preview: {raw_response[:300]}...")
                svg_code = ""
                success = False
            else:
                # Save SVG
                out_path = OUTPUT_DIR / filename
                with open(out_path, "w") as f:
                    f.write(svg_code)
                print(f"  [{cid}] Saved: {out_path}")
                print(f"  [{cid}] SVG size: {len(svg_code)} chars")
                success = True

            results.append({"id": cid, "title": title, "filename": filename, "success": success})
            log_entries.append({
                "id": cid,
                "title": title,
                "filename": filename,
                "prompt": prompt,
                "raw_response": raw_response,
                "svg_extracted": bool(svg_code),
                "svg_length": len(svg_code),
            })

        except Exception as e:
            print(f"  [{cid}] FAILED: {e}")
            results.append({"id": cid, "title": title, "filename": filename, "success": False})
            log_entries.append({
                "id": cid,
                "title": title,
                "filename": filename,
                "prompt": prompt,
                "raw_response": f"ERROR: {e}",
                "svg_extracted": False,
                "svg_length": 0,
            })

        print()

    # ── Write prompts log ────────────────────────────────────────────────────
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_section = f"\n\n## Phase 3: Gemini 2.5 Pro Wordmarks\n\n"
    log_section += f"**Generated:** {timestamp}  \n"
    log_section += f"**Model:** google/gemini-2.5-pro (via OpenRouter)  \n"
    log_section += f"**Brand Direction:** Industrial Precision  \n"
    log_section += f"**Colors:** Deep Navy #0B1426, Electric Gold #D4A017, Steel Silver #8C9EAF, True Black #111111  \n\n"

    for entry in log_entries:
        log_section += f"### {entry['id']} — {entry['title']}\n\n"
        log_section += f"**File:** `{entry['filename']}`  \n"
        log_section += f"**SVG Extracted:** {'Yes' if entry['svg_extracted'] else 'No'} "
        log_section += f"({entry['svg_length']} chars)  \n\n"
        log_section += f"**Prompt:**\n```\n{entry['prompt'].strip()}\n```\n\n"
        log_section += f"**Response:**\n```\n{entry['raw_response'][:3000]}\n```\n\n"
        log_section += "---\n\n"

    # Append or create
    mode = "a" if PROMPTS_LOG.exists() else "w"
    with open(PROMPTS_LOG, mode) as f:
        if mode == "w":
            f.write("# Oceantech Commercial Diving — Brand-2 Logo Prompts & Responses\n")
        f.write(log_section)

    print(f"[OK] Prompts log written to: {PROMPTS_LOG}")

    # ── Summary ──────────────────────────────────────────────────────────────
    print()
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    for r in results:
        status = "OK" if r["success"] else "FAILED"
        print(f"  [{status}] {r['id']} — {r['title']} → {r['filename']}")

    success_count = sum(1 for r in results if r["success"])
    print(f"\n  {success_count}/{len(results)} wordmarks generated successfully.")
    print("=" * 70)


if __name__ == "__main__":
    main()
