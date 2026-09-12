/* =====================================================================
   CAMPUSBRIDGE — APPLICATION LOGIC
   ---------------------------------------------------------------------
   KEY FIX (read this if you're picking this project back up):
   `showScreen()` below toggles the `hidden` attribute on the three
   top-level screens (landing / auth / app) instead of an `.active`
   class. The previous version used a class, and the CSS rule
   `.screen.active{display:block}` had higher specificity than
   `.app-shell{display:flex}`, so the dashboard's flex layout
   (sidebar beside content) was silently overridden into a stacked
   block layout every single time it was shown. That produced the
   exact symptoms reported: a broken desktop layout, and a sidebar
   that occupied the full viewport height so the actual dashboard
   content sat below the fold, forcing a scroll every time a portal
   opened. Using `hidden` sidesteps CSS specificity entirely — the
   element's own natural `display` (flex, in this case) takes over
   the moment `hidden` is removed. Do not reintroduce an `.active`
   class for screen-level visibility; if you need to style "the
   currently active screen", key off `:not([hidden])` instead.
   ===================================================================== */

let CURRENT_ROLE = 'student';
let authMode = 'login';

/* ============================================================= INIT ============================================================= */
document.addEventListener('DOMContentLoaded', init);

function init() {
  injectBrandMarks();
  wireLandingAndAuthShell();
  wireAppShellChrome();
  setAuthRole('student');
  setAuthMode('login');
  showScreen('view-landing');
}

/* ============================================================= BRAND MARK ============================================================= */
function injectBrandMarks() {
  document.querySelectorAll('.brand').forEach(b => {
    const mark = b.querySelector('.brand-mark');
    if (!mark) return;
    mark.innerHTML = b.classList.contains('on-dark') ? SEAL_SVG_WHITE : SEAL_SVG;
  });
}

/* ============================================================= VIEW SWITCHING (fixed) ============================================================= */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => { s.hidden = (s.id !== id); });
  resetScroll();
}
function resetScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const content = document.getElementById('content');
  if (content) content.scrollTop = 0;
}

function wireLandingAndAuthShell() {
  document.querySelectorAll('[data-go-landing]').forEach(b => b.addEventListener('click', () => showScreen('view-landing')));
  document.querySelectorAll('[data-open-auth]').forEach(b => b.addEventListener('click', () => {
    setAuthMode(b.dataset.openAuth);
    if (b.dataset.role) setAuthRole(b.dataset.role);
    showScreen('view-auth');
  }));
  document.querySelectorAll('#authRoleTabs button').forEach(t => t.addEventListener('click', () => setAuthRole(t.dataset.role)));
  document.getElementById('authToggleBtn').addEventListener('click', () => setAuthMode(authMode === 'login' ? 'signup' : 'login'));
  document.getElementById('authForm').addEventListener('submit', e => { e.preventDefault(); enterApp(CURRENT_ROLE); });
}

function setAuthRole(role) {
  document.querySelectorAll('#authRoleTabs button').forEach(t => t.classList.toggle('active', t.dataset.role === role));
  CURRENT_ROLE = role;
  document.getElementById('labelEmailId').textContent = AUTH_EMAIL_LABEL[role];
}

function setAuthMode(mode) {
  authMode = mode;
  const nameField = document.getElementById('fieldName');
  if (mode === 'login') {
    document.getElementById('authTitle').textContent = 'Sign in to your account';
    document.getElementById('authSubmit').textContent = 'Sign in';
    document.getElementById('authToggleText').textContent = 'New to CampusBridge?';
    document.getElementById('authToggleBtn').textContent = 'Create an account';
    nameField.classList.add('hidden');
  } else {
    document.getElementById('authTitle').textContent = 'Create your account';
    document.getElementById('authSubmit').textContent = 'Create account';
    document.getElementById('authToggleText').textContent = 'Already have an account?';
    document.getElementById('authToggleBtn').textContent = 'Sign in instead';
    nameField.classList.remove('hidden');
  }
}

/* ============================================================= ENTER APP ============================================================= */
function enterApp(role) {
  CURRENT_ROLE = role;
  document.getElementById('sidebarRole').textContent = ROLE_LABEL[role];
  buildSideNav(role);
  buildPages(role);
  const [name, initial, sub] = ROLE_NAMES[role];
  document.getElementById('topName').textContent = name;
  document.getElementById('topAvatar').textContent = initial;
  document.getElementById('topSub').textContent = sub;
  buildNotifs(role);
  showScreen('view-app');
  goPage(NAV[role][0][0]);
}

function buildSideNav(role) {
  const nav = document.getElementById('sideNav');
  nav.innerHTML = NAV[role].map(([id, label, icon]) => `<button data-page="${id}">${ICONS[icon]}<span>${label}</span></button>`).join('');
  nav.querySelectorAll('button').forEach(b => b.addEventListener('click', () => goPage(b.dataset.page)));
}

function goPage(id) {
  document.querySelectorAll('#sideNav button').forEach(b => b.classList.toggle('active', b.dataset.page === id));
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + id);
  if (el) el.classList.add('active');
  resetScroll();
}

/* ============================================================= APP SHELL CHROME (bell, low-bandwidth) ============================================================= */
function wireAppShellChrome() {
  document.getElementById('bellBtn').addEventListener('click', () => document.getElementById('bellPanel').classList.toggle('show'));
  document.addEventListener('click', e => { if (!e.target.closest('.bell-wrap')) document.getElementById('bellPanel').classList.remove('show'); });
  document.getElementById('lowBwToggle').addEventListener('change', e => document.body.classList.toggle('low-bandwidth', e.target.checked));
}
function buildNotifs(role) {
  document.getElementById('notifList').innerHTML = ROLE_NOTIFS[role].map(n => `<div class="notif-item"><b>${n.t}</b>${n.d}</div>`).join('');
}

function notify(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window.__tt);
  window.__tt = setTimeout(() => t.classList.remove('show'), 2400);
}
function bindActionButtons(scope) {
  (scope || document).querySelectorAll('[data-action]').forEach(b => b.onclick = () => notify(b.dataset.action));
}

/* ============================================================= RENDER HELPERS ============================================================= */
function oppCard(o, withReport) {
  const matchTone = o.match >= 80 ? 'pill-verified' : o.match >= 65 ? 'pill-amber' : 'pill-slate';
  return `<div class="opp-record">
    <div class="opp-top">
      <div><div class="opp-title">${o.role}</div><div class="opp-company">${o.company} ${o.verified ? '<span class="pill pill-verified">✓ Verified company</span>' : '<span class="pill pill-slate">Verification pending</span>'}</div></div>
      <span class="pill ${matchTone}">${o.match}% match</span>
    </div>
    <div class="skill-chips">${o.have.map(s => '<span class="chip chip-yes">✓ ' + s + '</span>').join('')}${o.miss.map(s => '<span class="chip chip-no">○ ' + s + '</span>').join('')}</div>
    <div class="opp-meta"><span>${o.location} · ${o.mode}</span><span>${o.stipend}</span><span>${o.paid ? 'Paid' : 'Unpaid'}${o.cert ? ' · Certificate provided' : ''}${o.ftOffer ? ' · Full-time offer possible' : ''}</span><span>Deadline ${o.deadline}</span></div>
    <div class="opp-actions">
      <button class="btn btn-primary btn-sm" data-action="Application started — ${o.role}">Apply now</button>
      <button class="btn btn-ghost btn-sm" onclick="openOppDetail(${o.id})">View match details</button>
      <button class="btn btn-ghost btn-sm" data-action="Saved for later">Save</button>
      ${withReport ? '<button class="report-flag" style="margin-left:auto" data-action="Report submitted for review">⚑ Report listing</button>' : ''}
    </div>
  </div>`;
}

function openOppDetail(id) {
  const o = OPPS.find(x => x.id === id);
  goPage('opp-detail');
  document.getElementById('oppDetailBody').innerHTML = `
    <div class="page-head"><div><span class="eyebrow">OPPORTUNITY DETAILS</span><h1>${o.role}</h1><p class="muted">${o.company} · ${o.location} · ${o.mode}</p></div><span class="pill pill-verified" style="font-size:14px;padding:8px 14px">${o.match}% match</span></div>
    <div class="two-col">
      <div>
        <div class="card"><div class="card-head"><h2>Why this is recommended</h2></div><div class="match-explain">${o.reason}</div>
          <h3 style="margin-top:18px;font-size:14px">Matched skills</h3><div class="skill-chips">${o.have.map(s => '<span class="chip chip-yes">✓ ' + s + '</span>').join('')}</div>
          <h3 style="margin-top:14px;font-size:14px">Skills to improve</h3><div class="skill-chips">${o.miss.map(s => '<span class="chip chip-no">○ ' + s + '</span>').join('')}</div>
        </div>
        <div class="card" style="margin-top:16px"><div class="card-head"><h2>Eligibility</h2></div><ul class="checklist"><li>✓ Computer Science student</li><li>✓ Graduation year accepted</li><li>✓ Available during internship period</li></ul></div>
      </div>
      <div>
        <div class="card"><div class="card-head"><h2>Opportunity details</h2></div>
          <div class="bar-row"><span class="muted">Stipend</span><b>${o.stipend}</b></div>
          <div class="bar-row"><span class="muted">Duration</span><b>${o.duration}</b></div>
          <div class="bar-row"><span class="muted">Working hours</span><b>${o.hours}</b></div>
          <div class="bar-row"><span class="muted">Open positions</span><b>${o.positions}</b></div>
          <div class="bar-row"><span class="muted">Selection process</span><b>${o.selection}</b></div>
          <div class="bar-row"><span class="muted">Certificate</span><b>${o.cert ? 'Provided' : 'Not specified'}</b></div>
          <div class="bar-row"><span class="muted">Full-time offer</span><b>${o.ftOffer ? 'Possible' : 'Not indicated'}</b></div>
          <button class="btn btn-primary btn-block" style="margin-top:16px" data-action="Application started — ${o.role}">Apply now</button>
          <button class="btn btn-ghost btn-block" style="margin-top:8px" data-action="Report submitted for review">⚑ Report this listing</button>
        </div>
      </div>
    </div>`;
  bindActionButtons(document.getElementById('oppDetailBody'));
}

function skillRow(s) {
  const tone = s.status === 'Self-declared' ? 'pill-slate' : s.status.includes('College') ? 'pill-verified' : 'pill-amber';
  return `<div class="skill-row">
    <div><b>${s.name}</b> <span class="pill ${tone}">${s.status}</span><br><small class="muted">${s.evidence}${s.score !== '—' ? ' · Score ' + s.score : ''}${s.date !== '—' ? ' · ' + s.date : ''}</small></div>
    <span class="level-badge">${s.level}</span>
  </div>`;
}

/* ============================================================= PAGE BUILDERS ============================================================= */
function buildPages(role) {
  const c = document.getElementById('content');
  if (role === 'student') c.innerHTML = studentPages();
  else if (role === 'college') c.innerHTML = collegePages();
  else if (role === 'company') c.innerHTML = companyPages();
  else c.innerHTML = adminPages();
  wireSearch();
  bindActionButtons(c);
  renderOppLists();
}

function studentPages() {
  return `
<section class="page" id="page-dashboard">
  <div class="page-head">
    <div><span class="eyebrow">STUDENT WORKSPACE</span><h1>Good to see you, Jahnavi.</h1><p class="muted">Your verified skills are opening new opportunities.</p></div>
    <div class="card" style="width:260px;padding:14px 16px"><b style="font-size:13px">Profile completion <span style="float:right;color:var(--teal)">72%</span></b><div class="progress-track"><div class="progress-fill" style="width:72%"></div></div><small class="muted">Add your GitHub profile to improve matches.</small></div>
  </div>
  <div class="stat-row">
    <div class="stat-block"><small>Declared skills</small><span class="n">12</span><small class="muted">8 evidence-backed · 5 college-verified</small></div>
    <div class="stat-block"><small>Current profile match</small><span class="n">86%</span><small class="muted">↑ 8% this month</small></div>
    <div class="stat-block"><small>Suitable opportunities</small><span class="n">7</span><small class="muted">Based on verified skills</small></div>
    <div class="stat-block"><small>Applications in progress</small><span class="n">3</span><small class="muted">1 needs your action</small></div>
  </div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Recommended opportunities</h2><button class="linkbtn" onclick="goPage('opportunities')">View all</button></div><div id="homeOpps"></div></div>
    <div>
      <div class="card"><div class="card-head"><h2>Your verified skills</h2><button class="linkbtn" onclick="goPage('passport')">View passport</button></div>${SKILLS.slice(0, 3).map(skillRow).join('')}</div>
      <div class="card" style="margin-top:16px;border-top:3px solid var(--brass)"><div class="card-head"><h2>Improve your eligibility</h2><span class="pill pill-brass">Unlocks 12 roles</span></div><p class="muted">Complete the Data Structures assessment.</p><div class="bar-row" style="border:0;padding-top:0"><span class="muted">Estimated time</span><b>45 minutes</b></div><button class="btn btn-primary btn-block" onclick="goPage('assessments')">Start assessment</button></div>
    </div>
  </div>
  <div class="card" style="margin-top:18px"><div class="card-head"><h2>Upcoming deadlines</h2></div>
    <div class="bar-row"><span>Data Analyst Intern — apply by</span><b>14 Sep</b></div>
    <div class="bar-row"><span>Frontend Intern — complete assessment by</span><b>16 Sep</b></div>
    <div class="bar-row"><span>Software Engineering Intern — interview</span><b>18 Sep</b></div>
  </div>
</section>

<section class="page" id="page-passport">
  <div class="page-head"><div><span class="eyebrow">VERIFIED COMPETENCIES</span><h1>Your Skill Passport</h1><p class="muted">A trusted record of what you know, and the evidence behind it.</p></div>
  <div><button class="btn btn-outline btn-sm" data-action="Public link copied">Copy shareable link</button> <button class="btn btn-primary btn-sm" data-action="Skill Passport downloaded as PDF">Download PDF</button></div></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Skills &amp; verification status</h2><button class="btn btn-outline btn-sm" data-action="Skill submission form opened">+ Add skill</button></div>${SKILLS.map(skillRow).join('')}</div>
    <div>
      <div class="card"><div class="card-head"><h2>Evidence trail</h2></div><div class="timeline">
        <div class="tl-event"><b>Python — college assessment</b><p class="muted" style="margin:2px 0 0">Verified 08 Sep 2026 · Score 82%</p></div>
        <div class="tl-event"><b>Campus Navigation App</b><p class="muted" style="margin:2px 0 0">Submitted as project evidence · 06 Sep 2026</p></div>
        <div class="tl-event"><b>SQL — college assessment</b><p class="muted" style="margin:2px 0 0">Verified 05 Sep 2026 · Score 78%</p></div>
        <div class="tl-event tl-pending"><b>Data structures — assessment</b><p class="muted" style="margin:2px 0 0">Not yet started</p></div>
      </div></div>
      <div class="card" style="margin-top:16px"><div class="card-head"><h2>Competency scale</h2></div>
        <div class="bar-row"><span><b>Beginner</b><br><small class="muted">Understands fundamentals, needs guidance</small></span></div>
        <div class="bar-row"><span><b>Intermediate</b><br><small class="muted">Applies the skill independently in projects</small></span></div>
        <div class="bar-row"><span><b>Advanced</b><br><small class="muted">Handles complex, professional-level problems</small></span></div>
      </div>
    </div>
  </div>
</section>

<section class="page" id="page-opportunities">
  <div class="page-head"><div><span class="eyebrow">DISCOVER YOUR NEXT STEP</span><h1>Opportunities</h1><p class="muted">Every listing here has passed admin review before publishing.</p></div></div>
  <div class="filters-row">
    <input id="oppSearch" placeholder="Search roles, skills or companies">
    <select><option>All locations</option><option>Bengaluru</option><option>Remote</option><option>Hyderabad</option></select>
    <select><option>Work mode</option><option>On-site</option><option>Hybrid</option><option>Remote</option></select>
    <select><option>Type</option><option>Internship</option><option>Full-time</option><option>Apprenticeship</option></select>
    <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--slate)"><input type="checkbox" style="width:auto" checked> Verified companies only</label>
    <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--slate)"><input type="checkbox" style="width:auto"> Paid only</label>
  </div>
  <div id="allOpps"></div>
</section>

<section class="page" id="page-opp-detail"><div id="oppDetailBody"></div></section>

<section class="page" id="page-applications">
  <div class="page-head"><div><span class="eyebrow">TRACK YOUR PROGRESS</span><h1>Applications</h1><p class="muted">Every stage, and what happens next.</p></div></div>
  <div class="card"><div class="card-head"><h2>Application tracker</h2><span class="pill pill-verified">3 active</span></div>
    <div class="table-wrap"><table><thead><tr><th>Role</th><th>Company</th><th>Applied</th><th>Status</th></tr></thead><tbody>
      ${APPLICATIONS.map(a => `<tr><td><b>${a.role}</b></td><td>${a.company}</td><td>${a.applied}</td><td><span class="pill ${a.status === 'Shortlisted' ? 'pill-verified' : a.status === 'Not selected' ? 'pill-burgundy' : 'pill-amber'}">${a.status}</span></td></tr>`).join('')}
    </tbody></table></div>
  </div>
  ${APPLICATIONS.map(a => `<div class="card" style="margin-top:16px"><div class="card-head"><h2>${a.role} — ${a.company}</h2></div><div class="timeline">${a.timeline.map(([label, done]) => `<div class="tl-event ${done ? '' : 'tl-pending'}"><b>${label}</b></div>`).join('')}</div>
    ${a.feedback ? `<div class="match-explain" style="margin-top:14px"><b>Not selected — here's why:</b><br>${a.feedback}<br><br><b>Recommended action:</b> Complete the Frontend Assessment before reapplying.</div>` : ''}
  </div>`).join('')}
</section>

<section class="page" id="page-roadmap">
  <div class="page-head"><div><span class="eyebrow">CLOSE THE GAP</span><h1>Skill-Gap Roadmap</h1><p class="muted">Not just what's missing — a plan to get there.</p></div></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Target role: Frontend Developer Intern</h2></div>
      <p class="muted">Current level: Beginner</p>
      <ul class="step-list">
        <li class="done">Complete JavaScript fundamentals</li>
        <li class="done">Build a responsive website</li>
        <li>Learn React basics</li>
        <li>Build a React project</li>
        <li>Complete the frontend assessment</li>
        <li>Apply for matching opportunities</li>
      </ul>
    </div>
    <div>
      <div class="card"><div class="card-head"><h2>You already have</h2></div><div class="skill-chips"><span class="chip chip-yes">✓ JavaScript basics</span><span class="chip chip-yes">✓ HTML/CSS</span><span class="chip chip-yes">✓ Git</span></div></div>
      <div class="card" style="margin-top:16px;border-top:3px solid var(--brass)"><div class="card-head"><h2>Recommended next skills</h2></div><ul class="checklist"><li>○ React basics</li><li>○ Component-based design</li><li>○ State management fundamentals</li></ul>
        <p class="muted" style="margin-top:12px">Suggested action: complete the <b>Frontend Foundations</b> assessment.</p>
        <div class="match-explain" style="margin-top:10px">Potential impact: this could make you eligible for <b>12 more opportunities</b>.</div>
      </div>
    </div>
  </div>
</section>

<section class="page" id="page-projects">
  <div class="page-head"><div><span class="eyebrow">SHOW WHAT YOU CAN DO</span><h1>Projects</h1><p class="muted">Turn your work into evidence recruiters can trust.</p></div><button class="btn btn-primary btn-sm" data-action="Project submission form opened">+ Add project</button></div>
  <div class="two-col">${PROJECTS.map(p => `<div class="card"><div class="card-head"><h2>${p.title}</h2><span class="pill ${p.status.includes('verified') ? 'pill-verified' : 'pill-amber'}">${p.status}</span></div><p class="muted">${p.desc}</p><div class="skill-chips">${p.tech.map(t => '<span class="chip">' + t + '</span>').join('')}</div><div class="bar-row"><span class="muted">Role</span><b>${p.role}</b></div><div class="bar-row"><span class="muted">Evidence</span><b>${p.evidence}</b></div><button class="btn ${p.status.includes('verified') ? 'btn-outline' : 'btn-primary'} btn-sm" style="margin-top:10px" data-action="${p.status.includes('verified') ? 'Project details opened' : 'Reminder sent to reviewer'}">${p.status.includes('verified') ? 'View project' : 'Send review reminder'}</button></div>`).join('')}</div>
</section>

<section class="page" id="page-assessments">
  <div class="page-head"><div><span class="eyebrow">PROVE YOUR COMPETENCIES</span><h1>Assessments</h1><p class="muted">Every completed assessment strengthens your Skill Passport.</p></div></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Recommended for you</h2><span class="pill pill-brass">2 available</span></div>
      <div class="opp-record"><h3 style="margin:0 0 4px;font-size:15px">Data Structures</h3><p class="muted" style="margin:0 0 8px">Intermediate · 45 minutes · Could unlock 12 opportunities</p><button class="btn btn-primary btn-sm" data-action="Data Structures assessment started">Start assessment</button></div>
      <div class="opp-record"><h3 style="margin:0 0 4px;font-size:15px">REST APIs</h3><p class="muted" style="margin:0 0 8px">Beginner · 30 minutes</p><button class="btn btn-ghost btn-sm" data-action="Assessment details opened">View details</button></div>
    </div>
    <div class="card"><div class="card-head"><h2>Completed</h2></div>
      <div class="skill-row"><div><b>Python Fundamentals</b><br><small class="muted">25 questions · 45 minutes</small></div><span class="pill pill-verified">82% Passed</span></div>
      <div class="skill-row"><div><b>SQL Intermediate</b><br><small class="muted">20 questions · 35 minutes</small></div><span class="pill pill-verified">78% Passed</span></div>
    </div>
  </div>
</section>

<section class="page" id="page-profile">
  <div class="page-head"><div><span class="eyebrow">YOUR RECORD</span><h1>Profile &amp; Privacy</h1><p class="muted">A combination of resume, portfolio and verified competency record.</p></div></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Profile summary</h2></div>
      <div class="bar-row"><span class="muted">Name</span><b>Jahnavi</b></div>
      <div class="bar-row"><span class="muted">College</span><b>BMS Institute of Technology and Management</b></div>
      <div class="bar-row"><span class="muted">Branch</span><b>Computer Science &amp; Engineering</b></div>
      <div class="bar-row"><span class="muted">Current year</span><b>1st year</b></div>
      <div class="bar-row"><span class="muted">Graduation year</span><b>2030</b></div>
      <div class="bar-row"><span class="muted">Preferred work mode</span><b>Hybrid</b></div>
      <div class="bar-row"><span class="muted">Preferred location</span><b>Bengaluru</b></div>
      <button class="btn btn-outline btn-block" style="margin-top:14px" data-action="Profile edit form opened">Edit profile</button>
    </div>
    <div class="card"><div class="card-head"><h2>Who can see your Skill Passport</h2></div>
      <div class="privacy-opt"><input type="radio" name="priv" checked style="width:auto;margin-top:3px"><div><b>Public to verified companies</b><br><small class="muted">Any verified recruiter on CampusBridge can view it.</small></div></div>
      <div class="privacy-opt"><input type="radio" name="priv" style="width:auto;margin-top:3px"><div><b>Visible only after applying</b><br><small class="muted">Companies see it only once you apply to their listing.</small></div></div>
      <div class="privacy-opt"><input type="radio" name="priv" style="width:auto;margin-top:3px"><div><b>Private</b><br><small class="muted">Only you can view it, unless shared via link.</small></div></div>
      <button class="btn btn-primary btn-block" style="margin-top:14px" data-action="Privacy setting saved">Save privacy setting</button>
    </div>
  </div>
</section>`;
}

function collegePages() {
  return `
<section class="page" id="page-dashboard">
  <div class="page-head"><div><span class="eyebrow">ACADEMIA VIEW</span><h1>BMS Institute of Technology</h1><p class="muted">Monitor readiness, verify evidence, and connect students with industry.</p></div></div>
  <div class="stat-row">
    <div class="stat-block"><small>Registered students</small><span class="n">2,450</span></div>
    <div class="stat-block"><small>Verified profiles</small><span class="n">1,860</span></div>
    <div class="stat-block"><small>Students interning</small><span class="n">134</span></div>
    <div class="stat-block"><small>Industry partners</small><span class="n">42</span></div>
  </div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Skill-gap analysis — Computer Science</h2><button class="linkbtn" onclick="goPage('skillgap')">Full breakdown</button></div>
      ${SKILLGAP.map(g => `<div class="bar-row"><span style="width:150px">${g.s}</span><div class="bar-track"><div class="bar-fill" style="width:${g.p}%"></div></div><b>${g.p}%</b></div>`).join('')}
      <div class="match-explain" style="margin-top:14px">Priority action: conduct a four-week Data Structures and Cloud workshop.</div>
    </div>
    <div class="card"><div class="card-head"><h2>Verification queue</h2><span class="pill pill-brass">${VERIFY_QUEUE.length} pending</span></div>
      ${VERIFY_QUEUE.slice(0, 3).map(v => `<div class="bar-row"><span><b>${v.student}</b><br><small class="muted">${v.item}</small></span></div>`).join('')}
      <button class="btn btn-outline btn-block" style="margin-top:10px" onclick="goPage('verify')">Open full queue</button>
    </div>
  </div>
</section>

<section class="page" id="page-verify">
  <div class="page-head"><div><span class="eyebrow">EVIDENCE REVIEW</span><h1>Verify Evidence</h1><p class="muted">Approve, reject, or request changes to student submissions.</p></div></div>
  <div class="card">${VERIFY_QUEUE.map(v => `<div class="candidate-row"><div class="cand-info"><div class="avatar">${v.student[0]}</div><div><b>${v.student}</b><br><small class="muted">${v.item} · ${v.type}</small></div></div><div style="display:flex;gap:8px"><button class="btn btn-primary btn-sm" data-action="Evidence approved for ${v.student}">Approve</button><button class="btn btn-ghost btn-sm" data-action="Changes requested from ${v.student}">Request changes</button><button class="btn btn-ghost btn-sm" data-action="Evidence rejected for ${v.student}">Reject</button></div></div>`).join('')}</div>
</section>

<section class="page" id="page-skillgap">
  <div class="page-head"><div><span class="eyebrow">DEPARTMENT READINESS</span><h1>Skill-Gap Analysis</h1><p class="muted">Where the Computer Science department stands today.</p></div></div>
  <div class="card">${SKILLGAP.map(g => `<div class="bar-row"><span style="width:170px">${g.s}</span><div class="bar-track"><div class="bar-fill" style="width:${g.p}%"></div></div><b>${g.p}%</b></div>`).join('')}</div>
  <div class="card" style="margin-top:16px;border-top:3px solid var(--brass)"><div class="card-head"><h2>Recommended institutional action</h2></div><p class="muted">Conduct a four-week Data Structures and Cloud workshop based on current skill gaps.</p><button class="btn btn-primary" onclick="goPage('workshops')">Plan workshop</button></div>
</section>

<section class="page" id="page-departments">
  <div class="page-head"><div><span class="eyebrow">COMPARE ACROSS DEPARTMENTS</span><h1>Department Reporting</h1><p class="muted">Verified skills, assessment performance and placement readiness by department.</p></div></div>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Department</th><th>Verified skills</th><th>Assessment performance</th><th>Applications</th><th>Selection rate</th></tr></thead><tbody>
    ${DEPTS.map(d => `<tr><td><b>${d.name}</b></td><td>${d.verified}</td><td>${d.assess}</td><td>${d.apps}</td><td>${d.sel}</td></tr>`).join('')}
  </tbody></table></div></div>
</section>

<section class="page" id="page-workshops">
  <div class="page-head"><div><span class="eyebrow">CLOSE THE GAP INSTITUTIONALLY</span><h1>Workshops &amp; Training</h1><p class="muted">Programs the college is running to close verified skill gaps.</p></div><button class="btn btn-primary btn-sm" data-action="New workshop form opened">+ Publish workshop</button></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Data Structures &amp; Cloud Fundamentals</h2><span class="pill pill-verified">Open</span></div><p class="muted">4 weeks · Targets the department's lowest-verified skills.</p><div class="bar-row"><span class="muted">Registered</span><b>212 students</b></div><button class="btn btn-outline btn-sm" style="margin-top:10px" data-action="Workshop roster opened">View roster</button></div>
    <div class="card"><div class="card-head"><h2>Industry Résumé &amp; Interview Prep</h2><span class="pill pill-amber">Planning</span></div><p class="muted">2 weeks · Requested by final-year students after placement season.</p><button class="btn btn-outline btn-sm" data-action="Workshop planning opened">Continue planning</button></div>
  </div>
</section>

<section class="page" id="page-opportunities">
  <div class="page-head"><div><span class="eyebrow">CAMPUS OPPORTUNITIES</span><h1>Manage Opportunities</h1><p class="muted">Campus-specific listings and invited employer partners.</p></div><button class="btn btn-primary btn-sm" data-action="Invite employer form opened">+ Invite employer</button></div>
  <div id="collegeOpps"></div>
</section>`;
}

function companyPages() {
  return `
<section class="page" id="page-dashboard">
  <div class="page-head"><div><span class="eyebrow">INDUSTRY VIEW</span><h1>NovaTech</h1><p class="muted">Find capable candidates beyond the resume.</p></div><button class="btn btn-primary btn-sm" onclick="goPage('create-opp')">+ Post opportunity</button></div>
  <div class="stat-row">
    <div class="stat-block"><small>Active opportunities</small><span class="n">8</span></div>
    <div class="stat-block"><small>Total applicants</small><span class="n">246</span></div>
    <div class="stat-block"><small>Shortlisted</small><span class="n">32</span></div>
    <div class="stat-block"><small>Positions filled</small><span class="n">14</span></div>
  </div>
  <div class="card"><div class="card-head"><h2>Top candidates — Software Engineering Intern</h2><button class="linkbtn" onclick="goPage('candidates')">View all</button></div>
    ${CANDIDATES.slice(0, 2).map(c => `<div class="candidate-row"><div class="cand-info"><div class="avatar">${c.name.slice(-1)}</div><div><b>${c.name}</b><br><small class="muted">${c.skills}</small></div></div><div style="display:flex;align-items:center;gap:10px"><span class="pill pill-verified">${c.match}% match</span><button class="btn btn-outline btn-sm" data-action="Skill Passport opened for ${c.name}">View passport</button></div></div>`).join('')}
  </div>
</section>

<section class="page" id="page-company-profile">
  <div class="page-head"><div><span class="eyebrow">HOW STUDENTS SEE YOU</span><h1>Company Profile</h1><p class="muted">Verified companies build more trust with student applicants.</p></div></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Profile details</h2></div>
      <div class="bar-row"><span class="muted">Company name</span><b>NovaTech</b></div>
      <div class="bar-row"><span class="muted">Industry</span><b>Software &amp; Cloud Services</b></div>
      <div class="bar-row"><span class="muted">Location</span><b>Bengaluru, India</b></div>
      <div class="bar-row"><span class="muted">Company size</span><b>200–500 employees</b></div>
      <div class="bar-row"><span class="muted">Website</span><b>novatech.example</b></div>
      <button class="btn btn-outline btn-block" style="margin-top:12px" data-action="Company profile edit opened">Edit profile</button>
    </div>
    <div class="card" style="border-top:3px solid var(--brass)"><div class="card-head"><h2>Verification status</h2><span class="pill pill-verified">✓ Verified company</span></div>
      <ul class="checklist"><li>✓ Company email verified</li><li>✓ Organization details reviewed</li><li>✓ Recruiter identity verified</li><li>✓ Previous hiring history available</li></ul>
    </div>
  </div>
</section>

<section class="page" id="page-create-opp">
  <div class="page-head"><div><span class="eyebrow">DEFINE THE ROLE</span><h1>Post an Opportunity</h1><p class="muted">Structured listings get matched to eligible students automatically.</p></div></div>
  <form class="form-card" onsubmit="event.preventDefault();notify('Opportunity submitted for admin review')">
    <div class="grid-2"><div class="field"><label>Role title</label><input placeholder="e.g. Backend Engineering Intern"></div><div class="field"><label>Opportunity type</label><select><option>Internship</option><option>Full-time job</option><option>Apprenticeship</option><option>Freelance project</option></select></div></div>
    <div class="field"><label>Role description</label><textarea rows="3" placeholder="What the intern will actually work on"></textarea></div>
    <div class="grid-2"><div class="field"><label>Required skills</label><input placeholder="Python, SQL, Git"></div><div class="field"><label>Minimum competency level</label><select><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div></div>
    <div class="grid-2"><div class="field"><label>Branch</label><input placeholder="Computer Science"></div><div class="field"><label>Graduation year</label><input placeholder="2026, 2027"></div></div>
    <div class="grid-2"><div class="field"><label>Location</label><input placeholder="Bengaluru"></div><div class="field"><label>Work mode</label><select><option>On-site</option><option>Hybrid</option><option>Remote</option></select></div></div>
    <div class="grid-2"><div class="field"><label>Stipend / salary</label><input placeholder="₹20,000/month"></div><div class="field"><label>Application deadline</label><input type="date"></div></div>
    <div class="grid-2"><div class="field"><label>Duration</label><input placeholder="3 months"></div><div class="field"><label>Number of openings</label><input placeholder="4"></div></div>
    <div class="field"><label>Selection process</label><input placeholder="Assessment → Interview → Offer"></div>
    <button class="btn btn-primary" type="submit">Submit for review</button>
    <p class="quiet" style="margin:10px 0 0;font-size:12px">Listings are reviewed by CampusBridge admins before they go live.</p>
  </form>
</section>

<section class="page" id="page-candidates">
  <div class="page-head"><div><span class="eyebrow">EVIDENCE, NOT KEYWORDS</span><h1>Matched Candidates</h1><p class="muted">Ranked by verified competency for Software Engineering Intern.</p></div></div>
  <div class="filters-row"><select><option>Verified skill</option></select><select><option>Competency level</option></select><select><option>Branch</option></select><select><option>Availability</option></select></div>
  <div class="card">${CANDIDATES.map(c => `<div class="candidate-row"><div class="cand-info"><div class="avatar">${c.name.slice(-1)}</div><div><b>${c.name}</b><br><small class="muted">${c.skills}</small><br><small class="quiet">Available ${c.avail}</small></div></div><div style="display:flex;align-items:center;gap:10px"><span class="pill pill-verified">${c.match}% match</span><button class="btn btn-outline btn-sm" data-action="Skill Passport opened for ${c.name}">View passport</button><button class="btn btn-primary btn-sm" data-action="${c.name} shortlisted">Shortlist</button></div></div>`).join('')}</div>
</section>`;
}

function adminPages() {
  return `
<section class="page" id="page-dashboard">
  <div class="page-head"><div><span class="eyebrow">PLATFORM OVERSIGHT</span><h1>Admin Overview</h1><p class="muted">Keep the marketplace verified and honest.</p></div></div>
  <div class="stat-row">
    <div class="stat-block"><small>Total users</small><span class="n">18,240</span></div>
    <div class="stat-block"><small>Companies verified</small><span class="n">312</span></div>
    <div class="stat-block"><small>Pending verifications</small><span class="n">7</span></div>
    <div class="stat-block"><small>Reported listings</small><span class="n">3</span></div>
  </div>
  <div class="card"><div class="card-head"><h2>Needs your attention</h2></div>
    ${ADMIN_QUEUE.map(q => `<div class="bar-row"><span><b>${q.name}</b><br><small class="muted">${q.type} · ${q.note}</small></span><button class="btn btn-outline btn-sm" data-action="Reviewing ${q.name}">Review</button></div>`).join('')}
  </div>
</section>

<section class="page" id="page-users">
  <div class="page-head"><div><span class="eyebrow">USER MANAGEMENT</span><h1>Users</h1><p class="muted">Students, colleges and company accounts across the platform.</p></div></div>
  <div class="card"><div class="table-wrap"><table><thead><tr><th>Name</th><th>Role</th><th>College / Org</th><th>Status</th></tr></thead><tbody>
    <tr><td>Jahnavi R</td><td>Student</td><td>BMS Institute of Technology</td><td><span class="pill pill-verified">Active</span></td></tr>
    <tr><td>Dept. of CSE, BMSIT</td><td>College / TPO</td><td>BMS Institute of Technology</td><td><span class="pill pill-verified">Active</span></td></tr>
    <tr><td>NovaTech HR</td><td>Company</td><td>NovaTech</td><td><span class="pill pill-verified">Active</span></td></tr>
    <tr><td>BrightHire Consultants</td><td>Company</td><td>BrightHire</td><td><span class="pill pill-burgundy">Reported</span></td></tr>
  </tbody></table></div></div>
</section>

<section class="page" id="page-verification">
  <div class="page-head"><div><span class="eyebrow">TRUST &amp; SAFETY</span><h1>Company Verification</h1><p class="muted">Confirm identity before a company can post a listing.</p></div></div>
  <div class="card">${ADMIN_QUEUE.filter(q => q.type.includes('New company')).map(q => `<div class="candidate-row"><div><b>${q.name}</b><br><small class="muted">${q.note}</small></div><div style="display:flex;gap:8px"><button class="btn btn-primary btn-sm" data-action="${q.name} verified">Approve</button><button class="btn btn-ghost btn-sm" data-action="${q.name} rejected">Reject</button></div></div>`).join('')}</div>
</section>

<section class="page" id="page-moderation">
  <div class="page-head"><div><span class="eyebrow">REPORTED CONTENT</span><h1>Listing Moderation</h1><p class="muted">Fake, misleading or duplicate listings reported by students.</p></div></div>
  <div class="card">${ADMIN_QUEUE.filter(q => q.type.includes('Reported')).map(q => `<div class="candidate-row"><div><b>${q.name}</b><br><small class="muted">${q.type}</small><br><small class="quiet">${q.note}</small></div><div style="display:flex;gap:8px"><button class="btn btn-ghost btn-sm" data-action="${q.name} listing removed">Remove listing</button><button class="btn btn-outline btn-sm" data-action="${q.name} report dismissed">Dismiss report</button></div></div>`).join('')}
  <div class="empty-state" style="padding-top:24px">No further reports in the queue.</div></div>
</section>

<section class="page" id="page-analytics">
  <div class="page-head"><div><span class="eyebrow">PLATFORM HEALTH</span><h1>Analytics</h1><p class="muted">A quick read of how the marketplace is performing.</p></div></div>
  <div class="two-col">
    <div class="card"><div class="card-head"><h2>Verified skills issued this month</h2></div>${SKILLGAP.map(g => `<div class="bar-row"><span style="width:170px">${g.s}</span><div class="bar-track"><div class="bar-fill" style="width:${g.p}%"></div></div><b>${g.p}%</b></div>`).join('')}</div>
    <div class="card"><div class="card-head"><h2>Marketplace snapshot</h2></div>
      <div class="bar-row"><span class="muted">Active opportunities</span><b>412</b></div>
      <div class="bar-row"><span class="muted">Applications this month</span><b>3,208</b></div>
      <div class="bar-row"><span class="muted">Average match score</span><b>77%</b></div>
      <div class="bar-row"><span class="muted">Placement rate</span><b>21%</b></div>
    </div>
  </div>
</section>`;
}

/* opportunities list + search (student + college reuse) */
function renderOppLists() {
  const all = document.getElementById('allOpps');
  const home = document.getElementById('homeOpps');
  const collegeOpps = document.getElementById('collegeOpps');
  if (all) { all.innerHTML = OPPS.map(o => oppCard(o, true)).join(''); }
  if (home) { home.innerHTML = OPPS.slice(0, 2).map(o => oppCard(o, false)).join(''); }
  if (collegeOpps) { collegeOpps.innerHTML = OPPS.slice(0, 3).map(o => oppCard(o, false)).join(''); }
  bindActionButtons(document.getElementById('content'));
}
function wireSearch() {
  const s = document.getElementById('oppSearch');
  if (s) s.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    const filtered = OPPS.filter(o => (o.role + o.company + o.have.join(' ')).toLowerCase().includes(q));
    document.getElementById('allOpps').innerHTML = filtered.length ? filtered.map(o => oppCard(o, true)).join('') : '<div class="empty-state">No matching opportunities found. Try a different skill or role.</div>';
    bindActionButtons(document.getElementById('content'));
  });
  const g = document.getElementById('globalSearch');
  if (g) g.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      goPage('opportunities');
      const os = document.getElementById('oppSearch');
      if (os) { os.value = g.value; os.dispatchEvent(new Event('input')); }
    }
  });
}
