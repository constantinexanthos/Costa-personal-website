export type ProjectStatus = 'Building' | 'Shipped' | 'Consulting' | 'Advising';

export interface Project {
  name: string;
  description: string;
  url: string | null;
  status: ProjectStatus;
}

export const projects: Project[] = [
  {
    name: 'Vigil',
    description:
      'A control panel for your coding agents. See what they changed and why, in plain English.',
    url: 'https://bevigil.ai',
    status: 'Building',
  },
  {
    name: 'Epitro',
    description:
      'AI property management for small landlords. Rents, cash flows, and portfolio health without the spreadsheet.',
    url: 'https://epitro.ai',
    status: 'Building',
  },
  {
    name: 'Beacon AP',
    description:
      'Building AI relationship intelligence for a Boston investment firm.',
    url: 'https://www.beaconap.com',
    status: 'Consulting',
  },
  {
    name: 'Yieldstack',
    description:
      'AI-native commercial real estate brokerage. Helping a close friend with product and stack.',
    url: 'https://yieldstack.ai',
    status: 'Advising',
  },
  {
    name: 'Neutralis',
    description: 'A functional prediction market.',
    url: 'https://neutralis.ai',
    status: 'Shipped',
  },
];
