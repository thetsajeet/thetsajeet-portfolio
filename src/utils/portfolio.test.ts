import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_DATA } from '../data/portfolio';
import userData from '../data/userData.json';

test('userData.json contains exact personal identifiers for T S Ajeet', () => {
  assert.equal(userData.firstName, 'T S');
  assert.equal(userData.lastName, 'Ajeet');
  assert.equal(userData.fullName, 'T S Ajeet');
  assert.equal(userData.copyrightName, 'T S Ajeet');
  assert.equal(userData.initials, 'TS');
  assert.equal(userData.role, 'Senior Software Engineer');
  assert.equal(userData.headline, 'I engineer high-scale distributed systems and intelligent software.');
  assert.equal(userData.subtitle, 'Specializing in resilient backends, modular UI architectures, and Agentic AI.');
  assert.equal(userData.location, 'India');
  assert.equal(userData.resumeUrl, '/Ajeet_TS_Resume.pdf');
  assert.equal(userData.profileImage, '/assets/aistudio/image_b4d68d89.png');
});

test('userData.json about copy reflects resume experience and current projects', () => {
  assert.ok(userData.aboutBio.includes('Senior Software Engineer at Citi'));
  assert.ok(userData.aboutBio.includes('agentic AI systems'));
  assert.ok(!userData.aboutBio.includes('Thinker | Tinkerer | Technologist'));
  assert.ok(userData.aboutParagraphs.length >= 3);
  assert.ok(userData.aboutParagraphs.some(p => p.includes('Citi')));
  assert.ok(userData.aboutParagraphs.some(p => p.includes('Shadow')));
  assert.ok(userData.aboutParagraphs.some(p => p.includes('no forever stack')));
});

test('userData.json social and contact links are fully defined with authentic profiles', () => {
  assert.equal(userData.links.website, 'https://thetsajeet.com/');
  assert.equal(userData.links.github, 'https://github.com/thetsajeet');
  assert.equal(userData.links.linkedin, 'https://www.linkedin.com/in/thetsajeet');
  assert.equal(userData.links.twitter, 'https://x.com/iamtsajeet');
  assert.equal(userData.links.email, 'mailto:ajeet.tumuluru@gmail.com');
  assert.equal(userData.links.resume, '/Ajeet_TS_Resume.pdf');
});

test('userData.json pillars use active gerunds for UI architecture, backend distributed systems, and agentic AI', () => {
  assert.equal(userData.pillars.length, 3);
  const ids = userData.pillars.map(p => p.id);
  assert.ok(ids.includes('ui-architecture'));
  assert.ok(ids.includes('backend-distributed'));
  assert.ok(ids.includes('agentic-ai'));

  const uiPillar = userData.pillars.find(p => p.id === 'ui-architecture');
  assert.ok(uiPillar?.description.startsWith('Building performant'));

  const backendPillar = userData.pillars.find(p => p.id === 'backend-distributed');
  assert.ok(backendPillar?.description.startsWith('Building scalable'));
  assert.ok(!backendPillar?.description.includes('Spring Boot'));

  const aiPillar = userData.pillars.find(p => p.id === 'agentic-ai');
  assert.ok(aiPillar?.description.startsWith('Architecting autonomous'));
});

test('selectedWorks excludes removed showcases and retains the remaining projects', () => {
  assert.equal(userData.selectedWorks.length, 2);
  const ids = userData.selectedWorks.map(w => w.id);
  assert.ok(!ids.includes('citi-policies-portal'));
  assert.ok(!ids.includes('rege-ai'));
  assert.ok(ids.includes('form-factory'));
  assert.ok(ids.includes('dbv-spring-boot'));
  assert.ok(!('stats' in userData));

  for (const work of userData.selectedWorks) {
    assert.ok(work.title.length > 0);
    assert.ok(work.role.length > 0);
    assert.ok(work.timeline.length > 0);
    assert.ok(work.tools.length >= 3);
    assert.ok(work.deepDive.challenge.length > 20);
    assert.ok(work.deepDive.discovery.length > 20);
    assert.ok(work.deepDive.keyFeatures.length >= 2);
  }
});

test('userData.json projects collection includes Shadow and excludes removed showcases', () => {
  assert.ok(userData.projects.length >= 6);
  const ids = userData.projects.map(p => p.id);
  assert.deepEqual(PORTFOLIO_DATA.genAIProjects.slice(0, 6).map(p => p.id), [
    'shadow',
    'smart-ai',
    'webcrawler-cli',
    'form-factory',
    'ngx-placeholder',
    'market-microservices'
  ]);
  assert.ok(ids.includes('smart-ai'));
  assert.ok(ids.includes('market-microservices'));
  assert.ok(ids.includes('shadow'));
  assert.ok(!ids.includes('atlas-ai'));
  assert.ok(ids.includes('ngx-placeholder'));
  assert.ok(ids.includes('webcrawler-cli'));
  assert.ok(ids.includes('finllect-gateway'));

  for (const proj of userData.projects) {
    assert.ok(proj.title.length > 0);
    assert.ok(proj.summary.length > 0);
    assert.ok(proj.storyHeading.length > 0);
    assert.ok(proj.storyBody.length >= 2);
  }
});

test('userData.json workExperience captures Citi and Finllect tenures', () => {
  const citiFullTime = userData.workExperience.find(w => w.company === 'Citi' && w.role === 'Senior Software Engineer (C11)');
  assert.ok(citiFullTime);
  assert.ok(citiFullTime.highlights.some(h => h.includes('Arthur')));
  assert.ok(citiFullTime.highlights.some(h => h.includes('MCP server')));

  const finllect = userData.workExperience.find(w => w.company === 'Finllect');
  assert.ok(finllect);
  assert.ok(finllect.role.includes('Intern'));
  assert.ok(finllect.highlights.some(h => h.includes('Node.js')));

  assert.deepEqual(
    userData.workExperience.map(w => w.role),
    [
      'Senior Software Engineer (C11)',
      'Software Development Engineer Intern',
      'Software Development Engineer Intern'
    ]
  );
});

test('remaining selected works are available in the Projects collection', () => {
  const projectIds = PORTFOLIO_DATA.genAIProjects.map(project => project.id);
  assert.ok(projectIds.includes('form-factory'));
  assert.ok(projectIds.includes('dbv-spring-boot'));
  assert.ok(!projectIds.includes('citi-policies-portal'));
  assert.ok(!projectIds.includes('rege-ai'));
  assert.ok(!projectIds.includes('atlas-ai'));
  assert.ok(projectIds.includes('shadow'));
});

test('moved case studies preserve all deep-dive content in Projects', () => {
  for (const work of userData.selectedWorks) {
    const project = PORTFOLIO_DATA.genAIProjects.find(item => item.id === work.id);
    assert.ok(project);
    assert.ok(project.storyBody.includes(work.deepDive.challenge));
    assert.ok(project.storyBody.includes(work.deepDive.approach));
    assert.ok(project.storyBody.includes(work.deepDive.discovery));
    assert.ok(project.storyBody.includes(work.deepDive.impact));

    for (const feature of work.deepDive.keyFeatures) {
      assert.ok(project.storyBody.includes(`${feature.title}: ${feature.desc}`));
    }
  }
});

test('userData.json education and awards accurately reflect NIT Trichy and Hackathon honors', () => {
  assert.ok(userData.education.institution.includes('Trichy'));
  assert.ok(userData.education.degree.includes('Production Engineering'));
  assert.ok(userData.education.degree.includes('8.64'));
  assert.ok(userData.awards.length >= 3);
  assert.ok(userData.awards.some(a => a.title.includes('Citi')));
});

test('PORTFOLIO_DATA matches userData.json exactly as single source of truth', () => {
  assert.equal(PORTFOLIO_DATA.profile.name, userData.fullName);
  assert.equal(PORTFOLIO_DATA.profile.role, userData.role);
  assert.equal(PORTFOLIO_DATA.profile.copyrightName, userData.copyrightName);
  assert.equal(PORTFOLIO_DATA.selectedWorks.length, userData.selectedWorks.length);
  assert.equal(
    PORTFOLIO_DATA.genAIProjects.length,
    userData.projects.length + userData.selectedWorks.length
  );
  assert.equal(PORTFOLIO_DATA.workExperience.length, userData.workExperience.length);
  assert.equal(PORTFOLIO_DATA.skills.length, userData.skills.length);
});
