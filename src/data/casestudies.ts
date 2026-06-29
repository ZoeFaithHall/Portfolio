import type { CaseStudy } from '@/types';

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'fleetio',
    client: 'Fleetio',
    years: '2022 — 2026',
    statement:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    role: 'Lead Frontend Architect',
    scale: ['14M+ users', '$6B valuation', '0 production defects', '1 → 12 team'],
    stack: ['React', 'TypeScript', 'Design systems', 'Accessibility'],
    carousel: [
      { title: 'Lorem ipsum',    caption: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { title: 'Dolor sit amet', caption: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
      { title: 'Consectetur',    caption: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
    ],
    theme: {
      bg: '#C5CFDC',
      text: '#2B2D42',
      accent: '#EF233C',
      band: '#8D99AE',
    },
    heroImage: '/images/casestudy/fleetio.jpg',
  },
  {
    slug: 'keystone',
    client: 'Tyler Technologies / Keystone',
    years: '2020 — 2022',
    statement:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    role: 'Frontend Architect',
    scale: ['13M PA residents', '4.6M alerts', 'WCAG 2.1 AA'],
    stack: ['Design systems', 'React', 'Tokens', 'Component library'],
    carousel: [
      { title: 'Excepteur sint',    caption: 'Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.' },
      { title: 'Anim id est',       caption: 'Laborum et dolorum fuga harum quidem rerum facilis est et expedita.' },
      { title: 'Nemo enim ipsam',   caption: 'Voluptatem quia voluptas sit aspernatur aut odit aut fugit consequuntur.' },
    ],
    theme: {
      bg: '#EDF2F4',
      text: '#2B2D42',
      accent: '#EF233C',
      band: '#C5CFDC',
    },
    heroImage: '/images/casestudy/keystone.jpg',
  },
  {
    slug: 'curion',
    client: 'Curion',
    years: '2026',
    statement:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    role: 'AI Architect (1099)',
    scale: ['16 domain experts', '67+ decision rules', '13,395 records'],
    stack: ['Decision systems', 'TypeScript', 'Deterministic gates', 'LLM boundaries'],
    carousel: [
      { title: 'Magni dolores',     caption: 'Eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.' },
      { title: 'Numquam eius',      caption: 'Modi tempora incidunt ut labore et dolore magnam aliquam quaerat.' },
      { title: 'Voluptatem',        caption: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.' },
    ],
    theme: {
      bg: '#F5D8DD',
      text: '#2B2D42',
      accent: '#D80032',
      band: '#D80032',
    },
    heroImage: '/images/casestudy/curion.jpg',
  },
];