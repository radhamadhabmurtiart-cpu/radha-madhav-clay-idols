# Design Brief: Radha Madhav Mrit Shilpalay

## Purpose & Tone
B2B showcase website for artisan clay idol manufacturer. Tone: refined, approachable, authentic. Design prioritizes craftsmanship and heritage over trendy effects.

## Visual Direction
Artisan Heritage: warm earthy aesthetics rooted in clay traditions. Primary palette evokes handmade warmth. Typography balances elegance (display) with accessibility (body). No generic tech defaults.

## Color Palette

| Token | OKLCH | Intent | Light | Dark |
|-------|-------|--------|-------|------|
| Primary (Clay Brown) | `0.5 0.18 40` | CTAs, brand | `0.5 0.18 40` | `0.65 0.15 40` |
| Secondary (Saffron) | `0.72 0.22 65` | Accent, highlight | `0.72 0.22 65` | `0.78 0.18 65` |
| Accent (Terracotta) | `0.55 0.15 25` | Secondary action | `0.55 0.15 25` | `0.68 0.12 25` |
| Success (Sage) | `0.7 0.1 140` | Trust, confirmations | `0.7 0.1 140` | `0.75 0.1 140` |
| Destructive (Deep Red) | `0.6 0.2 10` | Errors, warnings | `0.6 0.2 10` | `0.68 0.18 10` |
| Neutral Bg | `0.97 0.04 80` | Canvas, surfaces | cream | charcoal `0.18 0.01 20` |

## Typography

| Role | Font | Sizes | Usage |
|------|------|-------|-------|
| Display | Fraunces (serif) | 48px (mobile) → 56px (desktop) | Headlines, hero, brand moments |
| Body | Figtree (humanist sans) | 16px base, 14px small | Descriptions, paragraphs, UI text |
| Mono | JetBrainsMono | 12px–14px | Technical details, pricing, code |

Line height: 1.6 (body), 1.3 (display). Letter-spacing: tight on display, normal on body.

## Structural Zones

| Zone | Light BG | Dark BG | Border | Elevation | Purpose |
|------|----------|---------|--------|-----------|---------|
| Header/Nav | `bg-card` | `bg-card` | `border-b-2 border-secondary` | shadow-sm | Premium distinction, navigation |
| Hero | `bg-background` | `bg-background` | none | none | Open, welcoming hero space |
| Content Section | `bg-background` (odd), `bg-muted/5` (even) | layered | `border-t border-muted/20` (alt sections) | none | Content breathing, visual rhythm |
| Card/Product | `bg-card` | `bg-card` | `border border-muted/40` | shadow-elevated | Elevated product showcase |
| CTA Zone | `bg-secondary` | `bg-secondary` | none | shadow-md | High contrast action area |
| Footer | `bg-muted/10` | `bg-muted/30` | `border-t border-muted/30` | none | Grounded closure |

## Spacing & Rhythm
- Base unit: 8px
- Padding: 16px (sm), 24px (md), 32px (lg), 48px (xl) — applied by viewport size
- Gap: 16px (card grids), 24px (sections), 32px (major layouts)
- Mobile-first: single-column products, 2-column at `sm:`, 3-column at `md:`

## Component Patterns
- **Buttons:** Clay brown (`bg-primary`) primary, saffron (`bg-secondary`) secondary, terracotta (`bg-accent`) accent. All `px-6 py-3 rounded-md font-semibold`. Hover: `opacity-90`.
- **Cards:** White background (`bg-card`), subtle shadow (`shadow-elevated`), border, 12px radius. Subtle hover lift (shadow increase).
- **Forms:** Input fields `bg-input border-muted rounded-md`. Focus ring: primary color.
- **Badges:** "Bulk Order Available" in saffron background, terracotta text, small rounded pill.

## Motion & Transitions
- Smooth easing: `cubic-bezier(0.4, 0, 0.2, 1)` across `transition-smooth` utility.
- Button hover: opacity shift `0.3s`, no spin/bounce.
- Sticky buttons (Call/WhatsApp): fade-in on scroll, shadow-elevated.
- Page transitions: fade-in/out `0.2s`.

## Differentiation
Non-generic palette rooted in clay, earth, and Indian traditional aesthetics. Warm saffron accents nod to cultural significance. Typography hierarchy (elegant serif + accessible sans) respects both heritage and modern readability. Elevated shadows and warm card backgrounds avoid flat, corporate feel. Border treatment (warm accents, not grey) reinforces warmth.

## Signature Detail
Saffron borders (2px) on header and accent zones. Warm elevated shadows (`shadow-elevated`) on product cards. Serif display headlines anchor cultural authenticity. Sticky call/WhatsApp zone with clay-brown background maintains accessibility without visual overload.

## Accessibility & Performance
- Minimum contrast ratio 4.5:1 (WCAG AA)
- Color not sole differentiator (icons, text patterns)
- Fonts optimized (WOFF2, font-display: swap)
- Mobile-first viewport strategy
- Sticky CTAs tested for keyboard navigation

## Constraints
- No purple gradients, icy blues, or generic tech palettes
- No animations longer than 0.3s
- Border radius: 0, 8px, 12px only (no arbitrary values)
- All shadows use warm brown overlay, not black
- Saffron used sparingly (accents, secondary action, highlights)
