# Project memory

## Product intent & audience

- BloodLink: digital platform connecting voluntary blood donors, hospitals, and authorised blood banks.
- Audience: potential donors, hospital/blood-bank staff, general public in India.
- Tagline: "Every Drop Connects a Life."
- Homepage prototype only; no auth, backend, database, dark mode toggle, blog, or extra pages.

## Brand personality & voice

- Trusted, warm, purposeful — feels like a real digital product, not a template.
- Editorial and confident; emotionally resonant without being clinical.
- Clear, friendly microcopy; never harsh in eligibility feedback.

## Visual design & UX direction

- Signature visual: one continuous crimson SVG thread drawn on scroll (Framer Motion `useScroll` + `pathLength`), connecting all sections like a vein.
- Palette: deep crimson `#B3122B` (single accent), ink-black `#14090B`, warm off-white `#FBF6F3`, soft blush `#F6E3E0` for cards. No medical blue, no clip-art drops, no gradients everywhere.
- Type: expressive serif for headlines (Fraunces / Instrument Serif), clean sans for UI/body (Inter / DM Sans). Large hero typography.
- Layout: editorial, asymmetric; vary rhythm (full-bleed dark, split, bento). Never repeat same card-grid pattern consecutively.
- Motion: purposeful — blood-drop fill, count-up stats, staggered reveals, smooth tab/step transitions. Respect `prefers-reduced-motion`.
- Responsive at 375px / 768px / 1440px; 44px touch targets; WCAG AA contrast; visible focus states.
- Stack adds Framer Motion beyond the base template; icons via lucide-react; `@/` path alias for imports.
- All mock data hardcoded in `/src/data`; Indian cities/areas; no real people, hospital names, or phone numbers.

## Decisions, constraints & rationale

- 10 sections in fixed order: Navbar → Hero → Find a Donor → Urgent Requests → Become a Donor → Blood Bank Network → Donation Awareness → Our Impact → Take Action → Footer.
- One component per section; shared UI primitives; data in separate files.
- Everything clickable must function (filters, tabs, steps, toasts) — no dead buttons.
- Build passes (`npm run build`); lint reports no errors; two style warnings remain (fast-refresh notices, no behavioural impact).
- Fixes applied: removed unused icon imports in Take Action; corrected invalid caption markup in Life Split and testimonial blocks.
- Supabase / backend explicitly declined per brief despite a system suggestion.
- Ready for deployment on Vercel or Netlify.

## Open questions & assumptions

- Browser verification at 375px and 1440px not yet performed; responsiveness only reviewed via code reading.
- No console-error confirmation in a live browser session.
- Two lint warnings (fast-refresh style notices) left as-is; may revisit if desired.