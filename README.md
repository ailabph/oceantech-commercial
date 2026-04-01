# Oceantech Commercial Diving

Commercial website for Oceantech Commercial Diving — underwater welding, hull cleaning, structural repair, and precision marine operations.

## About

Oceantech Commercial Diving is a newly established company backed by decades of hands-on experience. The team behind Oceantech has been active in recreational scuba diving since 1981 — operating out of Crispina Aquatics at Costabella Tropical Beach Resort in Maribago, Mactan Island. The founders are the first PADI-certified instructors in the Philippines, pioneering recreational diving in the Cebu region.

The team has been performing commercial diving work — including underwater welding, hull cleaning, and other underwater commercial services — since 2016.

While the company is new, the expertise is not. This is a family business with 45 years in the water.

The main dive shop is located in Maribago, Lapu-Lapu City, Cebu, Philippines.

## Tech Stack

- [Next.js](https://nextjs.org/)

## Branding

Brand strategy, logo generation, and guidelines are driven by a multi-model agent workflow defined in `brand-agent.md`. Models used:

- **Claude Opus 4.6** — brand strategy and guidelines (via OpenRouter)
- **DALL-E 3** — logo and image generation (via OpenAI API)
- **Gemini 2.5 Pro** — text-heavy logos and wordmarks (via OpenRouter)

## Scripts

| Script | Description |
|--------|-------------|
| `script/checking-models.py` | Validates API keys and checks model availability for OpenRouter and OpenAI |
| `script/test-dall-e.py` | Generates a test image with DALL-E 3 to verify access |

## Setup

1. Copy `env.example` to `.env` and add your API keys:

```bash
cp env.example .env
```

2. Required environment variables:

| Variable | Description |
|----------|-------------|
| `OPENROUTER_API` | OpenRouter API key (for Claude and Gemini) |
| `OPENAI_API` | OpenAI API key (for DALL-E 3) |

3. Verify model access:

```bash
python3 script/checking-models.py
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
