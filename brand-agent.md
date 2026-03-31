# Multi-Model Branding Agent

## Agent Configuration

```yaml
agent_name: BrandingAgent
version: 1.0.0
description: Multi-model AI agent for comprehensive logo and branding creation
models:
  strategy: claude-opus-4-6
  image_generation_primary: dall-e-3
  image_generation_secondary: gemini-2.5-pro
  guidelines: claude-opus-4-6
capabilities:

- brand_strategy_development
- logo_concept_generation
- brand_guidelines_creation
- visual_identity_design
- iterative_refinement
```

---

## Model Capabilities Matrix

```python
MODEL_CAPABILITIES = {
    "claude-opus-4-6": {
        "strengths": [
            "brand_strategy",
            "brand_personas",
            "messaging_frameworks",
            "brand_guidelines",
            "copywriting",
            "prompt_refinement",
            "creative_direction"
        ],
        "limitations": ["cannot_generate_images"],
        "use_for": [
            "Phase 1: Brand Strategy",
            "Phase 5: Brand Guidelines",
            "Prompt optimization for image models"
        ]
    },
    "dall-e-3": {
        "strengths": [
            "artistic_concepts",
            "abstract_logos",
            "icon_generation",
            "visual_brainstorming",
            "style_variety"
        ],
        "limitations": [
            "text_rendering_imperfect",
            "raster_output_only",
            "no_vector_export"
        ],
        "use_for": [
            "Phase 2: Logo Generation",
            "Abstract and artistic logos",
            "Icon-based designs",
            "Visual exploration"
        ]
    },
    "gemini-2.5-pro": {
        "strengths": [
            "accurate_text_rendering",
            "wordmarks",
            "typography_heavy_designs",
            "product_mockups"
        ],
        "limitations": [
            "raster_output_only",
            "no_vector_export"
        ],
        "use_for": [
            "Phase 3: Text-heavy logos",
            "Wordmarks",
            "Logos requiring precise text"
        ]
    }
}

def select_model_for_task(task_type: str) -> str:
    """Route tasks to appropriate model."""
    routing = {
        "brand_strategy": "claude-opus-4-6",
        "brand_personas": "claude-opus-4-6",
        "messaging": "claude-opus-4-6",
        "brand_guidelines": "claude-opus-4-6",
        "prompt_optimization": "claude-opus-4-6",
        "abstract_logo": "dall-e-3",
        "icon_logo": "dall-e-3",
        "emblem_logo": "dall-e-3",
        "mascot_logo": "dall-e-3",
        "artistic_concept": "dall-e-3",
        "wordmark": "gemini-2.5-pro",
        "lettermark": "gemini-2.5-pro",
        "text_heavy_logo": "gemini-2.5-pro",
        "typography_design": "gemini-2.5-pro"
    }
    return routing.get(task_type, "dall-e-3")
```

---

## Phase 1: Brand Strategy Development

**Model:** Claude Opus 4.6

### Input Schema

```python
BRAND_STRATEGY_INPUT = {
    "company_name": str,
    "industry": str,
    "target_audience": str,
    "competitors": list[str],  # optional
    "unique_value_proposition": str,  # optional
    "brand_personality_keywords": list[str],  # optional
    "budget_tier": str  # "startup", "mid-market", "enterprise"
}
```

### Strategy Prompt Template

```python
BRAND_STRATEGY_PROMPT = """
You are a senior brand strategist. Develop a comprehensive brand strategy for:

**Company:** {company_name}
**Industry:** {industry}
**Target Audience:** {target_audience}
**Competitors:** {competitors}
**Unique Value:** {unique_value_proposition}

Create the following deliverables:

## 1. Brand Purpose Statement
A clear, inspiring statement of why this brand exists beyond profit.

## 2. Target Audience Personas (3)
For each persona include:

- Name and demographic profile
- Psychographic traits
- Pain points and desires
- How the brand serves them

## 3. Brand Values (3-5)
Core principles that guide all brand decisions.

## 4. Competitive Positioning Statement
Format: For [target audience], [brand] is the [category] that [key benefit] because [reason to believe].

## 5. Brand Personality

- Archetype (e.g., Hero, Sage, Creator)
- Personality traits (5 adjectives)
- Voice characteristics

## 6. Visual Direction Brief
Describe the visual aesthetic that would embody this brand:

- Mood and emotional response
- Style keywords (modern, vintage, minimalist, etc.)
- Color psychology recommendations
- Industry-appropriate considerations
"""
```

### Expected Output Structure

```python
BRAND_STRATEGY_OUTPUT = {
    "brand_purpose": str,
    "personas": list[dict],
    "brand_values": list[str],
    "positioning_statement": str,
    "brand_personality": {
        "archetype": str,
        "traits": list[str],
        "voice": dict
    },
    "visual_direction": {
        "mood": str,
        "style_keywords": list[str],
        "color_recommendations": list[str],
        "aesthetic_notes": str
    }
}
```

---

## Phase 2: Logo Generation with DALL-E 3

**Model:** DALL-E 3

### Prompt Architecture

```python
DALLE3_PROMPT_STRUCTURE = {
    "components": [
        "style",           # Visual aesthetic
        "composition",     # Logo type/layout
        "subject",         # Core icon/symbol
        "color_palette",   # Colors and mood
        "constraints"      # Technical requirements
    ],
    "template": """
{style} {composition} logo for {brand_name}, a {industry} company.
The icon should be {subject_description}.
Use {color_palette}.
{additional_style_notes}.
{constraints}
""",
    "default_constraints": "No gradients, flat design, simple, vector style, on white background."
}
```

### Logo Type Prompts

```python
LOGO_TYPE_PROMPTS = {
    "lettermark": {
        "description": "Logo using initials or single letter",
        "template": "A lettermark logo of the letter '{letter}', {style} font, vector, simple, minimal --no realistic details, no gradients",
        "example": "A lettermark logo of the letter 'E', geometric sans-serif font, vector, simple, minimal, navy blue --no realistic details"
    },
    "wordmark": {
        "description": "Logo using full company name as typography",
        "template": "A wordmark logo for '{brand_name}', {font_style} typography, {style}, vector, clean lines --no icons, no symbols",
        "example": "A wordmark logo for 'VANTARA', bold geometric sans-serif typography, minimalist, vector, clean lines, black on white --no icons"
    },
    "icon_logo": {
        "description": "Symbol or icon without text",
        "template": "A {style} icon logo representing {concept}, {color_palette}, flat vector, simple geometric shapes --no text, no letters",
        "example": "A minimalist icon logo representing data analytics, deep teal and electric blue, flat vector, simple geometric shapes --no text"
    },
    "emblem": {
        "description": "Icon enclosed in a shape with text",
        "template": "An emblem logo for '{brand_name}', {icon_description} enclosed in a {shape}, {style}, {color_palette}, vector --no photorealistic details",
        "example": "An emblem logo for 'Summit Brewing', mountain peak enclosed in a circular badge, vintage style, amber and brown, vector"
    },
    "mascot": {
        "description": "Character-based logo",
        "template": "A mascot logo featuring a {character}, {style}, {color_palette}, simple vector illustration --no shading, no complex details",
        "example": "A mascot logo featuring a friendly owl, modern flat style, purple and gold, simple vector illustration --no shading"
    },
    "combination": {
        "description": "Icon + wordmark together",
        "template": "A combination logo for '{brand_name}' with {icon_description} positioned {position} the text, {style}, {color_palette}, flat vector",
        "example": "A combination logo for 'Greenleaf' with a stylized leaf icon positioned to the left of the text, modern minimalist, forest green, flat vector"
    }
}
```

### Power Keywords Library

```python
DALLE3_KEYWORDS = {
    "artistic_styles": [
        "Art Deco",
        "Bauhaus",
        "Swiss Style",
        "Mid-Century Modern",
        "Cyberpunk",
        "Brutalist",
        "Memphis Design",
        "Constructivist",
        "De Stijl",
        "Streamline Moderne"
    ],
    "visual_textures": [
        "Matte",
        "Glossy",
        "Metallic",
        "Engraved",
        "Screen-printed",
        "Paper cutout",
        "Embossed",
        "Letterpress",
        "Neon glow",
        "Holographic"
    ],
    "design_principles": [
        "Negative space",
        "Geometric",
        "Symmetrical",
        "Asymmetrical",
        "Abstract",
        "Minimalist",
        "Monoline",
        "Duotone",
        "Isometric",
        "Flat design"
    ],
    "quality_modifiers": [
        "Clean lines",
        "High contrast",
        "Bold",
        "Subtle",
        "Elegant",
        "Playful",
        "Professional",
        "Modern",
        "Timeless",
        "Sophisticated"
    ],
    "technical_constraints": [
        "flat vector",
        "simple",
        "no gradients",
        "no realistic details",
        "no photorealistic",
        "single color",
        "two-color",
        "monochrome",
        "on white background",
        "on black background"
    ],
    "famous_designers": [
        "by Paul Rand",      # Minimalist, simplistic
        "by Saul Bass",      # Bold, graphic, striking
        "by Milton Glaser",  # Colorful, expressive
        "by Massimo Vignelli", # Grid-based, systematic
        "by Paula Scher"     # Typographic, energetic
    ]
}
```

### Industry-Specific Prompts

```python
INDUSTRY_PROMPTS = {
    "tech_saas": """
Minimalist vector logo for a SaaS {subcategory} company named '{brand_name}'.
The icon should be a stylized {icon_concept} formed by clean, single-weight lines.
Use a color palette of {primary_color} and {accent_color}.
The overall feel should be intelligent, precise, and forward-thinking.
No gradients, no complex textures, flat design, on white background.
""",
    "wellness_organic": """
Modern emblem logo for a wellness brand '{brand_name}'.
The central icon should be a stylized {natural_element}, with the shape subtly integrating {secondary_element}.
The style should be clean, elegant, and monoline.
Use a warm, earthy {color} color.
The design should feel calming and grounded.
Avoid photorealism, ensure it's a single, cohesive symbol.
""",
    "corporate_professional": """
Corporate logo for a {industry} firm '{brand_name}'.
The icon should be a strong, geometric {shape}, with clean sections.
The negative space should subtly form {hidden_element}.
The design must be symmetrical and convey trust, security, and expertise.
Color palette: {primary_color} and {secondary_color}.
No gradients, no illustrative details, professional vector style.
""",
    "creative_playful": """
Playful, modern logo for '{brand_name}', a {industry} brand.
The icon should be a {character_or_object} with {distinctive_feature}.
Use bright, energetic colors: {color_palette}.
The style should be friendly, approachable, and memorable.
Flat vector illustration, simple shapes, no complex shading.
""",
    "luxury_premium": """
Elegant, sophisticated logo for luxury brand '{brand_name}'.
The design should feature {elegant_element} with refined, thin lines.
Use {metallic_color} on {background_color} background.
The aesthetic should convey exclusivity, craftsmanship, and timeless elegance.
Minimalist, no unnecessary elements, high-end feel.
"""
}
```

### Refinement Prompts

```python
REFINEMENT_PROMPTS = {
    "simplify": "Simplify this design further. Remove unnecessary details. Make it more minimal.",
    "color_invert": "Invert the colors. Make the {element} {new_color} on {new_background} background.",
    "thicker_lines": "Make all lines thicker and bolder. Increase the weight of the strokes.",
    "thinner_lines": "Make all lines thinner and more delicate. Reduce the stroke weight.",
    "more_geometric": "Make the design more geometric. Use cleaner angles and mathematical shapes.",
    "more_organic": "Make the design more organic. Soften the edges and add subtle curves.",
    "add_negative_space": "Incorporate clever use of negative space to create a hidden element.",
    "change_composition": "Reposition the elements. Place the icon {position} the text.",
    "style_shift": "Recreate this concept in a {new_style} style while keeping the core idea.",
    "color_change": "Change the color palette to {new_colors} while maintaining the same design."
}
```

---

## Phase 3: Logo Generation with Gemini

**Model:** Gemini 2.5 Pro

### When to Use Gemini vs DALL-E 3

```python
def select_generation_model(logo_requirements: dict) -> str:
    """
    Decision tree for selecting image generation model.
    """
    # Gemini excels at text rendering
    if logo_requirements.get("has_text", False):
        text_importance = logo_requirements.get("text_importance", "low")
        if text_importance in ["high", "critical"]:
            return "gemini-2.5-pro"

    # Gemini for wordmarks and lettermarks
    if logo_requirements.get("logo_type") in ["wordmark", "lettermark"]:
        return "gemini-2.5-pro"

    # DALL-E 3 for artistic and abstract concepts
    if logo_requirements.get("style") in ["artistic", "abstract", "illustrative"]:
        return "dall-e-3"

    # DALL-E 3 for mascots and complex icons
    if logo_requirements.get("logo_type") in ["mascot", "emblem", "icon"]:
        return "dall-e-3"

    # Default to DALL-E 3
    return "dall-e-3"
```

### Gemini Prompting Rules

```python
GEMINI_PROMPTING_RULES = {
    "principle": "Describe the scene narratively, don't just list keywords",
    "text_handling": "Wrap exact text in quotation marks",
    "structure": """
Create a {image_type} for {brand/concept} with the text "{exact_text}"
in a {font_style}. The design should be {style_description},
with a {color_scheme}.
""",
    "best_practices": [
        "Use complete sentences, not keyword lists",
        "Specify exact text in quotes",
        "Describe the overall composition",
        "Include color scheme explicitly",
        "Mention the intended use (logo, badge, etc.)"
    ]
}
```

### Gemini Logo Prompts

```python
GEMINI_PROMPTS = {
    "wordmark": """
Create a modern, minimalist wordmark logo with the text "{brand_name}"
in a {font_style} font. The design should be clean and professional,
with a {color_scheme} color scheme. The letters should have
{distinctive_feature}. Suitable for a {industry} company.
""",
    "lettermark": """
Create a lettermark logo featuring the letter "{letter}" for a company
called "{brand_name}". The letter should be designed in a {style} style,
using {color_palette}. The design should convey {brand_attributes}.
Clean, vector-style illustration.
""",
    "text_badge": """
Create a badge-style logo for "{brand_name}" with the text prominently
displayed in a {font_style} font. The badge should be {shape} shaped,
with {decorative_elements}. Use {color_scheme}. The overall feel
should be {mood}.
""",
    "monogram": """
Create a monogram logo combining the letters "{letters}" for "{brand_name}".
The letters should interlock or overlap in a {style} way.
Use {color_palette}. The design should feel {brand_attributes}.
Clean, scalable vector style.
"""
}
```

---

## Phase 4: Post-Processing Pipeline

### Vectorization Workflow

```python
VECTORIZATION_WORKFLOW = {
    "step_1": {
        "action": "Export highest resolution",
        "details": "Save AI-generated logo at maximum resolution (PNG preferred)"
    },
    "step_2": {
        "action": "Auto-vectorize",
        "tools": [
            {"name": "Vectorizer.AI", "url": "https://vectorizer.ai/", "quality": "high"},
            {"name": "FreeSVGConverter", "url": "https://freesvgconverter.com/", "quality": "good"},
            {"name": "Adobe Illustrator Image Trace", "quality": "high", "manual": True},
            {"name": "Inkscape Trace Bitmap", "quality": "good", "free": True}
        ]
    },
    "step_3": {
        "action": "Manual refinement",
        "tasks": [
            "Clean up anchor points",
            "Smooth curves",
            "Ensure perfect symmetry where needed",
            "Optimize path complexity"
        ]
    },
    "step_4": {
        "action": "Recreate text",
        "details": "Always recreate text elements manually with proper fonts",
        "reason": "AI-generated text is never perfect enough for final use"
    },
    "step_5": {
        "action": "Export formats",
        "formats": [
            {"format": "SVG", "use": "Web, scalable applications"},
            {"format": "AI", "use": "Adobe ecosystem, print"},
            {"format": "EPS", "use": "Legacy print systems"},
            {"format": "PNG", "use": "Digital use, transparency"},
            {"format": "PDF", "use": "Print, documents"}
        ]
    }
}
```

### Quality Checklist

```python
LOGO_QUALITY_CHECKLIST = {
    "scalability": [
        "Readable at 16x16 pixels (favicon)",
        "Clean at 32x32 pixels (small icon)",
        "Detailed version for large formats"
    ],
    "versatility": [
        "Works on white background",
        "Works on black background",
        "Works on colored backgrounds",
        "Works in single color (black)",
        "Works in reversed color (white)"
    ],
    "technical": [
        "Vector format available",
        "No unnecessary complexity",
        "Optimized file size",
        "Proper color profiles (RGB for digital, CMYK for print)"
    ],
    "brand_alignment": [
        "Reflects brand personality",
        "Appropriate for industry",
        "Memorable and distinctive",
        "Timeless (not overly trendy)"
    ]
}
```

---

## Phase 5: Brand Guidelines Creation

**Model:** Claude Opus 4.6

### Guidelines Document Structure

```python
BRAND_GUIDELINES_STRUCTURE = {
    "sections": [
        {
            "name": "Brand Overview",
            "contents": ["Brand story", "Mission", "Vision", "Values"]
        },
        {
            "name": "Logo",
            "contents": [
                "Primary logo",
                "Logo variations (horizontal, stacked, icon only)",
                "Clear space requirements",
                "Minimum size specifications",
                "Incorrect usage examples"
            ]
        },
        {
            "name": "Color Palette",
            "contents": [
                "Primary colors (with HEX, RGB, CMYK, Pantone)",
                "Secondary colors",
                "Accent colors",
                "Color usage ratios",
                "Accessible color combinations"
            ]
        },
        {
            "name": "Typography",
            "contents": [
                "Primary typeface",
                "Secondary typeface",
                "Font weights and sizes",
                "Hierarchy guidelines",
                "Web-safe alternatives"
            ]
        },
        {
            "name": "Imagery",
            "contents": [
                "Photography style",
                "Illustration style",
                "Iconography",
                "Image treatment guidelines"
            ]
        },
        {
            "name": "Voice & Tone",
            "contents": [
                "Brand voice characteristics",
                "Tone variations by context",
                "Writing dos and don'ts",
                "Example copy"
            ]
        },
        {
            "name": "Applications",
            "contents": [
                "Business cards",
                "Letterhead",
                "Email signatures",
                "Social media profiles",
                "Website guidelines"
            ]
        }
    ]
}
```

### Guidelines Generation Prompt

```python
BRAND_GUIDELINES_PROMPT = """
Create comprehensive brand guidelines for {brand_name} based on the following:

**Brand Strategy:**
{brand_strategy_summary}

**Logo Description:**
{logo_description}

**Color Palette:**
Primary: {primary_color}
Secondary: {secondary_colors}

Generate a complete brand guidelines document including:

## 1. Brand Overview

- Brand story (2-3 paragraphs)
- Mission statement
- Vision statement
- Core values with descriptions

## 2. Logo Guidelines

- Clear space rules (use logo height as unit)
- Minimum sizes for print and digital
- Approved color variations
- Backgrounds: approved and prohibited
- Common misuse examples to avoid

## 3. Color Specifications
For each color provide:

- Color name
- HEX code
- RGB values
- CMYK values
- Pantone (closest match)
- Usage guidelines

## 4. Typography

- Primary font: {primary_font} - usage guidelines
- Secondary font: {secondary_font} - usage guidelines
- Size hierarchy (H1, H2, H3, body, caption)
- Line height and spacing rules

## 5. Voice & Tone

- Brand voice attributes (3-5 characteristics)
- Tone spectrum (formal to casual)
- Writing guidelines
- Words to use / Words to avoid

## 6. Application Examples

- Business card layout
- Email signature format
- Social media profile guidelines
"""
```

---

## Workflow Orchestration

### Complete Agent Workflow

```python
class BrandingAgent:
    """
    Multi-model branding agent orchestrator.
    """

    def __init__(self, config: dict):
        self.claude = ClaudeClient(config["claude_api_key"])
        self.dalle = DalleClient(config["openai_api_key"])
        self.gemini = GeminiClient(config["google_api_key"])
        self.workflow_state = {}

    async def execute_branding_workflow(self, brief: dict) -> dict:
        """
        Execute complete branding workflow.
        """
        results = {}

        # Phase 1: Brand Strategy (Claude)
        print("Phase 1: Developing brand strategy...")
        results["strategy"] = await self.develop_brand_strategy(brief)

        # Phase 2 & 3: Logo Generation (DALL-E 3 or Gemini)
        print("Phase 2-3: Generating logo concepts...")
        results["logo_concepts"] = await self.generate_logo_concepts(
            brief, 
            results["strategy"]
        )

        # Phase 4: User selects preferred concept
        selected_concept = await self.get_user_selection(results["logo_concepts"])
        results["selected_logo"] = selected_concept

        # Phase 5: Brand Guidelines (Claude)
        print("Phase 5: Creating brand guidelines...")
        results["guidelines"] = await self.create_brand_guidelines(
            brief,
            results["strategy"],
            results["selected_logo"]
        )

        return results

    async def develop_brand_strategy(self, brief: dict) -> dict:
        """Phase 1: Use Claude for brand strategy."""
        prompt = BRAND_STRATEGY_PROMPT.format(**brief)
        response = await self.claude.generate(prompt)
        return self.parse_strategy_response(response)

    async def generate_logo_concepts(
        self, 
        brief: dict, 
        strategy: dict,
        num_concepts: int = 10
    ) -> list:
        """Phase 2-3: Generate logo concepts with appropriate model."""
        concepts = []

        # Determine which model to use
        model = select_generation_model({
            "has_text": brief.get("include_text", True),
            "text_importance": brief.get("text_importance", "medium"),
            "logo_type": brief.get("logo_type", "combination"),
            "style": brief.get("style", "modern")
        })

        # Generate concepts
        for i in range(num_concepts):
            prompt = self.build_logo_prompt(brief, strategy, variation=i)

            if model == "gemini-2.5-pro":
                image = await self.gemini.generate_image(prompt)
            else:
                image = await self.dalle.generate_image(prompt)

            concepts.append({
                "image": image,
                "prompt": prompt,
                "model": model,
                "iteration": i
            })

        return concepts

    async def refine_logo(
        self, 
        concept: dict, 
        refinement_instruction: str
    ) -> dict:
        """Iteratively refine a logo concept."""
        model = concept["model"]

        # Build refinement prompt
        prompt = f"{concept['prompt']}\n\nRefinement: {refinement_instruction}"

        if model == "gemini-2.5-pro":
            image = await self.gemini.generate_image(prompt)
        else:
            image = await self.dalle.generate_image(prompt)

        return {
            "image": image,
            "prompt": prompt,
            "model": model,
            "parent_concept": concept
        }

    async def create_brand_guidelines(
        self,
        brief: dict,
        strategy: dict,
        selected_logo: dict
    ) -> str:
        """Phase 5: Use Claude to create brand guidelines."""
        prompt = BRAND_GUIDELINES_PROMPT.format(
            brand_name=brief["company_name"],
            brand_strategy_summary=self.summarize_strategy(strategy),
            logo_description=selected_logo.get("description", ""),
            primary_color=brief.get("primary_color", "To be determined"),
            secondary_colors=brief.get("secondary_colors", "To be determined"),
            primary_font=brief.get("primary_font", "To be determined"),
            secondary_font=brief.get("secondary_font", "To be determined")
        )

        response = await self.claude.generate(prompt)
        return response
```

---

## Error Handling

```python
ERROR_HANDLING = {
    "content_policy_violation": {
        "cause": "Prompt triggered safety filters",
        "solution": "Remove potentially problematic terms, simplify prompt",
        "fallback": "Use more generic industry terms"
    },
    "text_rendering_failure": {
        "cause": "AI failed to render text correctly",
        "solution": "Switch to Gemini for text-heavy logos",
        "fallback": "Generate icon only, add text in post-processing"
    },
    "style_inconsistency": {
        "cause": "Generated images don't match requested style",
        "solution": "Add more specific style keywords, reference famous designers",
        "fallback": "Generate multiple variations, select closest match"
    },
    "complexity_issues": {
        "cause": "Logo too complex for scalability",
        "solution": "Add 'simple', 'minimal', 'flat' keywords",
        "fallback": "Request simplification in refinement prompt"
    },
    "color_mismatch": {
        "cause": "Colors don't match specification",
        "solution": "Use specific color names, add 'only' qualifier",
        "fallback": "Adjust colors in post-processing"
    },
    "rate_limiting": {
        "cause": "Too many API requests",
        "solution": "Implement exponential backoff",
        "fallback": "Switch to alternate model temporarily"
    }
}
```

---

## Quick Reference Cards

### Prompt Checklist

```markdown
## DALL-E 3 Logo Prompt Checklist

- [ ] Style specified (minimalist, modern, vintage, etc.)
- [ ] Logo type defined (wordmark, icon, emblem, etc.)
- [ ] Subject/icon described clearly
- [ ] Color palette specified
- [ ] Constraints included (no gradients, flat, simple)
- [ ] Background specified (on white background)
- [ ] Negative keywords added (--no realistic details)
```

### Model Selection Quick Reference

| Logo Type | Primary Model | Reason |
|-----------|---------------|--------|
| Wordmark | Gemini 2.5 Pro | Better text rendering |
| Lettermark | Gemini 2.5 Pro | Better text rendering |
| Icon/Symbol | DALL-E 3 | Better artistic concepts |
| Mascot | DALL-E 3 | Better character design |
| Emblem | DALL-E 3 | Better composition |
| Abstract | DALL-E 3 | Better artistic freedom |
| Monogram | Gemini 2.5 Pro | Better letter handling |

### Output Formats Checklist

```markdown
## Required Deliverables

- [ ] SVG (vector, scalable)
- [ ] PNG (transparent background, high-res)
- [ ] PNG (on white background)
- [ ] PNG (on black background)
- [ ] Favicon (16x16, 32x32, 48x48)
- [ ] Social media sizes (various)
- [ ] PDF (for print)
- [ ] AI/EPS (for designers)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-01 | Initial release |

---

## License

This agent documentation is provided for internal use. Adapt and extend as needed for your specific implementation.
