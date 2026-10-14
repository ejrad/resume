---
name: frutiger-aero-gabri
description: Glossy eco-tech 2000s aesthetic (Windows Vista/7 era) — translucent glass UI, aqua-green palette, water droplets, bubbles and auroras. Use for optimistic nature-meets-technology interfaces, splash pages, and eco-brand sites.---

# Frutiger Aero

The visual language of roughly 2004–2013: Windows Vista/7's Aero glass, early
iOS skeuomorphism, and Web 2.0-era promo art. Named after Adrian Frutiger's
typeface + Windows Aero (backronym: "Authentic, Energetic, Reflective, and
Open"); the term was coined in 2017 by Sofi Xian of the Consumer Aesthetics
Research Institute (aesthetics.fandom.com/wiki/Frutiger_Aero ✅).

## Principles

1. **Glossy, not flat.** Every interactive surface suggests physical depth: a
   two-zone gradient (light upper half, darker lower half) with a sharp white
   specular highlight at the top — the classic "Aqua" glass sheen.
2. **Translucent, not opaque.** Backgrounds behave like frosted glass: sense
   the color behind, but can't read through it. 60–85% opacity + blur.
3. **Nature + technology in harmony.** Lush green fields, blue skies, water
   droplets, bubbles, lens flares, auroras, bokeh — technology framed as clean,
   eco-friendly, and human. The utopian vision is the point, not decoration.
4. **Humanist and legible.** Humanist sans-serifs (Frutiger, Segoe UI, Myriad
   Pro); technology should feel friendly and clear, never cryptic or dark.
5. **Optimistic brightness.** This is a daylight aesthetic. Avoid dark themes
   entirely; light washes over everything (deep shadows + bright top highlights
   on objects are fine, the page itself stays bright).

## Color

The canon palette is white, green, and blue (Aesthetics Wiki ✅). Exact hexes
below are community approximations (⚠️), cross-referenced against revival-era
implementations (🟡 where noted).

| Token | Hex | Role | Legend |
|---|---|---|---|
| `--aero-sky` | `#6EC6F5` | Primary sky blue — hero washes, primary buttons | ⚠️ |
| `--aero-deep` | `#1B7FBF` | Deep water blue — button lower halves, headings on light | ⚠️ |
| `--aero-aqua` | `#54D6C5` | Aqua green-teal — accents, progress fills, orb rims | ⚠️ |
| `--aero-leaf` | `#7CC94E` | Leaf green — nature accents, success states | ⚠️ |
| `--aero-grass` | `#3E9E4F` | Deep grass green — footer bands, grounded surfaces | ⚠️ |
| `--aero-ice` | `#EAF7FE` | Icy highlight — page bg tint, card inner glow | ⚠️ |
| `--aero-white` | `#FFFFFF` | Gloss white — highlights, glass surfaces | ✅ |
| `--aero-ink` | `#1E3A4C` | Text ink — dark slate-blue, never pure black | ⚠️ |
| `--aero-glass` | `rgba(255,255,255,0.60)` | Frosted glass fill (60–85% opacity range) | 🟡 |

Hero backgrounds layer aurora-style radial washes of sky → aqua → leaf over
ice-white, with bokeh dots and a soft lens flare. Text always sits on a
stabilized surface (glass card or lightened band) — never directly over
high-luminance photography.

## Typography

- **Real faces:** Frutiger (1976, Adrian Frutiger — the namesake) ✅,
  Segoe UI (Windows Vista/7 system font) ✅, Myriad Pro ✅.
- **Free substitute:** Nunito (Google Fonts) — rounded, humanist, close in
  spirit; fallback stack: `"Nunito", "Segoe UI", "Frutiger", system-ui,
  sans-serif`.
- **Rules:** Sentence case everywhere; headings semibold–bold (700–800),
  generous letter-spacing on eyebrows (0.12em uppercase small caps feel);
  body 16–18px with relaxed line-height (1.6). No condensed or techy
  mono faces — warmth over precision.

## Layout & spacing

- **Airy and centered.** Generous whitespace; content breathes like a
  sunlit meadow. Max content width ~1120px, 24–32px gutters.
- **Radius:** 14–22px cards, fully rounded (999px) pills for buttons and
  badges. Nothing sharp — sharp corners read as "corporate 2010s flat".
- **Depth:** Deep soft drop shadows (`0 12px 32px rgba(27,127,191,.25)`) paired
  with bright 1–2px white top-edge highlights. Shadows are cool-blue tinted,
  never neutral gray.
- **Glass zones:** Translucent frosted panels (`backdrop-filter: blur(14px)`)
  float over nature imagery; content blocks separated by air, not hairlines.

## Components

### 1. Gloss button (the signature)

```html
<button class="aero-btn">Download AquaNova</button>
<style>
.aero-btn {
  font: 700 16px "Nunito","Segoe UI",system-ui,sans-serif;
  color: #fff; text-shadow: 0 1px 2px rgba(0,60,100,.35);
  padding: 14px 34px; border-radius: 999px; cursor: pointer;
  border: 1px solid rgba(255,255,255,.65);
  /* two-zone gloss: bright sheen top half, deeper aqua bottom half */
  background:
    linear-gradient(to bottom,
      rgba(255,255,255,.85) 0%, rgba(255,255,255,.28) 48%,
      rgba(255,255,255,0) 50%),
    linear-gradient(to bottom, #7FD4F7 0%, #2E9BD6 50%, #1B7FBF 100%);
  box-shadow: 0 6px 18px rgba(27,127,191,.45),
              inset 0 1px 0 rgba(255,255,255,.9),
              inset 0 -2px 6px rgba(0,60,100,.25);
  transition: transform .18s ease, box-shadow .18s ease, filter .18s ease;
}
.aero-btn:hover { filter: brightness(1.08); transform: translateY(-1px) scale(1.02);
  box-shadow: 0 10px 24px rgba(27,127,191,.5), inset 0 1px 0 rgba(255,255,255,.95); }
.aero-btn:active { transform: translateY(1px) scale(.99); }
</style>
```

### 2. Glass card

```html
<div class="aero-card">
  <h3>Pure by design</h3>
  <p>Five-stage filtration in a shell of recycled glass.</p>
</div>
<style>
.aero-card {
  background: linear-gradient(to bottom, rgba(255,255,255,.78), rgba(255,255,255,.55));
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,.8); border-radius: 20px;
  padding: 28px; color: #1E3A4C;
  box-shadow: 0 12px 32px rgba(27,127,191,.22), inset 0 1px 0 #fff;
}
</style>
```

### 3. Aero window panel (Vista-style)

```html
<div class="aero-window">
  <div class="aero-titlebar"><span class="orb"></span> AquaNova Console</div>
  <div class="aero-body">Window content here.</div>
</div>
<style>
.aero-window { border-radius: 12px; overflow: hidden;
  border: 1px solid rgba(255,255,255,.7);
  box-shadow: 0 18px 48px rgba(27,127,191,.35); }
.aero-titlebar {
  padding: 10px 16px; font-weight: 700; color: #0F2E44;
  background: linear-gradient(to bottom, rgba(255,255,255,.85), rgba(190,230,250,.45));
  backdrop-filter: blur(18px); border-bottom: 1px solid rgba(255,255,255,.6);
  display: flex; align-items: center; gap: 10px;
}
.aero-titlebar .orb { width: 18px; height: 18px; border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff 0%, #9fdcf5 35%, #2E9BD6 100%);
  box-shadow: inset 0 -2px 4px rgba(0,60,100,.4), 0 1px 3px rgba(0,60,100,.3); }
.aero-body { background: rgba(255,255,255,.92); padding: 24px; }
</style>
```

### 4. Glass orb (divider / icon container)

```html
<div class="aero-orb"></div>
<style>
.aero-orb { width: 96px; height: 96px; border-radius: 50%; position: relative;
  background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.95) 0%,
    rgba(255,255,255,.25) 22%, rgba(159,220,245,.18) 55%, rgba(46,155,214,.35) 100%);
  border: 1px solid rgba(255,255,255,.85);
  box-shadow: inset -6px -8px 18px rgba(27,127,191,.25),
              inset 4px 6px 12px rgba(255,255,255,.6),
              0 10px 24px rgba(27,127,191,.3); }
.aero-orb::after { /* specular highlight */
  content:""; position:absolute; top:12%; left:16%; width:34%; height:22%;
  border-radius:50%; background: rgba(255,255,255,.85); filter: blur(2px);
  transform: rotate(-24deg); }
</style>
```

### 5. Water-droplet badge

```html
<span class="drop-badge">Eco certified</span>
<style>
.drop-badge { display:inline-flex; align-items:center; gap:8px;
  font-weight:800; font-size:13px; color:#0F5E8C;
  padding:8px 18px 8px 12px; border-radius:999px;
  background: linear-gradient(to bottom, #fff, #DFF3FD);
  border:1px solid rgba(46,155,214,.4);
  box-shadow: inset 0 1px 0 #fff, 0 4px 10px rgba(27,127,191,.25); }
.drop-badge::before { content:""; width:16px; height:20px;
  background: radial-gradient(circle at 35% 30%, #fff 0%, #7FD4F7 40%, #1B7FBF 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  clip-path: ellipse(50% 50% at 50% 55%); /* softened droplet */ }
</style>
```

### 6. Gloss progress bar

```html
<div class="aero-progress"><span style="width:72%"></span></div>
<style>
.aero-progress { height: 22px; border-radius: 999px; padding: 3px;
  background: linear-gradient(to bottom, #cfe9f8, #f4fbff);
  border: 1px solid rgba(46,155,214,.35);
  box-shadow: inset 0 2px 5px rgba(27,127,191,.25); }
.aero-progress span { display:block; height:100%; border-radius:999px;
  background:
    linear-gradient(to bottom, rgba(255,255,255,.9) 0%, rgba(255,255,255,.25) 49%, rgba(255,255,255,0) 51%),
    linear-gradient(to right, #54D6C5, #2E9BD6);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.8); transition: width .6s ease; }
</style>
```

### 7. Pill tab control

```html
<div class="aero-tabs">
  <button class="on">Overview</button><button>Specs</button><button>Reviews</button>
</div>
<style>
.aero-tabs { display:inline-flex; gap:6px; padding:6px; border-radius:999px;
  background: rgba(255,255,255,.55); backdrop-filter: blur(10px);
  border:1px solid rgba(255,255,255,.8);
  box-shadow: inset 0 2px 6px rgba(27,127,191,.15); }
.aero-tabs button { border:0; border-radius:999px; padding:10px 24px;
  font:700 14px "Nunito","Segoe UI",sans-serif; color:#2E6E94; background:transparent; cursor:pointer; }
.aero-tabs button.on { color:#fff; text-shadow:0 1px 2px rgba(0,60,100,.35);
  background: linear-gradient(to bottom,#7FD4F7,#1B7FBF);
  box-shadow: 0 4px 10px rgba(27,127,191,.4), inset 0 1px 0 rgba(255,255,255,.7); }
</style>
```

### 8. Glossy inset search field

```html
<input class="aero-search" placeholder="Search the clear web…">
<style>
.aero-search { width:100%; max-width:420px; padding:13px 22px; border-radius:999px;
  font:600 15px "Nunito","Segoe UI",sans-serif; color:#1E3A4C; outline:none;
  background: linear-gradient(to bottom, #e8f5fd, #ffffff 60%);
  border:1px solid rgba(46,155,214,.45);
  box-shadow: inset 0 3px 8px rgba(27,127,191,.18), 0 1px 0 #fff; }
.aero-search:focus { border-color:#2E9BD6;
  box-shadow: inset 0 3px 8px rgba(27,127,191,.18), 0 0 0 4px rgba(110,198,245,.35); }
</style>
```

### 9. Aurora hero band

```css
.aero-hero {
  background:
    radial-gradient(60% 90% at 15% 10%, rgba(255,255,255,.75), transparent 60%),
    radial-gradient(50% 70% at 85% 20%, rgba(124,201,78,.35), transparent 60%),
    radial-gradient(70% 100% at 50% 110%, rgba(84,214,197,.45), transparent 60%),
    linear-gradient(to bottom, #BEE6FB 0%, #8FD2F6 45%, #D9F3E4 100%);
}
```

### 10. Bokeh / bubble layer (decorative)

```html
<div class="aero-bubbles" aria-hidden="true">
  <i style="--x:12%; --s:64px; --d:14s"></i>
  <i style="--x:38%; --s:34px; --d:10s"></i>
  <i style="--x:71%; --s:88px; --d:18s"></i>
</div>
<style>
.aero-bubbles i { position:absolute; bottom:-10%; left:var(--x);
  width:var(--s); height:var(--s); border-radius:50%;
  background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.9),
    rgba(255,255,255,.12) 45%, rgba(159,220,245,.25));
  border:1px solid rgba(255,255,255,.7);
  animation: rise var(--d) linear infinite; }
@keyframes rise { to { transform: translateY(-120vh); } }
@media (prefers-reduced-motion: reduce) { .aero-bubbles i { animation:none; } }
</style>
```

## Motion

- Signature: gentle float + bouncy settle. Easing `cubic-bezier(.34,1.56,.64,1)`
  (overshoot) for playful entrances, 300–500ms; ambient loops (bubbles,
  aurora drift) 10–20s linear infinite.
- Gloss sweep on hover for primary buttons (a diagonal white sheen crossing
  the surface, ~600ms).
- Respect `prefers-reduced-motion`: freeze ambient animation, keep state
  changes instant. Bubbles and light are atmospheric, never communicative.

## Do / Don't

- ✅ DO put every button's brightest highlight on its top half (overhead-light
  gloss); ❌ DON'T use flat single-tone fills on primary actions.
- ✅ DO frame tech with nature (grass at the footer, droplets, sky gradients);
  ❌ DON'T drop the nature frame and ship generic shine — that's Web 2.0 gloss,
  not Frutiger Aero.
- ✅ DO keep the page bright — aurora washes over ice-white; ❌ DON'T build a
  dark-mode version (the canon is daylight; deep shadows on objects are fine).
- ✅ DO use translucency at 60–85% with real blur for glass; ❌ DON'T use
  low-saturation gray glass — Aero glass is saturated and reflective.
- ✅ DO tint shadows cool blue (`rgba(27,127,191,…)`); ❌ DON'T use neutral
  gray shadows — they read as flat-design, not glass.
- ✅ DO use Segoe UI / Nunito humanist sans, sentence case; ❌ DON'T use
  condensed, mono, or "techy" typefaces for UI text.

## Copy voice

Optimistic, fresh, human: technology as clean water and clear skies. Short
sentences, welcoming verbs, zero cynicism.

- "Breathe easy. Your home, filtered by nature and finished by science."
- "Clear water, clear conscience — meet the purifier that thinks like a forest."
- "The future feels like this: bright, open, and effortlessly clean."

## Sources

- Aesthetics Wiki — Frutiger Aero (aesthetics.fandom.com/wiki/Frutiger_Aero):
  canon definition, 2004–2013 range, white/green/blue palette, motifs
  (skeuomorphism, gloss, cloudy skies, fish/water/bubbles, lens flares,
  auroras, bokeh), "Authentic, Energetic, Reflective, and Open", term coined
  2017 by Sofi Xian.
- marso-design/aesthetics-wiki (GitHub mirror): Windows Aero translucency,
  tactile gradients vs. later flat design, nature–technology utopian blend.
- hongquandev/aesthetic-frontend-skills: implementation analysis — rounded
  desktop-era controls, watery heroes, orb icon containers; anti-patterns
  (generic shine without the nature frame; text over high-luminance imagery).
