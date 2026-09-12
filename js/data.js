/* =====================================================================
   CAMPUSBRIDGE — DATA
   All demo data lives here so app.js stays focused on behaviour.
   Everything below is clearly fictional demo data for an SIH prototype.
   ===================================================================== */

/* ---------------- ICONS ---------------- */
const ICONS = {
  overview: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.8"/><rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" stroke-width="1.8"/></svg>',
  passport: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M8 17c1-2 7-2 8 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  opp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M21 21l-4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  apps: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="currentColor" stroke-width="1.8"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  road: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 20L14 4M20 20L14 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 12h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  proj: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="currentColor" stroke-width="1.8"/></svg>',
  test: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v5l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  profile: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c1.5-4.5 5-6 8-6s6.5 1.5 8 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  queue: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 11l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/></svg>',
  gap: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 19V9M11 19V4M18 19v-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  dept: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  workshop: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l2 5 5 .8-3.6 3.5.9 5.2L12 14l-4.3 2.5.9-5.2L5 7.8 10 7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  manage: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M7 9h10M7 13h10M7 17h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  cand: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="10" r="2.4" stroke="currentColor" stroke-width="1.8"/><path d="M2 20c.8-3.4 3.4-5 6-5s5.2 1.6 6 5M14 20c.5-2.2 2-3.6 4-3.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3.2" stroke="currentColor" stroke-width="1.8"/><circle cx="17" cy="8" r="2.4" stroke="currentColor" stroke-width="1.8"/><path d="M3 20c.7-3.6 3.4-5.5 6-5.5s5.3 1.9 6 5.5M15 20c.4-2.4 2-4 4-4.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  shield: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 5-3.2 7.8-7 9-3.8-1.2-7-4-7-9V6z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  flag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 3v18M5 4h11l-2.5 3L16 10H5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  chart: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4v16h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M8 15l3-4 3 2 4-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  build: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 3H6a2 2 0 00-2 2v3M15 3h3a2 2 0 012 2v3M9 21H6a2 2 0 01-2-2v-3M15 21h3a2 2 0 002-2v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
};

/* ---------------- BRAND MARK ---------------- */
const SEAL_SVG = '<svg class="seal" width="30" height="30" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#9C7A2E" stroke-width="2"/><circle cx="20" cy="20" r="13" stroke="#9C7A2E" stroke-width="1"/><path d="M13 20l5 5 9-11" stroke="#14171F" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const SEAL_SVG_WHITE = '<svg class="seal" width="28" height="28" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" stroke="#C7A855" stroke-width="2"/><circle cx="20" cy="20" r="13" stroke="#C7A855" stroke-width="1"/><path d="M13 20l5 5 9-11" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* ---------------- SAMPLE DATA (fictional demo data) ---------------- */
const OPPS = [
  { id: 1, role: 'Software Engineering Intern', company: 'NovaTech', verified: true, match: 86, have: ['Python', 'Git', 'Problem solving'], miss: ['Data structures', 'REST APIs'], stipend: '₹20,000/month', location: 'Bengaluru', mode: 'Hybrid', type: 'Internship', deadline: '18 Sep 2026', paid: true, cert: true, ftOffer: true, positions: 4, duration: '3 months', hours: 'Flexible, 6 hrs/day', selection: 'Assessment → Interview → Offer', reason: 'Your verified projects match four out of five required skills.' },
  { id: 2, role: 'Data Analyst Intern', company: 'DataLoop', verified: true, match: 82, have: ['Python', 'SQL', 'Excel'], miss: ['Statistics', 'Data visualization'], stipend: '₹18,000/month', location: 'Remote', mode: 'Remote', type: 'Internship', deadline: '22 Sep 2026', paid: true, cert: true, ftOffer: false, positions: 2, duration: '2 months', hours: '6 hrs/day', selection: 'Assessment → Interview', reason: 'Your SQL and Python assessments cover the core requirement.' },
  { id: 3, role: 'Frontend Developer Intern', company: 'PixelLabs', verified: true, match: 78, have: ['JavaScript', 'HTML/CSS', 'Git'], miss: ['React'], stipend: '₹15,000/month', location: 'Bengaluru', mode: 'On-site', type: 'Internship', deadline: '25 Sep 2026', paid: true, cert: false, ftOffer: false, positions: 3, duration: '3 months', hours: '6 hrs/day', selection: 'Portfolio review → Interview', reason: 'Your Campus Navigation App demonstrates the core frontend stack.' },
  { id: 4, role: 'Junior QA Engineer', company: 'ShieldSoft', verified: false, match: 61, have: ['Problem solving'], miss: ['Manual testing', 'SQL', 'Git'], stipend: '₹12,000/month', location: 'Hyderabad', mode: 'On-site', type: 'Internship', deadline: '30 Sep 2026', paid: false, cert: true, ftOffer: false, positions: 1, duration: '6 months', hours: '8 hrs/day', selection: 'Direct interview', reason: 'Limited overlap — mostly your problem-solving assessment.' }
];

const SKILLS = [
  { name: 'Python', level: 'Intermediate', status: 'College verified', verifier: 'Dept. of Computer Science', evidence: 'College assessment + 2 projects', score: '82%', date: '08 Sep 2026' },
  { name: 'SQL', level: 'Intermediate', status: 'College verified', verifier: 'Dept. of Computer Science', evidence: 'College assessment', score: '78%', date: '05 Sep 2026' },
  { name: 'JavaScript', level: 'Beginner', status: 'Evidence submitted', verifier: 'Awaiting faculty review', evidence: 'Campus Navigation App (GitHub + demo)', score: '—', date: '06 Sep 2026' },
  { name: 'Git', level: 'Beginner', status: 'Evidence submitted', verifier: 'Awaiting faculty review', evidence: 'Two linked repositories', score: '—', date: '06 Sep 2026' },
  { name: 'Data structures', level: 'Self-declared', status: 'Self-declared', verifier: '—', evidence: 'Not yet submitted', score: '—', date: '—' }
];

const APPLICATIONS = [
  { role: 'Software Engineering Intern', company: 'NovaTech', applied: '08 Sep 2026', status: 'Shortlisted', stage: 5, timeline: [['08 Sep — Application submitted', 1], ['09 Sep — Application reviewed', 1], ['11 Sep — Assessment assigned', 1], ['14 Sep — Assessment completed, scored 82%', 1], ['18 Sep — Interview scheduled, 11:00 AM', 0]] },
  { role: 'Data Analyst Intern', company: 'DataLoop', applied: '06 Sep 2026', status: 'Under review', stage: 2, timeline: [['06 Sep — Application submitted', 1], ['08 Sep — Application under review', 0]] },
  { role: 'Frontend Developer Intern', company: 'PixelLabs', applied: '03 Sep 2026', status: 'Not selected', stage: 0, feedback: 'Strengthen React fundamentals and rebuild one project using componentised structure.', timeline: [['03 Sep — Application submitted', 1], ['05 Sep — Application reviewed', 1], ['07 Sep — Not selected', 1]] }
];

const PROJECTS = [
  { title: 'Campus Navigation App', status: 'Faculty verified', desc: 'Helps students locate classrooms, laboratories and campus facilities from a single screen.', tech: ['JavaScript', 'HTML/CSS', 'SQL', 'Git'], role: 'Frontend developer & database designer', evidence: 'GitHub repository · Live demo · Faculty evaluation' },
  { title: 'Student Performance Dashboard', status: 'Pending review', desc: 'A dashboard that helps faculty spot learning trends and students needing support.', tech: ['Python', 'Data analysis', 'Charts'], role: 'Data analyst', evidence: 'Report uploaded · Mentor review pending' }
];

const NOTIFS = [
  { t: 'Interview scheduled', d: 'NovaTech · Software Engineering Intern, 18 Sep, 11:00 AM' },
  { t: 'New matching opportunity', d: 'Backend Intern at Loopwave — 74% match' },
  { t: 'Skill verified', d: 'Python moved to College verified by Dept. of CSE' },
  { t: 'Assessment deadline', d: 'Data Structures assessment closes in 2 days' },
  { t: 'Workshop announced', d: '4-week Data Structures & Cloud workshop — registrations open' }
];

const SKILLGAP = [{ s: 'Python', p: 72 }, { s: 'SQL', p: 54 }, { s: 'Data structures', p: 39 }, { s: 'Cloud fundamentals', p: 18 }];

const DEPTS = [
  { name: 'Computer Science', verified: '68%', assess: '74%', apps: 412, sel: '22%' },
  { name: 'Information Science', verified: '59%', assess: '61%', apps: 298, sel: '19%' },
  { name: 'Electronics', verified: '41%', assess: '52%', apps: 210, sel: '14%' },
  { name: 'Mechanical', verified: '33%', assess: '40%', apps: 145, sel: '9%' }
];

const VERIFY_QUEUE = [
  { student: 'Aarav Shah', item: 'Python — College assessment score 82%', type: 'Assessment' },
  { student: 'Meera Iyer', item: 'Campus Navigation App — GitHub + live demo', type: 'Project' },
  { student: 'Rohan Kulkarni', item: 'AWS Cloud Practitioner certificate', type: 'Certification' },
  { student: 'Divya Nair', item: 'Hackathon participation — Smart India Hackathon', type: 'Hackathon' }
];

const CANDIDATES = [
  { name: 'Student A', match: 91, skills: 'Python: Advanced, college verified · SQL: Intermediate, project verified · Git: Intermediate, college verified', avail: 'June – August' },
  { name: 'Student B', match: 84, skills: 'Python: Intermediate, industry assessed · Git: Intermediate, project verified', avail: 'June – July' },
  { name: 'Student C', match: 77, skills: 'Python: Intermediate, self-declared · SQL: Beginner, evidence submitted', avail: 'July – September' }
];

const COMPANY_NOTIFS = [
  { t: 'New suitable candidate', d: 'Student A — 91% match for Python Intern' },
  { t: 'New application', d: 'Software Engineering Intern received 6 new applications' },
  { t: 'Assessment completed', d: 'Student B completed the Python screening assessment' }
];

const COLLEGE_NOTIFS = [
  { t: 'Pending verification', d: '4 evidence submissions waiting in your review queue' },
  { t: 'New company opportunity', d: 'NovaTech posted 4 openings eligible for CSE, 2026 batch' },
  { t: 'Skill-gap alert', d: 'Cloud fundamentals verified in only 18% of final-year students' }
];

const ADMIN_QUEUE = [
  { name: 'Loopwave Technologies', type: 'New company — pending verification', note: 'Email domain and registration submitted' },
  { name: 'BrightHire Consultants', type: 'Reported listing — unpaid, misleading stipend claim', note: '3 student reports received' },
  { name: 'CodeForge Labs', type: 'New company — pending verification', note: 'Awaiting recruiter identity check' }
];

/* ---------------- ROLE / NAV CONFIG ---------------- */
const NAV = {
  student: [['dashboard', 'Overview', 'overview'], ['passport', 'Skill Passport', 'passport'], ['opportunities', 'Opportunities', 'opp'], ['applications', 'Applications', 'apps'], ['roadmap', 'Skill-Gap Roadmap', 'road'], ['projects', 'Projects', 'proj'], ['assessments', 'Assessments', 'test'], ['profile', 'Profile & Privacy', 'profile']],
  college: [['dashboard', 'Overview', 'overview'], ['verify', 'Verify Evidence', 'queue'], ['skillgap', 'Skill-Gap Analysis', 'gap'], ['departments', 'Departments', 'dept'], ['workshops', 'Workshops', 'workshop'], ['opportunities', 'Opportunities', 'manage']],
  company: [['dashboard', 'Overview', 'overview'], ['company-profile', 'Company Profile', 'profile'], ['create-opp', 'Post Opportunity', 'build'], ['candidates', 'Matched Candidates', 'cand']],
  admin: [['dashboard', 'Overview', 'overview'], ['users', 'Users', 'users'], ['verification', 'Company Verification', 'shield'], ['moderation', 'Listing Moderation', 'flag'], ['analytics', 'Platform Analytics', 'chart']]
};
const ROLE_LABEL = { student: 'STUDENT WORKSPACE', college: 'COLLEGE / TPO WORKSPACE', company: 'COMPANY WORKSPACE', admin: 'ADMINISTRATOR WORKSPACE' };
const ROLE_NOTIFS = { student: NOTIFS, college: COLLEGE_NOTIFS, company: COMPANY_NOTIFS, admin: [{ t: '3 companies pending verification', d: 'Review queue needs attention' }, { t: '2 listings reported', d: 'BrightHire Consultants flagged by students' }] };
const ROLE_NAMES = { student: ['Jahnavi', 'S', 'BMSIT · CSE'], college: ['TPO, BMSIT', 'T', 'BMS Institute of Technology and Management'], company: ['NovaTech HR', 'N', 'NovaTech'], admin: ['Platform Admin', 'A', 'CampusBridge Platform'] };
const AUTH_EMAIL_LABEL = { student: 'College email', college: 'Institutional email', company: 'Work email', admin: 'Admin email' };
