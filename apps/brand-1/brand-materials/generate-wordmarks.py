#!/usr/bin/env python3
"""
Generate wordmark/lettermark SVG concepts for Oceantech Commercial Diving
using Gemini 2.5 Pro via the OpenRouter API.

The API returns text (SVG code), not raster images.
"""

import json
import re
import urllib.request
import urllib.error
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
PROJECT_ROOT = Path(__file__).resolve().parents[3]          # oceantech-commercial/
ENV_PATH = PROJECT_ROOT / ".env"
LOGOS_DIR = Path(__file__).resolve().parent / "logos"
PROMPTS_MD = Path(__file__).resolve().parent / "logo-prompts.md"

LOGOS_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Read API key from .env
# ---------------------------------------------------------------------------
def load_env(env_path: Path) -> dict:
    """Minimal .env parser (stdlib only)."""
    env = {}
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            env[key.strip()] = value.strip()
    return env

env = load_env(ENV_PATH)
API_KEY = env.get("OPENROUTER_API")
if not API_KEY:
    raise SystemExit("ERROR: OPENROUTER_API not found in .env")

# ---------------------------------------------------------------------------
# OpenRouter / Gemini helper
# ---------------------------------------------------------------------------
API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemini-2.5-pro"

def call_gemini(prompt: str) -> str:
    """Send a prompt to Gemini 2.5 Pro via OpenRouter and return the text."""
    payload = json.dumps({
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
    }).encode()

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
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode() if exc.fp else ""
        raise SystemExit(
            f"OpenRouter HTTP {exc.code}: {exc.reason}\n{error_body}"
        )

    # Extract assistant text from the response
    try:
        return body["choices"][0]["message"]["content"]
    except (KeyError, IndexError):
        raise SystemExit(f"Unexpected API response:\n{json.dumps(body, indent=2)}")

# ---------------------------------------------------------------------------
# SVG extraction helper
# ---------------------------------------------------------------------------
def extract_svg(text: str) -> str:
    """Pull the first <svg>...</svg> block out of a Gemini response."""
    # Try fenced code block first
    m = re.search(r"```(?:svg|xml)?\s*\n(.*?)```", text, re.DOTALL)
    if m:
        candidate = m.group(1).strip()
        if "<svg" in candidate:
            return candidate
    # Fall back to raw <svg>...</svg>
    m = re.search(r"(<svg[\s\S]*?</svg>)", text, re.DOTALL)
    if m:
        return m.group(1).strip()
    # Last resort: return the full response (may need manual cleanup)
    return text.strip()

# ---------------------------------------------------------------------------
# Concept definitions
# ---------------------------------------------------------------------------
CONCEPTS = [
    {
        "id": "W1",
        "filename": "wordmark-01.svg",
        "title": "Wordmark - Bold Geometric",
        "prompt": (
            "You are an expert logo designer. Generate ONLY valid SVG code — no explanations, "
            "no commentary, just the SVG.\n\n"
            "Create a wordmark SVG for the text \"OCEANTECH\".\n"
            "Requirements:\n"
            "- Bold geometric sans-serif letterforms (inspired by Montserrat ExtraBold).\n"
            "- Fill color: deep ocean teal #0A4D68.\n"
            "- Each letter should have subtle angular cuts (small 45-degree notches on corners) "
            "to suggest precision and depth.\n"
            "- Canvas size: 800x200. Center the text vertically and horizontally.\n"
            "- Clean, modern, professional look.\n"
            "- Use <text> or <path> elements — whichever produces the best visual result.\n"
            "- Include a subtle thin horizontal line (#B87333, 1px) running beneath the text "
            "as a grounding accent.\n"
            "- Output a single self-contained <svg> element with xmlns attribute.\n"
        ),
    },
    {
        "id": "W2",
        "filename": "wordmark-02.svg",
        "title": "Wordmark with Tagline",
        "prompt": (
            "You are an expert logo designer. Generate ONLY valid SVG code — no explanations, "
            "no commentary, just the SVG.\n\n"
            "Create a wordmark SVG with two lines of text:\n"
            "Line 1: \"OCEANTECH\" — bold geometric sans-serif (like Montserrat Bold), "
            "fill #0A4D68 (deep ocean teal), font-size roughly 64px.\n"
            "Line 2: \"COMMERCIAL DIVING\" — lighter weight geometric sans-serif "
            "(letter-spacing: 0.35em), fill #B87333 (copper bronze), font-size roughly 20px, "
            "positioned below line 1 with comfortable spacing.\n"
            "- Canvas size: 800x240.\n"
            "- Both lines centered horizontally.\n"
            "- Clean, modern, professional.\n"
            "- Output a single self-contained <svg> element with xmlns attribute.\n"
        ),
    },
    {
        "id": "W3",
        "filename": "wordmark-03.svg",
        "title": "Lettermark - OT Monogram",
        "prompt": (
            "You are an expert logo designer. Generate ONLY valid SVG code — no explanations, "
            "no commentary, just the SVG.\n\n"
            "Create an \"OT\" lettermark / monogram SVG.\n"
            "Requirements:\n"
            "- The letters O and T should interlock or overlap in a geometric design.\n"
            "- Use two brand colors: deep teal #0A4D68 for the O, sunset orange #E85D04 for the T.\n"
            "- Where they overlap, blend or use a darker mixed tone.\n"
            "- Bold, geometric, clean shapes — constructed from rectangles, circles, and arcs "
            "(not a font — draw the letters as <path> or <rect>/<circle> primitives).\n"
            "- Canvas size: 300x300, with the monogram centered.\n"
            "- The design should feel cohesive — a single unified mark, not two separate letters.\n"
            "- Output a single self-contained <svg> element with xmlns attribute.\n"
        ),
    },
    {
        "id": "W4",
        "filename": "wordmark-04.svg",
        "title": "Heritage Wordmark",
        "prompt": (
            "You are an expert logo designer. Generate ONLY valid SVG code — no explanations, "
            "no commentary, just the SVG.\n\n"
            "Create a heritage-style wordmark SVG:\n"
            "Line 1: \"OCEANTECH\" in a clean geometric sans-serif (like Montserrat SemiBold), "
            "fill #2D3436 (charcoal), font-size ~56px, letter-spacing 0.15em.\n"
            "Line 2: A thin decorative horizontal line in copper bronze #B87333, about 60% the "
            "width of line 1, centered beneath it.\n"
            "Line 3: \"Est. 1980\" in a serif font (like Playfair Display or Georgia), "
            "fill #2D3436, font-size ~18px, italic, centered.\n"
            "- Canvas size: 800x220.\n"
            "- Everything centered.\n"
            "- The overall feel should be established, trustworthy, heritage.\n"
            "- Output a single self-contained <svg> element with xmlns attribute.\n"
        ),
    },
]

# ---------------------------------------------------------------------------
# Main execution
# ---------------------------------------------------------------------------
def main():
    md_sections = []
    md_sections.append("\n## Phase 3: Gemini 2.5 Pro Wordmarks\n")
    md_sections.append(
        "SVG wordmark and lettermark concepts generated via Gemini 2.5 Pro "
        "(OpenRouter API) on {date}.\n".format(date="2026-04-01")
    )

    for concept in CONCEPTS:
        label = f"[{concept['id']}] {concept['title']}"
        print(f"\n{'='*60}")
        print(f"  Generating {label} ...")
        print(f"{'='*60}")

        response_text = call_gemini(concept["prompt"])
        svg_code = extract_svg(response_text)

        # Save SVG file
        svg_path = LOGOS_DIR / concept["filename"]
        svg_path.write_text(svg_code, encoding="utf-8")
        print(f"  -> Saved {svg_path}")

        # Build markdown section
        md_sections.append(f"### {label}\n")
        md_sections.append("**Prompt sent to Gemini 2.5 Pro:**\n")
        md_sections.append(f"```\n{concept['prompt'].strip()}\n```\n")
        md_sections.append(f"**Output file:** `logos/{concept['filename']}`\n")
        md_sections.append("**Raw Gemini response (SVG):**\n")
        # Truncate very long responses in the markdown log
        display_response = response_text if len(response_text) < 8000 else response_text[:8000] + "\n... (truncated)"
        md_sections.append(f"```svg\n{display_response}\n```\n")
        md_sections.append("---\n")

    # Write / append to logo-prompts.md
    md_content = "\n".join(md_sections)
    if PROMPTS_MD.exists():
        with open(PROMPTS_MD, "a", encoding="utf-8") as f:
            f.write("\n" + md_content)
        print(f"\nAppended Phase 3 section to {PROMPTS_MD}")
    else:
        with open(PROMPTS_MD, "w", encoding="utf-8") as f:
            f.write("# Oceantech Commercial Diving — Logo Prompt Log\n\n")
            f.write(md_content)
        print(f"\nCreated {PROMPTS_MD}")

    print("\nDone. All wordmark SVGs saved to:", LOGOS_DIR)


if __name__ == "__main__":
    main()
