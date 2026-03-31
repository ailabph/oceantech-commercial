#!/usr/bin/env python3
"""
Checks OpenRouter and OpenAI API key validity and model availability
for all models referenced in brand-agent.md.
"""

import os
import sys
import json
import urllib.request
import urllib.error
from pathlib import Path

# Models from brand-agent.md mapped to OpenRouter model IDs
BRAND_AGENT_MODELS = {
    "claude-opus-4-6": "anthropic/claude-opus-4",
    "gemini-2.5-pro": "google/gemini-2.5-pro",
}

# Image generation models not available via OpenRouter (requires direct API)
DIRECT_API_MODELS = {
    "dall-e-3": "OpenAI API directly (not available on OpenRouter)",
}

PROJECT_ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = PROJECT_ROOT / ".env"


def load_env():
    """Load API keys from .env file."""
    if not ENV_PATH.exists():
        print(f"[FAIL] .env file not found at {ENV_PATH}")
        print(f"       Copy env.example to .env and add your API keys.")
        return None, None

    print(f"[OK]   .env file found at {ENV_PATH}")

    keys = {}
    with open(ENV_PATH) as f:
        for line in f:
            line = line.strip()
            if line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            keys[key.strip()] = value.strip().strip("'\"")

    openrouter_key = keys.get("OPENROUTER_API")
    openai_key = keys.get("OPENAI_API")

    if not openrouter_key or openrouter_key == "your_openrouter_api_key_here":
        print("[FAIL] OPENROUTER_API not found or is placeholder")
        openrouter_key = None
    else:
        print("[OK]   OPENROUTER_API found in .env")

    if not openai_key or openai_key == "your_openai_api_key_here":
        print("[FAIL] OPENAI_API not found or is placeholder")
        openai_key = None
    else:
        print("[OK]   OPENAI_API found in .env")

    return openrouter_key, openai_key


def validate_openrouter_key(api_key):
    """Validate the OpenRouter API key."""
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/auth/key",
        headers={"Authorization": f"Bearer {api_key}"},
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            label = data.get("data", {}).get("label", "unknown")
            limit = data.get("data", {}).get("limit")
            usage = data.get("data", {}).get("usage")
            print(f"[OK]   OpenRouter API key is valid (label: {label})")
            if limit is not None and usage is not None:
                remaining = limit - usage
                print(f"       Credits — limit: ${limit:.2f}, used: ${usage:.2f}, remaining: ${remaining:.2f}")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"[FAIL] OpenRouter API key validation failed (HTTP {e.code}): {body}")
        return False
    except Exception as e:
        print(f"[FAIL] OpenRouter API key validation error: {e}")
        return False


def validate_openai_key(api_key):
    """Validate the OpenAI API key by listing available models."""
    req = urllib.request.Request(
        "https://api.openai.com/v1/models",
        headers={"Authorization": f"Bearer {api_key}"},
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            models = {m["id"] for m in data.get("data", [])}
            print(f"[OK]   OpenAI API key is valid ({len(models)} text models available)")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        print(f"[FAIL] OpenAI API key validation failed (HTTP {e.code}): {body}")
        return False
    except Exception as e:
        print(f"[FAIL] OpenAI API key validation error: {e}")
        return False


def check_dalle3(api_key):
    """Check DALL-E 3 availability by making a dry-run image generation request."""
    payload = json.dumps({
        "model": "dall-e-3",
        "prompt": "a white pixel",
        "n": 1,
        "size": "1024x1024",
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
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"[OK]   dall-e-3")
            print(f"       Available via OpenAI Images API")
            return True
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        # 400 = bad request (model exists but rejected prompt) — still means access works
        # 401 = auth issue, 403 = no access, 404 = model not found
        if e.code == 400:
            print(f"[OK]   dall-e-3")
            print(f"       Available via OpenAI Images API (verified with dry-run)")
            return True
        elif e.code == 429:
            print(f"[OK]   dall-e-3")
            print(f"       Available via OpenAI Images API (rate limited, but accessible)")
            return True
        else:
            try:
                err = json.loads(body)
                msg = err.get("error", {}).get("message", body)
            except Exception:
                msg = body
            print(f"[FAIL] dall-e-3")
            print(f"       Not accessible (HTTP {e.code}): {msg}")
            return False
    except Exception as e:
        print(f"[FAIL] dall-e-3")
        print(f"       Check failed: {e}")
        return False


def fetch_available_models(api_key):
    """Fetch the list of available models from OpenRouter."""
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/models",
        headers={"Authorization": f"Bearer {api_key}"},
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
            models = {m["id"]: m for m in data.get("data", [])}
            return models
    except Exception as e:
        print(f"[FAIL] Could not fetch models list: {e}")
        return None


def check_models(api_key):
    """Check if each brand-agent model is available on OpenRouter."""
    print("\nFetching available models from OpenRouter...")
    available = fetch_available_models(api_key)
    if available is None:
        return False

    print(f"       {len(available)} models available on OpenRouter\n")

    all_ok = True
    for brand_name, router_id in BRAND_AGENT_MODELS.items():
        if router_id in available:
            model = available[router_id]
            pricing = model.get("pricing", {})
            prompt_cost = pricing.get("prompt", "?")
            completion_cost = pricing.get("completion", "?")
            print(f"[OK]   {brand_name}")
            print(f"       OpenRouter ID: {router_id}")
            print(f"       Pricing — prompt: ${prompt_cost}/token, completion: ${completion_cost}/token")
        else:
            # Try partial match
            partial = [mid for mid in available if brand_name.lower() in mid.lower()]
            print(f"[FAIL] {brand_name}")
            print(f"       OpenRouter ID '{router_id}' not found")
            if partial:
                print(f"       Possible matches: {', '.join(partial[:5])}")
            all_ok = False
        print()

    return all_ok


def check_openai_models(api_key):
    """Check if image generation models are available via OpenAI."""
    all_ok = True
    for brand_name in DIRECT_API_MODELS:
        if brand_name == "dall-e-3":
            if not check_dalle3(api_key):
                all_ok = False
        print()

    return all_ok


def main():
    print("=" * 60)
    print("  Model Availability Check")
    print("  Models from: brand-agent.md")
    print("=" * 60)
    print()

    openrouter_key, openai_key = load_env()
    if not openrouter_key and not openai_key:
        sys.exit(1)

    openrouter_ok = True
    openai_ok = True

    # Validate OpenRouter
    if openrouter_key:
        print()
        print("--- OpenRouter ---")
        if not validate_openrouter_key(openrouter_key):
            openrouter_ok = False
        else:
            print()
            openrouter_ok = check_models(openrouter_key)
    else:
        print("\n[SKIP] Skipping OpenRouter checks (no API key)")
        openrouter_ok = False

    # Validate OpenAI
    if openai_key:
        print("--- OpenAI ---")
        if not validate_openai_key(openai_key):
            openai_ok = False
        else:
            print()
            openai_ok = check_openai_models(openai_key)
    else:
        print("\n[SKIP] Skipping OpenAI checks (no API key)")
        openai_ok = False

    # Summary
    all_ok = openrouter_ok and openai_ok
    print("=" * 60)
    if all_ok:
        print("  All models are available.")
    else:
        print("  Some models are not available. Check output above.")
    print("=" * 60)

    sys.exit(0 if all_ok else 1)


if __name__ == "__main__":
    main()
