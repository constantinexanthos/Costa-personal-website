export interface StackItem {
  name: string;
  description: string;
  url: string;
}

export const stack: StackItem[] = [
  {
    name: 'Ghostty',
    description: 'terminal',
    url: 'https://ghostty.org',
  },
  {
    name: 'Conductor',
    description: 'orchestrating coding agents',
    url: 'https://conductor.build',
  },
  {
    name: 'Wispr Flow',
    description: 'voice-to-text for writing',
    url: 'https://wisprflow.ai',
  },
  {
    name: 'Opus 4.7',
    description: 'the model I use day to day',
    url: 'https://www.anthropic.com/claude',
  },
  {
    name: 'Vercel',
    description: 'hosting and deploys',
    url: 'https://vercel.com',
  },
  {
    name: 'Railway',
    description: 'backend services',
    url: 'https://railway.com',
  },
];
