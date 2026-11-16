/**
 * Testimonials, verbatim from zoehall.dev. Keep the wording exactly as
 * given by each person; edit only with their sign-off.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      'She consistently designs scalable, maintainable solutions while keeping both business goals and UX front and center. I’d recommend her to any team looking for a strong architectural leader.',
    name: 'Megan Aiken',
    role: 'Senior Conversion Rate Optimization Specialist, Growth Strategist',
    org: 'Fleetio',
  },
  {
    quote:
      'As a team member, Zoë consistently asks smart questions, pays attention to detail, and scopes + executes work effectively to meet deadlines. Across multiple launches we worked on together, Zoë brought a calm, intentional approach that made collaboration easy. Zoë is someone who communicates clearly and executes with care.',
    name: 'Daniel Simpson',
    role: 'Manager, Product Marketing',
    org: 'Fleetio',
  },
  {
    quote:
      'Zoe’s technical skills and attention to detail have had a significant impact on our website’s performance and user experience. Her work on optimizing our content and integrating with Sanity and Storybook has empowered our content creators to efficiently manage and publish high-quality content, ultimately benefiting our users.',
    name: 'Ross Gebhart',
    role: 'Director, Brand Marketing',
    org: 'Fleetio',
  },
  {
    quote:
      'I truly valued working with Zoe. Her approach to problem-solving elevated the quality of our projects, handling complex challenges with creativity and precision. Zoe was reliable, efficient, and an excellent collaborator. Her communication and teamwork made the process smooth and productive, and her contributions were key to our success.',
    name: 'Lindsey Drennan',
    role: 'Senior Brand Designer',
    org: 'Fleetio',
  },
  {
    quote:
      'I can say with complete certainty that her effort to go beyond was unrivalled. Instead of us debugging issues during our weekly meetings, she asked thought-provoking questions around why something was done the way it was, and discussed how code could be improved. Zoe’s passion for quality code, curiosity, and understanding has only scratched the surface and will excel her as a software engineer.',
    name: 'Cory Trimm',
    role: 'Principal Engineering Manager',
    org: 'Nava',
  },
  {
    quote:
      'I was fortunate enough to work alongside Zoë during ideation for a non-profit. Zoë is an exceptional developer who combines deep technical expertise with a genuine, user-centric mindset. She collaborates naturally with colleagues across disciplines and contributes to a strong team dynamic. What sets Zoë apart is her ability to think beyond the obvious by regularly proposing thoughtful, creative solutions that balance technical requirements with real user needs.',
    name: 'Ben Brautigam',
    role: 'Founder and Head of Product',
    org: 'Eyrus, TEDx Speaker',
  },
];
