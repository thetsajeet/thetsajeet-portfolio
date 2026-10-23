import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_DATA } from '../data/portfolio';
import userData from '../data/userData.json';

test('userData.json contains exact personal identifiers for Ajeet T S', () => {
  assert.equal(userData.firstName, 'Ajeet');
  assert.equal(userData.lastName, 'T S');
  assert.equal(userData.fullName, 'Ajeet T S');
  assert.equal(userData.copyrightName, 'T S Ajeet');
  assert.equal(userData.initials, 'TS');
  assert.equal(userData.role, 'Senior Software Engineer');
  assert.equal(userData.subtitle, 'UI · Backend · Agentic AI');
  assert.equal(userData.location, 'India');
  assert.equal(userData.resumeUrl, 'https://thetsajeet.com/Ajeet_TS_Resume.pdf');
  assert.equal(userData.profileImage, '/assets/aistudio/image_b4d68d89.png');
});

test('userData.json aboutBio and paragraphs reflect senior software engineer across UI, backend, and Agentic AI', () => {
  assert.ok(userData.aboutBio.includes('senior software engineer'));
  assert.ok(userData.aboutBio.includes('UI, backend and Agentic AI'));
  assert.ok(userData.aboutParagraphs.length >= 3);
  assert.ok(userData.aboutParagraphs.some(p => p.includes('Citi')));
  assert.ok(userData.aboutParagraphs.some(p => p.includes('NIT Trichy')));
});

test('userData.json social and contact links are fully defined with authentic profiles', () => {
  assert.equal(userData.links.website, 'https://thetsajeet.com/');
  assert.equal(userData.links.github, 'https://github.com/thetsajeet');
  assert.equal(userData.links.linkedin, 'https://www.linkedin.com/in/thetsajeet');
  assert.equal(userData.links.twitter, 'https://x.com/iamtsajeet');
  assert.equal(userData.links.email, 'mailto:ajeet.tumuluru@gmail.com');
  assert.equal(userData.links.resume, 'https://thetsajeet.com/Ajeet_TS_Resume.pdf');
});

test('userData.json pillars represent UI architecture, backend distributed systems, and agentic AI', () => {
  assert.equal(userData.pillars.length, 3);
  const ids = userData.pillars.map(p => p.id);
  assert.ok(ids.includes('ui-architecture'));
  assert.ok(ids.includes('backend-distributed'));
  assert.ok(ids.includes('agentic-ai'));
});

test('userData.json selectedWorks contains Citi, Rege.ai, Form Factory, and DBV Spring Boot starter', () => {
  assert.ok(userData.selectedWorks.length >= 4);
  const ids = userData.selectedWorks.map(w => w.id);
  assert.ok(ids.includes('citi-policies-portal'));
  assert.ok(ids.includes('rege-ai'));
  assert.ok(ids.includes('form-factory'));
  assert.ok(ids.includes('dbv-spring-boot'));

  for (const work of userData.selectedWorks) {
    assert.ok(work.title.length > 0);
    assert.ok(work.role.length > 0);
    assert.ok(work.timeline.length > 0);
    assert.ok(work.tools.length >= 3);
    assert.ok(work.metrics.length >= 2);
    assert.ok(work.deepDive.challenge.length > 20);
    assert.ok(work.deepDive.discovery.length > 20);
    assert.ok(work.deepDive.keyFeatures.length >= 2);
  }
});

test('userData.json projects collection contains full-stack engineering prototypes', () => {
  assert.ok(userData.projects.length >= 6);
  const ids = userData.projects.map(p => p.id);
  assert.ok(ids.includes('smart-ai'));
  assert.ok(ids.includes('market-microservices'));
  assert.ok(ids.includes('atlas-ai'));
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
  assert.ok(userData.workExperience.length >= 3);
  const citiFullTime = userData.workExperience.find(w => w.company === 'Citi' && w.role.includes('Senior Software Engineer'));
  assert.ok(citiFullTime);
  assert.ok(citiFullTime.highlights.length >= 3);

  const finllect = userData.workExperience.find(w => w.company === 'Finllect');
  assert.ok(finllect);
});

test('userData.json education and awards accurately reflect NIT Trichy and Hackathon honors', () => {
  assert.ok(userData.education.institution.includes('NIT Trichy') || userData.education.institution.includes('National Institute of Technology (NIT) Trichy'));
  assert.ok(userData.education.degree.includes('Distinction'));
  assert.ok(userData.awards.length >= 3);
  assert.ok(userData.awards.some(a => a.title.includes('Citi')));
});

test('PORTFOLIO_DATA matches userData.json exactly as single source of truth', () => {
  assert.equal(PORTFOLIO_DATA.profile.name, userData.fullName);
  assert.equal(PORTFOLIO_DATA.profile.role, userData.role);
  assert.equal(PORTFOLIO_DATA.profile.copyrightName, userData.copyrightName);
  assert.equal(PORTFOLIO_DATA.selectedWorks.length, userData.selectedWorks.length);
  assert.equal(PORTFOLIO_DATA.genAIProjects.length, userData.projects.length);
  assert.equal(PORTFOLIO_DATA.workExperience.length, userData.workExperience.length);
  assert.equal(PORTFOLIO_DATA.skills.length, userData.skills.length);
});
