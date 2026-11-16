/** Tools Zoë builds with, from zoehall.dev and her resume, grouped by job. */
export type TechGroup = { label: string; items: readonly string[] };

export const techStack: readonly TechGroup[] = [
  { label: 'Languages and frameworks', items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Vite', 'Node.js', 'GraphQL', 'Python'] },
  { label: 'Design systems and styling', items: ['Storybook', 'Chromatic', 'Figma', 'Tailwind CSS', 'SASS'] },
  { label: 'Quality and accessibility', items: ['Playwright', 'Sentry', 'GitHub Actions', 'Lighthouse', 'JAWS', 'NVDA'] },
  { label: 'AI-enhanced workflow', items: ['Claude Code', 'Claude API', 'GitHub Copilot'] },
  { label: 'Platform and data', items: ['Vercel', 'Sanity', 'PostgreSQL', 'MongoDB', 'Docker', 'Git and GitHub'] },
];
