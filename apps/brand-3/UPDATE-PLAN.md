# Brand-3 Update Plan — Rugged Authenticity

## Overview
Same feedback as other brands but applied through brand-3's documentary, conversational lens. Shorter copy, accurate Philippine imagery (this brand benefits most from local accuracy), mobile fixes.

---

## 1. Terminology Fixes (All Components)

| Find | Replace With |
|------|-------------|
| "first PADI-certified instructors" | "pioneer PADI instructors" |
| "first PADI-certified diving instructors in the Philippines" | "pioneer PADI instructors in the Philippines" |
| "first PADI instructors" | "pioneer PADI instructors" |
| "Crispina Aquatics" | Rephrase to fit brand-3's conversational tone — e.g., "the family ran a PADI dive shop out of Costabella Resort" or "they built a dive shop at Costabella Resort on Mactan" |

**Files to update:**
- `src/components/About.tsx`
- `src/components/WhyUs.tsx`
- `brand-materials/brand-writeup.md`
- `brand-materials/brand-strategy.md`
- `brand-materials/brand-guidelines.md`

---

## 2. Copy Reduction (Still Conversational, But Tighter)

Brand-3 has the longest copy by design (storytelling voice), but it can be edited down without losing character.

### About Section (`About.tsx`)
- **Current:** 4 full paragraphs + pull-quote + PADI badge = longest about section of all 3 brands
- **Target:** 2 narrative paragraphs + client paragraph (short) + pull-quote
- P1: Founding story — keep the Maribago/Cebu Strait opening, but cut from ~8 sentences to 4-5. Keep the voice, lose the repetition.
- P2: Transition to commercial — 2-3 sentences. "35 years of salt water" line is strong, keep it.
- P3: Client list — tighten to 2 sentences (names + "word of mouth, one hull at a time")
- Pull-quote: Keep as-is (it's punchy and on-brand)

### Services Section (`Services.tsx`)
- **Current:** Each service is 2-3 conversational sentences
- **Target:** Title + 1 conversational sentence. The voice stays, the word count drops.
- Keep the best line from each ("Steel doesn't care that it's submerged", "Marine growth is a tax", etc.)

### WhyUs Section (`WhyUs.tsx`)
- **Current:** Each reason 2-3 sentences
- **Target:** 1 honest sentence per reason. Brand-3 is direct — fewer words is more authentic.

### Process Section (`Process.tsx`)
- **Current:** Each step 2-3 sentences (conversational)
- **Target:** 1 sentence per step. The headings ("You tell us what's going on") already carry the voice.

---

## 3. Image Regeneration (Philippines-Accurate, Documentary)

Brand-3 benefits MOST from local accuracy — its entire identity is about authenticity and place.

| Image | Current Issue | New Prompt Direction |
|-------|--------------|---------------------|
| `hero.png` | Western wooden boat, not a bangka | Diver sitting on edge of a **Philippine bangka outrigger boat** gearing up with scuba tank and BCD, warm morning light, Cebu harbor with other bangkas in background, documentary film grain, earthy warm tones |
| `about.png` | Western-style boat, non-Filipino couple | Filipino dive crew sharing moment on a **bangka boat** deck after a dive, Cebu harbor with fishing bangkas in background, warm golden hour, candid documentary, film grain |
| `service-welding.png` | Heavy helmet, dramatic | Diver in wetsuit and scuba mask performing underwater welding, warm orange glow, natural murky water, documentary style, NOT glamorized, film grain |
| `service-hull.png` | Deep-sea helmet, dramatic | Filipino diver entering water from a work bangka next to a large vessel hull, team handing down scuba gear, natural daylight, Cebu harbor, documentary candid |
| `service-inspection.png` | Acceptable but helmet | Diver with camera and scuba gear inspecting concrete pier pilings, natural light, tropical water, documentary style |
| `cta-background.png` | Beautiful but generic | Aerial view of **traditional bangka outrigger boats** moored in calm turquoise water near a Cebu harbor village, wooden boats, warm afternoon light, documentary drone photography |

### Key Differences from Other Brands
- **Most emphasis on local accuracy** — bangka boats are essential for brand-3
- Documentary/candid feel — NOT polished or cinematic
- Film grain texture, slightly warm/desaturated
- Filipino crew visible and central to composition
- Cebu-specific settings (Maribago, Mactan, harbor villages)

### Visual References for DALL-E Prompts
- **Bangka boat**: narrow hull, two bamboo outriggers, colorful paint (blue/green/red), motorized, bench seats, canopy
- **Dive gear**: standard scuba BCD + tank, or lightweight full-face mask with surface supply hose — NOT old brass/copper deep-dive helmets
- **Filipino divers**: wearing rash guards, board shorts, or thin wetsuits (warm water — not thick neoprene)
- **Cebu harbor**: bangka boats, fishing boats, small concrete piers, palm trees, limestone islands in distance

---

## 4. Mobile View Improvements

### Navbar
- Logo icon (32px) + "OCEANTECH OFFSHORE" — verify no overflow
- "Tell Us What You Need" CTA may need shorter text on mobile ("Contact Us")
- Green background on scroll needs to be fully opaque on mobile

### Hero
- Mixed-case headline is long ("Some crews talk about the water. We work in it.") — reduce to text-3xl on mobile
- Subheadline is very long — consider hiding the second sentence on mobile or shortening
- Stack CTAs vertically
- Stats bar: 1 column, reduce text size

### About
- Image above text on mobile
- Pull-quote needs smaller font + less left-padding
- PADI badge inline (not floating)

### Services
- Single column on mobile
- Image cards: controlled aspect ratio
- Text cards: reduce padding, keep green left-border

### Process
- Stack vertically
- Rust connecting line vertical or hidden on mobile
- Step numbers smaller

### WhyUs (Dark Green Section)
- Single column
- Verify cream text on green is readable at all sizes
- Icons + titles should not wrap awkwardly

### CTA
- Stack buttons
- Reduce headline size

### Footer (Espresso)
- 1 column on mobile
- Verify cream/40 text is readable on espresso background
- Heritage italic text may need slightly higher opacity on mobile for readability

### Brand-3 Specific Mobile Concerns
- Warm cream backgrounds — verify text contrast is sufficient (espresso on cream)
- Bitter italic font in pull-quotes needs to be readable on small screens
- Film grain overlay should be subtle enough to not affect readability

---

## 5. Frontend Design Pro Enhancements

### Signature Details
- Film grain texture overlay on hero and CTA sections (`.grain` class exists in CSS)
- Subtle paper/canvas texture on cream sections
- Hand-drawn style horizontal rule dividers between sections (SVG or CSS)
- Scroll-reveal with a gentle fade-up on section entrance
- Pull-quote entrance animation (fade from left with border extending)

### Typography Polish
- Archivo Black should be rendering for display — verify
- Bitter italic for pull-quotes needs proper font-style
- Work Sans for body — clean, warm, readable

### Organic Details
- Rounded-sm on all cards (NOT sharp corners — that's brand-2)
- Warm shadow tints (shadow with brown/sand tint, not gray)
- Border colors should use sand or green, never gray

### Performance
- Lazy loading all below-fold images
- Hero priority
- Film grain SVG should be lightweight

---

## 6. Execution Order

1. Fix terminology across all files
2. Regenerate images with DALL-E 3 (bangka boats, scuba gear, Filipino crew, documentary style)
3. Rewrite copy (shorter but keep the voice — edit, don't sterilize)
4. Update components with new copy + images
5. Mobile responsive fixes
6. Add documentary polish (grain, paper texture, hand-drawn rules, scroll reveals)
7. Full browser test at 375px, 768px, 1024px, 1440px
8. Screenshot review and final adjustments
