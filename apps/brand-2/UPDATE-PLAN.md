# Brand-2 Update Plan — Industrial Precision

## Overview
Same feedback as brand-1 but applied through brand-2's dark, commanding lens. Shorter copy, accurate Philippine imagery, mobile fixes.

---

## 1. Terminology Fixes (All Components)

| Find | Replace With |
|------|-------------|
| "first PADI-certified instructors" | "pioneer PADI instructors" |
| "first PADI-certified diving instructors in the Philippines" | "pioneer PADI instructors in the Philippines" |
| "first PADI instructors" | "pioneer PADI instructors" |
| "Crispina Aquatics" | "owners of a PADI dive shop at Costabella Resort" (rephrase to fit brand-2's commanding tone — e.g., "operators of a PADI-accredited dive center at Costabella Resort") |

**Files to update:**
- `src/components/About.tsx`
- `src/components/WhyUs.tsx`
- `brand-materials/brand-writeup.md`
- `brand-materials/brand-strategy.md`
- `brand-materials/brand-guidelines.md`

---

## 2. Copy Reduction (Spare, Weighted — Even More Concise)

Brand-2's voice is already spare, but can be tighter.

### About Section (`About.tsx`)
- **Current:** 3 paragraphs + client roster + authority callout
- **Target:** 2 short paragraphs + client list (1 sentence) + callout
- P1: Founding + capability — 3 sentences max. Declarative.
- P2: PADI pioneer + family discipline — 2 sentences. Facts.
- Client list: Single sentence listing names. No commentary.

### Services Section (`Services.tsx`)
- **Current:** Title + subtitle + full paragraph per service
- **Target:** Title + subtitle + 1 sentence. Brand-2 uses fewer words by design.

### WhyUs Section (`WhyUs.tsx`)
- **Current:** Each reason 2-3 sentences
- **Target:** 1 declarative sentence per reason. Period.

### Process Section (`Process.tsx`)
- **Current:** Each phase 2-3 sentences
- **Target:** 1 sentence per phase. Operational brevity.

---

## 3. Image Regeneration (Philippines-Accurate, Dark Dramatic)

Same accuracy issues as brand-1 but images need dark/cinematic treatment.

| Image | Current Issue | New Prompt Direction |
|-------|--------------|---------------------|
| `hero.png` | Deep-sea helmet, generic ocean | Diver in scuba gear + surface-supplied full-face mask underwater, single dramatic work light, dark navy water, cinematic, Filipino context |
| `about.png` | Western industrial setting, helmets on floor | Commercial diving gear arranged on steel deck of a Philippine work boat, dark moody lighting, welding equipment + scuba BCDs + tanks (NOT deep-sea helmets) |
| `service-welding.png` | Keep if acceptable | Diver in wetsuit + full-face mask welding underwater, bright orange arc, dark water, close-up. No heavy brass helmet. |
| `service-hull.png` | Deep-sea helmet | Diver in scuba gear cleaning massive ship hull, dark tones, single light source, industrial scale |
| `service-inspection.png` | Acceptable | Diver with camera + scuba gear inspecting pier pilings, LED lights, dark water |
| `cta-background.png` | Generic vessel | Aerial twilight shot of Philippine cargo vessel and **bangka support boat** in dark waters, golden reflections |

### Key Differences from Brand-1
- Same accuracy corrections (bangka boats, scuba gear, Filipino crew)
- But color grading is **dark, desaturated, cinematic** — navy shadows, gold highlights
- High contrast, dramatic single-source lighting
- Scale and power emphasized

---

## 4. Mobile View Improvements

### Navbar
- "OCEANTECH OFFSHORE" text should not wrap — reduce to icon-only on very small screens (< 380px) if needed
- "Deploy Our Team" CTA may need to shrink or hide text on mobile
- Verify scroll-to-black works on mobile

### Hero
- Headline "ENGINEERED FOR THE DEEP." — reduce from text-6xl to text-4xl on mobile
- Stack CTAs vertically with full width
- Stats bar: 1 column on mobile
- Ensure dark overlay is sufficient for text legibility on mobile

### About
- Image stacks above text on mobile
- Reduce paragraph count for mobile readability

### Services
- Bento grid → single column
- Image cards need controlled height (not full image bleed)
- Gold border accent should remain visible

### Process
- Stack phases vertically
- Gold connecting line switches to vertical
- Reduce watermark number size

### WhyUs
- Single column on mobile
- Cards need adequate padding

### CTA
- Stack buttons vertically
- Headline size reduction

### Footer
- Collapse to 1 column on mobile
- Gold accents remain

### Brand-2 Specific Mobile Concerns
- Dark backgrounds need sufficient contrast for all text — verify silver (#8C9EAF) text is readable on navy on small screens
- Gold (#D4A017) buttons need sufficient tap target size
- Square buttons (no border-radius) should look intentional, not broken, on mobile

---

## 5. Frontend Design Pro Enhancements

### Signature Details
- Subtle technical grid overlay on hero (CSS pattern with thin divider-color lines)
- Gold accent line animation on section entrance
- Precision measurement marks at section borders (thin crosshair marks)
- Angular section dividers (diagonal lines between sections instead of straight borders)

### Dark Mode Polish
- Verify OLED black (#111111) sections look intentionally different from navy (#0B1426)
- Subtle card elevation on hover (transform + shadow in gold tint)
- Navigation glow effect on active link

### Performance
- Lazy loading on all below-fold images
- Hero image priority
- Dark images compress well — verify sizes are optimized

---

## 6. Execution Order

1. Fix terminology across all files
2. Regenerate images with DALL-E 3 (Philippines-accurate, dark cinematic)
3. Rewrite copy (shorter — brand-2 demands brevity)
4. Update components with new copy + images
5. Mobile responsive fixes
6. Add dark-mode-specific polish (grid overlay, angular dividers)
7. Full browser test at 375px, 768px, 1024px, 1440px
8. Screenshot review and final adjustments
