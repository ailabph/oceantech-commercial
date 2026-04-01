# Brand-1 Update Plan — Heritage Warmth

## Overview
Comprehensive update addressing feedback on copy length, image accuracy, terminology, and mobile experience.

---

## 1. Terminology Fixes (All Components)

| Find | Replace With |
|------|-------------|
| "first PADI-certified instructors" | "pioneer PADI instructors" |
| "first PADI instructors" | "pioneer PADI instructors" |
| "the first PADI-certified diving instructors in the Philippines" | "pioneer PADI instructors in the Philippines" |
| "Crispina Aquatics" | "owners of a PADI dive shop at Costabella Resort" |

**Files to update:**
- `src/components/About.tsx`
- `src/components/WhyUs.tsx`
- `src/components/Hero.tsx` (if referenced)
- `src/components/Footer.tsx` (if referenced)
- `brand-materials/brand-writeup.md`
- `brand-materials/brand-strategy.md`
- `brand-materials/brand-guidelines.md`

---

## 2. Copy Reduction (Shorter, Tighter)

### About Section (`About.tsx`)
- **Current:** 4 long paragraphs + heritage callout + PADI badge = very dense wall of text
- **Target:** 2 concise paragraphs + 1 short client paragraph + heritage callout
- P1: Combine founding story + PADI pioneer into 3-4 sentences (cut from ~8 sentences)
- P2: Mission/approach in 2-3 sentences (cut from ~5)
- P3: Client list — keep as-is but tighten to one sentence
- Remove redundant phrases that repeat "45 years" multiple times

### Services Section (`Services.tsx`)
- **Current:** Each service has title + subtitle + full paragraph
- **Target:** Title + subtitle + 1 sentence max (not a paragraph)
- Cut descriptions by ~60%

### WhyUs Section (`WhyUs.tsx`)
- **Current:** Each reason has 2-3 sentences
- **Target:** Each reason = 1 punchy sentence
- The cards are small — less text reads better

### Process Section (`Process.tsx`)
- **Current:** Each step has 2-3 sentences
- **Target:** 1 sentence per step — process should be scannable

### CTA Section (`CTA.tsx`)
- **Current:** Supporting paragraph is 2 sentences
- **Target:** Keep as-is (already concise)

---

## 3. Image Regeneration (Philippines-Accurate)

### Problem
Current DALL-E images show:
- Western-style dive boats (should be **bangka/outrigger boats** — the standard vessel in Cebu)
- Deep-sea diving helmets (Oceantech uses **standard scuba gear** — wetsuit + tanks or surface-supplied mask, NOT copper helmets)
- Generic tropical settings (should feel specifically **Cebu/Visayas** — bangka boats, local harbors, Filipino crew)

### Images to Regenerate

| Image | Current Issue | New Prompt Direction |
|-------|--------------|---------------------|
| `hero.png` | Western diver with heavy helmet | Diver in standard scuba gear (wetsuit + BCD + tank) descending in clear tropical water, warm teal/orange light, Cebu-style |
| `about.png` | Western dive boat, non-Filipino crew | Filipino dive crew preparing gear on a **bangka outrigger boat** at sunrise in a Cebu harbor, warm golden light |
| `service-welding.png` | Deep-sea helmet diver | Diver in scuba mask and wetsuit performing underwater welding, orange arc, no heavy helmet |
| `service-hull.png` | Deep-sea helmet | Diver in scuba gear with surface-supplied mask cleaning a ship hull, using hydraulic brush |
| `service-inspection.png` | Acceptable but could improve | Diver with camera inspecting concrete pier pilings, standard scuba gear, tropical clear water |
| `cta-background.png` | Western-style vessel | Aerial view of **bangka outrigger boats** moored in calm turquoise water near a Philippine harbor village |

### Key Visual References
- Boats: **Bangka/banca** — narrow hull, bamboo outriggers, colorful paint, motorized. "Jeeps of the Sea"
- Crew: Filipino, wearing rash guards or wetsuits, standard scuba BCDs
- Gear: Standard scuba (tank, BCD, regulator, mask) or lightweight surface-supplied full-face mask — NOT old-style copper/brass diving helmets
- Setting: Cebu coastal — clear turquoise water, limestone islands, bangka boats, local harbors

---

## 4. Mobile View Improvements

### Navbar
- Verify hamburger menu works and closes properly
- Logo + "OCEANTECH OFFSHORE" should not overflow on small screens
- Reduce logo icon to 28px on mobile, text to text-sm

### Hero
- Reduce headline from text-4xl to text-3xl on mobile
- Ensure CTAs stack vertically with full width
- Stats bar: stack to 1 column on mobile with proper spacing
- Reduce vertical padding

### About
- Image should stack above text on mobile (currently beside)
- Reduce paragraph text size for readability
- Pull-quote should have smaller text on mobile

### Services
- Bento grid should collapse to single column on mobile
- Image cards need proper aspect ratio on small screens
- Reduce card padding

### Process
- Steps should stack vertically on mobile (not horizontal)
- Remove connecting lines on mobile
- Reduce step number size

### WhyUs
- Cards should be single column on mobile
- Reduce card padding and icon size

### CTA
- Stack buttons vertically on mobile
- Reduce headline size

### Footer
- 4 columns should collapse to 2x2 then 1 column
- Verify all text is readable at small sizes

### General Mobile Rules
- Max body text: 16px (never smaller)
- Adequate tap targets: min 44px for all interactive elements
- Horizontal padding: min 20px (px-5) on all sections
- No horizontal overflow/scroll

---

## 5. Frontend Design Pro Enhancements

### Signature Details to Add
- Subtle grain texture overlay on hero section (CSS `grain` class already exists)
- Smooth scroll-reveal animation on section entrance (IntersectionObserver)
- Copper accent line animation on scroll
- Hero stat counter animation (count up from 0)

### Typography Refinements
- Ensure Montserrat is rendering (not falling back to system font)
- Add proper letter-spacing to overlines
- Heritage callout should use Playfair Display italic correctly

### Performance
- Add `loading="lazy"` to all below-fold images
- Ensure hero image has `priority` flag
- Verify no layout shift (CLS) from images

---

## 6. Execution Order

1. Fix terminology across all files (quick find-replace)
2. Regenerate images with DALL-E 3 (Philippines-accurate prompts)
3. Rewrite copy (shorter, tighter)
4. Update components with new copy + images
5. Mobile responsive fixes
6. Add frontend polish (animations, grain, scroll effects)
7. Full browser test at 375px, 768px, 1024px, 1440px
8. Screenshot review and final adjustments
