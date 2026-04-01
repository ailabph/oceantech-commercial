#!/usr/bin/env python3
"""
Generate Brand-3 "Rugged Authenticity" wordmark SVGs via Gemini 2.5 Pro (OpenRouter).
"""

import json
import os
import re
import urllib.request
import urllib.error
import time

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
ENV_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".env"
)
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logos")
PROMPTS_MD = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logo-prompts.md")

MODEL = "google/gemini-2.5-pro"
API_URL = "https://openrouter.ai/api/v1/chat/completions"


def load_api_key() -> str:
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("OPENROUTER_API="):
                return line.split("=", 1)[1]
    raise RuntimeError("OPENROUTER_API not found in .env")


API_KEY = load_api_key()

# ---------------------------------------------------------------------------
# Prompts — 4 wordmark concepts
# ---------------------------------------------------------------------------
CONCEPTS: list[dict] = [
    {
        "id": "wordmark-01",
        "label": "W1 – Rugged Wordmark",
        "prompt": """You are an expert SVG designer. Generate a complete, valid SVG file (start with <svg and end with </svg>) for the following logo concept.

CONCEPT: "Rugged Wordmark"
- The word "OCEANTECH" in heavy, characterful all-caps lettering.
- Color: Deep Sea Green #1B4332.
- The letterforms should look slightly rough, textured, hand-painted or stamped — achieve this using SVG filters (feTurbulence + feDisplacementMap) applied to the text so edges feel organic and imperfect.
- Below the text, add a thin horizontal underline in Rust #C1440E, also with a slight rough texture.
- Use font-family 'Archivo Black', sans-serif with font-weight 900, font-size around 72px.
- Canvas size: 600x160, background transparent.
- The design should feel like a rugged outdoor heritage brand mark.

Return ONLY the SVG code, nothing else. No markdown fences. Start with <svg and end with </svg>.""",
    },
    {
        "id": "wordmark-02",
        "label": "W2 – Wordmark with Tagline",
        "prompt": """You are an expert SVG designer. Generate a complete, valid SVG file (start with <svg and end with </svg>) for the following logo concept.

CONCEPT: "Wordmark with Tagline — Heritage Label"
- Top line: "OCEANTECH" in bold heavy all-caps, color Deep Sea Green #1B4332, font-family 'Bitter', serif, font-weight 700, font-size ~64px.
- Below it, a thin horizontal rule line in Rust #C1440E (1-2px stroke), spanning about 80% of the text width, centered.
- Below the rule: "COMMERCIAL DIVING · EST. 1980" in Sand #D4A574, small-caps style (use text-transform or just uppercase), font-family 'Work Sans', sans-serif, font-weight 600, font-size ~16px, letter-spacing 3px.
- The overall feel should be like a heritage workwear label — structured, honest, timeless.
- Canvas size: 600x180, background transparent.

Return ONLY the SVG code, nothing else. No markdown fences. Start with <svg and end with </svg>.""",
    },
    {
        "id": "wordmark-03",
        "label": "W3 – Stacked with Dot Separator",
        "prompt": """You are an expert SVG designer. Generate a complete, valid SVG file (start with <svg and end with </svg>) for the following logo concept.

CONCEPT: "Stacked with Dot/Diamond Separator"
- "OCEAN" on the first line, "TECH" on the second line, both centered.
- Both in heavy all-caps, Deep Sea Green #1B4332, font-family 'Archivo Black', sans-serif, font-weight 900, font-size ~80px.
- Between the two words, centered, place a small diamond shape (rotated square) in Rust #C1440E, about 10x10px.
- The overall look should be bold, simple, and utilitarian — like a stamp on industrial diving equipment.
- Canvas size: 400x220, background transparent.

Return ONLY the SVG code, nothing else. No markdown fences. Start with <svg and end with </svg>.""",
    },
    {
        "id": "wordmark-04",
        "label": "W4 – Full Heritage Lockup",
        "prompt": """You are an expert SVG designer. Generate a complete, valid SVG file (start with <svg and end with </svg>) for the following logo concept.

CONCEPT: "Full Heritage Lockup"
- Main text: "OCEANTECH" in heavy slab-serif all-caps, Deep Sea Green #1B4332, font-family 'Bitter', serif, font-weight 700, font-size ~60px.
- Below: a thin decorative double-rule (two thin parallel horizontal lines) in Rust #C1440E, spanning ~70% of text width, centered.
- Below the rules: "MARIBAGO, CEBU · EST. 1980" in Sand #D4A574, all-caps, font-family 'Work Sans', sans-serif, font-weight 500, font-size ~14px, letter-spacing 4px, centered.
- Optional: a very subtle thin border or bracket accent on left and right edges in Espresso #3C2415 to frame the lockup, giving it a vintage label/badge feel.
- Canvas size: 620x200, background transparent.
- The whole thing should feel like a heritage brand label you'd find on quality equipment.

Return ONLY the SVG code, nothing else. No markdown fences. Start with <svg and end with </svg>.""",
    },
]


def extract_svg(text: str) -> str | None:
    """Pull the first <svg …>…</svg> block out of the response text."""
    # Try to find SVG with or without markdown fences
    match = re.search(r"(<svg[\s\S]*?</svg>)", text, re.IGNORECASE)
    return match.group(1) if match else None


def call_gemini(prompt: str, attempt: int = 1, max_attempts: int = 3) -> str:
    """Call Gemini 2.5 Pro via OpenRouter and return the assistant content."""
    payload = json.dumps(
        {
            "model": MODEL,
            "messages": [{"role": "user", "content": prompt}],
        }
    ).encode()

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            body = json.loads(resp.read().decode())
        content = body["choices"][0]["message"]["content"]
        return content
    except (urllib.error.HTTPError, urllib.error.URLError, KeyError) as exc:
        print(f"  [!] Attempt {attempt}/{max_attempts} failed: {exc}")
        if attempt < max_attempts:
            wait = 5 * attempt
            print(f"      Retrying in {wait}s …")
            time.sleep(wait)
            return call_gemini(prompt, attempt + 1, max_attempts)
        raise RuntimeError(f"API call failed after {max_attempts} attempts") from exc


def main() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    results: list[dict] = []

    for concept in CONCEPTS:
        cid = concept["id"]
        label = concept["label"]
        prompt = concept["prompt"]

        print(f"\n{'='*60}")
        print(f"Generating {cid}: {label}")
        print(f"{'='*60}")

        raw = call_gemini(prompt)
        svg = extract_svg(raw)

        if svg is None:
            print(f"  [!] Could not extract SVG from response for {cid}.")
            print(f"      Raw response (first 300 chars): {raw[:300]}")
            results.append({"id": cid, "label": label, "status": "FAILED"})
            continue

        out_path = os.path.join(OUTPUT_DIR, f"{cid}.svg")
        with open(out_path, "w") as f:
            f.write(svg)

        print(f"  -> Saved {out_path}  ({len(svg)} bytes)")
        results.append({"id": cid, "label": label, "status": "OK", "bytes": len(svg)})

    # ------------------------------------------------------------------
    # Append to logo-prompts.md
    # ------------------------------------------------------------------
    print(f"\n{'='*60}")
    print("Writing logo-prompts.md …")
    print(f"{'='*60}")

    md_section = "\n## Phase 3: Gemini 2.5 Pro Wordmarks\n\n"
    md_section += "**Model:** `google/gemini-2.5-pro` via OpenRouter\n"
    md_section += "**Brand Direction:** Brand-3 — Rugged Authenticity\n"
    md_section += "**Colors:** Deep Sea Green #1B4332 | Rust #C1440E | Sand #D4A574 | Espresso #3C2415 | Warm Cream #FAF3E8\n\n"

    for concept in CONCEPTS:
        cid = concept["id"]
        label = concept["label"]
        md_section += f"### {label}\n"
        md_section += f"- **File:** `logos/{cid}.svg`\n"
        md_section += f"- **Prompt:**\n\n```\n{concept['prompt'].strip()}\n```\n\n"

    md_section += "---\n"

    mode = "a" if os.path.exists(PROMPTS_MD) else "w"
    with open(PROMPTS_MD, mode) as f:
        if mode == "w":
            f.write("# Oceantech Commercial Diving — Logo Prompts\n")
        f.write(md_section)

    print(f"  -> Updated {PROMPTS_MD}")

    # ------------------------------------------------------------------
    # Summary
    # ------------------------------------------------------------------
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    for r in results:
        status = r["status"]
        extra = f" ({r['bytes']} bytes)" if status == "OK" else ""
        print(f"  {r['id']}: {status}{extra}  — {r['label']}")
    print()


if __name__ == "__main__":
    main()
