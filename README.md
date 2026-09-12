# CampusBridge — SIH26044 prototype

A frontend-only prototype for an academia–industry portal built around
**verified competency**, not self-declared skills. Four portals (Student,
College/TPO, Company, Admin) share one design system.

## What was actually broken, and what was fixed

You reported: on desktop the app looked "disgusting," and every time you
opened a portal the landing page seemed to still be there, forcing you to
scroll down to find the actual dashboard.

Root cause (confirmed by inspecting the CSS, not guessed): the old
single-file version toggled screens with a class —
`.screen.active { display:block }` — while the dashboard shell needed
`.app-shell { display:flex }` to lay the sidebar and content side by side.
`.screen.active` has *higher CSS specificity* (two classes) than
`.app-shell` (one class), so `display:block` always won, every time,
regardless of source order. The result: the sidebar rendered as a
full-height block sitting **above** the topbar and content instead of
beside them — which is exactly "have to scroll down every time" and
"looks disgusting on desktop."

**Fix:** screens are now shown/hidden with the native `hidden` attribute
instead of a class (`js/app.js` → `showScreen()`). Removing `hidden` lets
an element fall back to its own natural CSS `display` value — `flex` for
the app shell, `block` for landing/auth — so there is no specificity fight
to lose. A second, smaller bug (the dashboard content area wasn't
horizontally centered on wide monitors) was fixed alongside it.

Also cleaned up while in there: a dead/duplicate second `submit` listener
on the auth form, a no-op forEach left over from earlier edits, and
`.side-nav`/other buttons now use `addEventListener` consistently. A short
fade-in was added so switching screens/pages feels intentional. See the
comments at the top of `css/style.css` and `js/app.js` for the technical
detail if you extend this later.

I verified the fix with static checks (not a guess): confirmed the old
`.screen.active` rule is gone, confirmed every nav item in every portal
maps to a real page section, confirmed every HTML tag is balanced in both
`index.html` and in the HTML each portal's JS generates, and syntax-checked
both JS files with Node. This doesn't replace opening it in a real browser
yourself, so give the demo flow in "Testing checklist" below a run before
your presentation.

## Folder structure

```
campusbridge/
├── index.html          ← markup only
├── css/
│   └── style.css        ← all styles, design tokens, responsive rules
├── js/
│   ├── data.js           ← demo data + icons (load this first)
│   └── app.js            ← navigation, rendering, interactions
└── README.md
```

Everything is plain HTML/CSS/JS — no build step, no dependencies, no
bundler. Opening `index.html` directly in a browser works.

## Run it locally

Just double-click `index.html`, or for a closer-to-production feel, serve
it with any static server, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it
   (index.html must be at the repo root, or in `/docs` if you prefer).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick your branch (e.g. `main`) and the folder (`/root` or `/docs`).
4. Save. GitHub will give you a URL like
   `https://<username>.github.io/<repo-name>/` within a minute or two.

No further configuration is needed — there's no backend, database or
build step to worry about.

## Testing checklist (what to click through before a demo)

- Landing → "I'm a student" → Skill Passport → Opportunities → open one →
  "Switch portal" → back to landing, at the top, no leftover scroll.
- Repeat for College/TPO, Company, and Admin — each should open at the top
  of its own dashboard, sidebar beside the content (not stacked above it).
- Resize the window from phone width up to a very wide monitor — the
  sidebar should stay fixed-width and the content should stay centered
  with readable line lengths, not stretch edge-to-edge.
- Try the global search in the topbar, the opportunity filters, the
  notification bell, and the low-bandwidth toggle.

## Honesty notes (for your SIH presentation)

This is a frontend-only prototype with in-memory demo data — there is no
real backend, database, authentication, or machine learning. Matching is
transparent and rule-based by design (see the "why this match" panels).
All companies, students and statistics are fictional. The code is
structured (clear data/render/interaction separation) so a real
backend/API could be connected later without restructuring the frontend.
