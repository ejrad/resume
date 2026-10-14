---
name: apple-soft-skeuomorphism
description: "Use when a user wants Apple soft skeuomorphic visual direction across web or macOS UI: Aqua/iOS 6, brushed aluminum, tactile bevels, glossy controls, inset wells, document/device metaphors, or BookCrafter-like texture."
---

# Apple Soft Skeuomorphism

## Overview

Apply tactile Apple-style material language across web and macOS UI. Treat the look as a material system first: soft gray metal, inset wells, small bevels, glossy highlights, native-feeling controls, and document/device metaphors.

Use platform primitives before adding dependencies. On the web, use CSS gradients, borders, pseudo-element highlights, inset shadows, tiny text shadows, and simple DOM/SVG shapes. On macOS, use SwiftUI/AppKit controls, system typography, SF Symbols, semantic colors, overlays, gradients, and shadows; do not replace native window chrome or command behavior just to chase the visual style.

## Use Cases

- Restyle a simple web tool, upload page, converter, settings panel, modal, SwiftUI view, AppKit panel, or utility window into a soft macOS/iOS 6 inspired interface.
- Build tactile controls: recessed drop zones, glossy buttons, beveled cards, alert panels, file icons, book/device mockups, sliders, or small toolbar elements.
- Match references that mention Apple Aqua, brushed aluminum, iOS 6, old macOS, skeuomorphic, soft UI, tactile, inset wells, glossy highlight, or BookCrafter-like texture.

Do not use this skill for ordinary macOS HIG behavior, menu bar design, keyboard shortcuts, or window management unless the user also asks for this visual direction.

## Style DNA

Use this visual language:

- Base surface: low-saturation gray aluminum, usually `#d8d8d8` to `#e8e8e8`, with slight vertical banding.
- Material illusion: stack `linear-gradient`, `border`, `box-shadow`, `inset box-shadow`, and `text-shadow`.
- Corners: small radii, usually `4px` to `13px`; avoid pill shapes except badges, sliders, and toast shells.
- Typography: system sans first, `-apple-system`, `BlinkMacSystemFont`, `PingFang SC`, `Helvetica Neue`; avoid expressive display fonts.
- Accent: Apple blue near `#0071e3` or Aqua blue gradients; use sparingly for primary actions and focus rings.
- Icons: prefer lucide/SF-like line icons, or CSS-drawn file/device shapes. Avoid stock illustrations.
- Motion: short tactile response only, `100ms` to `300ms`; active states move by `0.5px` to `1px`.

## Platform Branches

Choose the branch before writing code.

- Web: implement materials with CSS classes or existing utility classes. Use pseudo-elements for highlight caps and inset lines.
- SwiftUI: compose materials with `LinearGradient`, `RoundedRectangle`, `.overlay`, `.shadow`, `.buttonStyle(.plain)`, semantic system colors, and SF Symbols. Simulate inset shadows with overlay strokes and top/bottom gradient lines.
- AppKit: keep standard windows, traffic lights, menus, and focus behavior. Use `NSVisualEffectView`, `CALayer` gradients, borders, shadows, and standard controls where possible.
- Cross-platform design docs: specify material intent and token ranges, not CSS-only syntax.

## Material Tokens

Use these as intent tokens. Translate them into CSS, SwiftUI, AppKit, or design specs for the target platform.

```text
background: gray aluminum, #d8d8d8 -> #b8b8b8, faint noise or banding
surface: raised light gray, #fdfdfd -> #e6e6e6
recessed: darker rim, inner light surface, inset top shadow
primary: Aqua blue, #7eccff -> #0077e3 -> #6cc4ff
line: hairline gray, #a1a1a6 with top/bottom contrast variants
text: near black #1d1d1f with white top text-shadow or equivalent highlight
```

## Web CSS Recipes

Start with these CSS tokens and adjust per project:

```css
:root {
  --skeuo-bg-top: #d8d8d8;
  --skeuo-bg-mid: #d5d5d5;
  --skeuo-bg-bottom: #b8b8b8;
  --skeuo-surface: #f5f5f5;
  --skeuo-line: #a1a1a6;
  --skeuo-text: #1d1d1f;
  --skeuo-muted: #86868b;
  --skeuo-blue: #0071e3;
}
```

### Aluminum Background

Use a vertical gray gradient plus very faint SVG noise. Keep the noise subtle; opacity above `0.05` looks dirty.

```css
.aluminum-bg {
  background: linear-gradient(
    #d8d8d8 0%,
    #e5e5e5 2%,
    #e0e0e0 5%,
    #d5d5d5 50%,
    #c8c8c8 95%,
    #b8b8b8 100%
  );
  position: relative;
}

.aluminum-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

### Recessed Upload Well

Build wells with an outer bevel and an inner recessed surface. Use `inset` shadows for depth, not a heavy drop shadow.

```css
.skeuo-well {
  padding: 3px;
  border-radius: 16px;
  background: linear-gradient(
    #a0a0a0 0%,
    #b8b8b8 3%,
    #c5c5c5 10%,
    #d0d0d0 50%,
    #c5c5c5 90%,
    #b0b0b0 97%,
    #909090 100%
  );
  box-shadow: inset 0 2px 6px #00000040, 0 1px #ffffff80;
}

.skeuo-well-inner {
  border: 1px solid #00000014;
  border-radius: 13px;
  background: linear-gradient(#e8e8e8 0%, #f2f2f2 5%, #fafafa 50%, #f5f5f5 95%, #eee 100%);
  box-shadow: inset 0 3px 10px #0000001f, inset 0 1px 3px #00000014;
}
```

### Glossy Button

Create glossy controls with a main gradient and a `::before` highlight cap.

```css
.skeuo-button {
  position: relative;
  overflow: hidden;
  border: 1px solid #a1a1a6;
  border-color: #b8b8bd #a1a1a6 #909095;
  border-radius: 7px;
  background: linear-gradient(#fdfdfd 0%, #e6e6e6 100%);
  color: #333;
  text-shadow: 0 1px #ffffffe6;
  box-shadow: inset 0 1px #fff, 0 1px 1px #0000001a, 0 2px 3px #0000000d;
}

.skeuo-button::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 50%;
  pointer-events: none;
  border-radius: 6px 6px 50% 50%;
  background: linear-gradient(#ffffff99 0%, #ffffff1a 100%);
}

.skeuo-button:active {
  transform: translateY(0.5px);
  background: linear-gradient(#e0e0e0 0%, #f0f0f0 100%);
  box-shadow: inset 0 2px 3px #00000026;
}
```

### Aqua Primary Action

Reserve Aqua blue for the single main action. The split at `50%` creates the old Apple gel effect.

```css
.aqua-button {
  position: relative;
  overflow: hidden;
  border: 1px solid #00326499;
  border-radius: 7px;
  background: linear-gradient(
    #7eccff 0%,
    #4db1ff 5%,
    #2496f5 40%,
    #0077e3 50%,
    #0080ec 55%,
    #38a3f5 90%,
    #6cc4ff 100%
  );
  color: #fff;
  text-shadow: 0 -1px 1px #00285080;
  box-shadow: 0 1px #ffffff26, 0 2px 4px #003c7866, inset 0 1px #fff6, inset 0 -1px #0000001a;
}
```

### Text and Icons

Add tiny text shadows to make labels sit inside the surface:

```css
.skeuo-label {
  color: #1d1d1f;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9), 0 -1px 0 rgba(0, 0, 0, 0.08);
}

.skeuo-muted {
  color: #86868b;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9), 0 -1px 0 rgba(0, 0, 0, 0.05);
}
```

Use CSS boxes for small document/device icons when the icon is the product metaphor. Use real SVG icons only for generic actions like upload, close, undo, or download.

## SwiftUI Recipes

Use these as shape recipes, not reusable framework scaffolding.

### Recessed Well

```swift
import SwiftUI

struct SkeuoWell<Content: View>: View {
    private let content: Content

    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }

    var body: some View {
        content
            .padding(28)
            .background(
                RoundedRectangle(cornerRadius: 14)
                    .fill(
                        LinearGradient(
                            colors: [
                                Color(nsColor: .controlBackgroundColor),
                                Color(nsColor: .windowBackgroundColor),
                                Color(nsColor: .controlBackgroundColor)
                            ],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(Color.black.opacity(0.14), lineWidth: 1)
                    )
                    .overlay(alignment: .top) {
                        RoundedRectangle(cornerRadius: 14)
                            .stroke(Color.black.opacity(0.18), lineWidth: 1)
                            .blur(radius: 1)
                            .offset(y: 1)
                            .mask(alignment: .top) {
                                RoundedRectangle(cornerRadius: 14)
                                    .frame(height: 20)
                            }
                    }
            )
    }
}
```

### Aqua Button

```swift
struct AquaButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.system(size: 14, weight: .semibold))
            .foregroundStyle(.white)
            .shadow(color: .black.opacity(0.45), radius: 0, y: -1)
            .padding(.horizontal, 18)
            .padding(.vertical, 9)
            .background(
                RoundedRectangle(cornerRadius: 7)
                    .fill(
                        LinearGradient(
                            colors: configuration.isPressed
                                ? [Color(red: 0.0, green: 0.38, blue: 0.72), Color(red: 0.0, green: 0.44, blue: 0.82)]
                                : [Color(red: 0.49, green: 0.80, blue: 1.0), Color(red: 0.0, green: 0.47, blue: 0.89), Color(red: 0.42, green: 0.77, blue: 1.0)],
                            startPoint: .top,
                            endPoint: .bottom
                        )
                    )
                    .overlay(alignment: .top) {
                        RoundedRectangle(cornerRadius: 7)
                            .fill(Color.white.opacity(0.28))
                            .frame(height: 12)
                            .padding(1)
                    }
                    .overlay(
                        RoundedRectangle(cornerRadius: 7)
                            .stroke(Color.black.opacity(0.38), lineWidth: 1)
                    )
            )
            .offset(y: configuration.isPressed ? 1 : 0)
    }
}
```

### macOS Guardrails

- Keep native window title bars, traffic lights, menu bar, keyboard focus, and accessibility roles intact.
- Prefer SF Symbols over web icon libraries.
- Use semantic colors when the UI must support Dark Mode; use fixed gray gradients only for explicit nostalgic surfaces.
- Add `accessibilityReduceMotion` and contrast checks when adding glossy animation or low-contrast embossing.

## Implementation Workflow

1. Identify the object metaphor: panel, paper, device, book, drawer, toolbar, alert, or well.
2. Build layout with target platform primitives: HTML/CSS utilities for web, SwiftUI/AppKit controls for macOS.
3. Add one tactile surface at a time: background first, then main container, then controls.
4. Use reusable material helpers only after the same surface appears at least twice.
5. Add pointer, keyboard focus, disabled, loading, accessibility, and reduced-motion states for interactive controls.
6. Check the result at the target platform sizes. Reduce shadow strength before adding more decoration.

## Anti-Patterns

- Do not add Bootstrap, MUI, shadcn, DaisyUI, a neumorphism package, or a custom macOS chrome layer only for this look.
- Do not make every element glossy. Spend the effect on primary controls and signature objects.
- Do not use purple gradients, large decorative blobs, card-in-card layouts, or marketing hero defaults.
- Do not use heavy blur as a replacement for material; this style is bevel and surface, not glassmorphism.
- Do not rely on raster screenshots for simple shapes that CSS can draw.
- Do not make macOS apps feel like web pages inside a fixed window. Respect native resizing, focus, menus, and controls.

## Common Gotchas

- Do not put a white 1px top highlight or glossy cap on large panels. In a big gray aluminum surface it reads as an accidental white line at the edge. Keep glossy highlights on buttons, small icons, and compact controls; use gradients, gray strokes, and weak shadows for main panels.

## Routing Evals

Positive prompts:

- "Make this upload page feel like BookCrafter's skeuomorphic style."
- "Give this SwiftUI settings window an old macOS / iOS 6 Aqua feel."
- "Build a local tool UI with a gray aluminum background, recessed wells, and glossy buttons."

Negative prompts:

- "Add menu bar items and keyboard shortcuts to this macOS app." Use a macOS HIG skill instead.
- "Make a glassmorphism landing page." Use glassmorphism or frontend design guidance instead.
- "Polish this ordinary Tailwind dashboard." Use general frontend design guidance unless Apple skeuomorphism is requested.

## QA Checklist

- Background reads as quiet aluminum, not dirty noise or flat gray.
- Main controls have matching highlight direction: light from top, shadow below or inset.
- Every tactile element has default, hover, active, and focus-visible states.
- Text remains legible over gradients and passes normal contrast expectations.
- Web/mobile layout keeps controls stable; shadows do not create horizontal overflow.
- macOS implementation preserves native window, menu, focus, and accessibility behavior.
- The final UI still looks useful and restrained after removing one decorative detail.
