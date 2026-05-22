import type { CaseStudy } from '@types';

/**
 * Three case studies, each with its own theme. The punchWord renders in the
 * accent color at display size; the frame ("without heroics") is the shared spine.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'fleetio',
    client: 'Fleetio',
    years: '2022 — 2026',
    punchWord: 'scale',
    frame: 'without heroics',
    description: [
      'Lead Frontend Architect through Fleetio\'s growth from Series B to a $6B valuation. Sole architect scaled to a team of twelve, supporting 14M+ cumulative users across three years.',
      'Zero production UI defects in three years. Build times from 28 minutes to 2. Accessibility from 64 to 98. Revenue attainment from 67% to 134% in two quarters.',
    ],
    role: 'Lead Frontend Architect',
    scale: ['14M+ users', '$6B valuation', '0 production defects', '1 → 12 team'],
    stack: ['React', 'TypeScript', 'Design systems', 'Accessibility'],
    theme: {
      bg: '#1a1612',
      text: '#f0ece4',
      accent: '#d4a45c',
      band: '#2a2218',
    },
  },
  {
    slug: 'keystone',
    client: 'Tyler Technologies / Keystone',
    years: '2020 — 2022',
    punchWord: 'access',
    frame: 'without heroics',
    description: [
      'Frontend Architect on the Keystone Design System, serving 13M Pennsylvania residents through state government applications.',
      'Separate work on an emergency notification platform alerting 4.6M Louisiana residents in real time. Accessibility and reliability as infrastructure, not afterthoughts.',
    ],
    role: 'Frontend Architect',
    scale: ['13M PA residents', '4.6M alerts', 'WCAG 2.1 AA'],
    stack: ['Design systems', 'React', 'Tokens', 'Component library'],
    theme: {
      bg: '#1a1d22',
      text: '#e6ecf0',
      accent: '#7eb5c4',
      band: '#22272d',
    },
  },
  {
    slug: 'curion',
    client: 'Curion',
    years: '2026',
    punchWord: 'judgment',
    frame: 'without heroics',
    description: [
      'AI architecture engagement at StealthX. Encoded the decisions of sixteen domain experts into deterministic gate logic, with the probabilistic layer handling only what humans had agreed should be inferred.',
      '67+ gate-level decision rules across 10 logic gates. 13,395 historical records analyzed. The result reads as expert judgment, but the system is auditable line by line.',
    ],
    role: 'AI Architect (1099)',
    scale: ['16 domain experts', '67+ decision rules', '13,395 records'],
    stack: ['Decision systems', 'TypeScript', 'Deterministic gates', 'LLM boundaries'],
    theme: {
      bg: '#181420',
      text: '#ece4f0',
      accent: '#b794d9',
      band: '#241c30',
    },
  },
];

export const navAnchors = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#work', label: 'Work' },
  { href: '#numbers', label: 'Numbers' },
  { href: '#contact', label: 'Contact' },
];
