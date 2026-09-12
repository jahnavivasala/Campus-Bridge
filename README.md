CampusBridge — SIH26044 Prototype
Verified skill-to-opportunity academia–industry portal. A working front-end prototype (no backend) built as a single-page app with a marketing landing page, role-based auth, and separate dashboards for students, colleges/TPOs, companies and admins.
Structure
index.html      landing page + auth screen + app shell (all screens live here)
css/style.css   design tokens, landing styles, dashboard styles, v2 polish layer
js/data.js      mock data (opportunities, skills, notifications, etc.)
js/app.js       screen switching, dashboard rendering, landing interactions
Run locally
Just open index.html in a browser, or serve the folder:
python3 -m http.server 8000
Then visit http://localhost:8000.
Deploy to GitHub Pages
Push this folder's contents to a repo (keep index.html at the repo root).
Repo → Settings → Pages → Deploy from branch → main / root.
Site will be live at https://<username>.github.io/<repo>/.
What's new in this pass
Interactive match-score breakdown on the hero skill card (tap to expand).
Bento-style layout for the "Built for three audiences" section.
Tiered verification badges (Self-declared / Faculty verified / Industry verified) with an audit-trail note.
Static feature-mock section: public Skill Passport preview + TPO department-readiness dashboard preview.
Scroll-reveal animations and a sliding underline on the auth role tabs.
Copy polish across hero, how-it-works and footer.
This remains a prototype for demonstration, not a production platform — there is no real backend, auth, or database.
