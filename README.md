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
CampusBridge expansion
Added college-wide engineering branch discovery and fictional multi-branch student data.
Added Student → Explore Students for cross-branch skill/project teammate discovery.
Added Skill Passport previews with skill levels, evidence and verification status.
Positioned CampusBridge as a student development and placement-support layer, not a replacement for the official placement cell.
Added first-year-friendly collaboration, project discovery and skill-growth messaging.
V5 additions
This version keeps the V4 architecture and adds an additive campus-development layer:
Team Builder for student-led interdisciplinary projects
Campus Skill Map across the nine engineering branches represented in the prototype
Growth Journey from first year through graduation
Campus Hub for workshops, clubs and learning communities
College Campus Pulse showing development signals and a clear partnership boundary with the existing placement/TPO process
BMS Institute of Technology and Management context on the landing page
Prototype boundaries clearly labelled so demo numbers/data are not presented as live institutional records
All new student, project, workshop, club and campus metrics are fictional demo data unless explicitly sourced from the official BMSIT&M context section.
