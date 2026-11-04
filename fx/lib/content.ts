/**
 * Page copy for MAZAL FX. House rule: no em dashes or en dashes used as
 * punctuation anywhere in user-facing copy (tests/no-em-dashes.test.ts).
 */

export const HERO = {
  pill: 'Free 7-day forex workshop',
  titleLead: 'Learn to trade in',
  titleAccent: '7 days.',
  sub: 'A free, beginner-friendly forex workshop series. Read charts, plan a trade and manage risk, live with a coach and a community of Filipino traders. No experience needed, and no deposit to join Day 1.',
  photoCard: {
    title: 'Real rooms, real traders.',
    body: 'Learn online, at the ATFX office, or over coffee with the MAZAL FX crew.',
  },
};

export const PROOF = [
  { value: '7', label: 'live sessions, one skill a day' },
  { value: '₱0', label: 'to join Day 1' },
  { value: '3', label: 'ways to learn: online, office, coffee' },
  { value: '1', label: 'community of Filipino traders' },
];

export const PERKS = [
  'Free forex workshops',
  'Study materials',
  'Trading buddies',
  'Market insights',
  'Live trade setups',
  'Copytrading access',
  'Partner perks',
  'Event invites',
  'Merch giveaways',
];

export type Day = { day: number; title: string; tag?: { label: string; tone: 'navy' | 'orange' } };

export const SEVEN_DAYS: Day[] = [
  { day: 1, title: 'Forex basics: what moves currencies and how traders profit or lose', tag: { label: 'Open to all', tone: 'navy' } },
  { day: 2, title: 'Platform setup and your first live practice trade', tag: { label: 'Free account needed', tone: 'orange' } },
  { day: 3, title: 'Reading price: candlesticks and market structure' },
  { day: 4, title: 'Support, resistance and trend' },
  { day: 5, title: 'News and sessions: when to trade, and when to sit out' },
  { day: 6, title: 'Risk management: position size, stop loss and leverage' },
  { day: 7, title: 'Your trading plan, a full live walkthrough, and what comes next' },
];

export const SEVEN_DAYS_INTRO = {
  eyebrow: 'The 7-day path',
  titleLead: 'One skill a day.',
  titleAccent: 'Live, on Google Meet.',
  body: "Day 1 is open to everyone. From Day 2 you practise on a real platform, so you'll open a free trading account under MAZAL FX with our broker partner ATFX. We walk you through it in 5 minutes.",
};

export const WAYS = [
  {
    title: 'Live on Google Meet',
    body: 'Join each session from your phone or laptop. Ask questions while the coach trades the chart in real time.',
  },
  {
    title: 'At the ATFX office',
    body: 'Sit in on in-person sessions with the team and other traders, screens up, one setup at a time.',
  },
  {
    title: 'Coffee meets',
    body: 'Small, casual meetups to review trades, swap notes and find your trading buddies.',
  },
];

export const COACHES = [
  { name: 'Ezra', role: 'Forex analyst' },
  { name: 'Miko', role: 'Forex analyst' },
  { name: 'James', role: 'Forex analyst' },
];

export const PARTNER = {
  name: 'ATFX',
  label: 'Broker partner',
  body: 'From Day 2 you practise on a real platform. Your free account is opened with ATFX under MAZAL FX, and our team walks you through every step.',
};

export const GALLERY = [
  { src: '/images/workshop-1.jpg', alt: 'MAZAL live trading workshop' },
  { src: '/images/session-1.jpg', alt: 'MAZAL in-house community session' },
  { src: '/images/workshop-3.jpg', alt: 'Traders following a live chart walkthrough' },
  { src: '/images/bootcamp-1.jpg', alt: 'MAZAL trading bootcamp' },
  { src: '/images/workshop-4.jpg', alt: 'Coach walking a group through a setup' },
  { src: '/images/session-2.jpg', alt: 'Community members at a monthly session' },
];

export const FAQ = [
  {
    q: 'Is the workshop really free?',
    a: 'Yes. All 7 days are free. Day 1 needs nothing but your seat. From Day 2 you open a free trading account so you can practise on a real platform.',
  },
  {
    q: 'Do I need to deposit money?',
    a: 'No deposit is needed to join the workshop. Whether you ever fund a live account is your decision, and you should only ever trade money you can afford to lose.',
  },
  {
    q: 'Why do I need an account from Day 2?',
    a: 'Because watching is not the same as doing. From Day 2 we place practice trades together, so everyone needs a platform login. We open it with ATFX under MAZAL FX, and it takes about 5 minutes.',
  },
  {
    q: 'I have never traded before. Is this for me?',
    a: 'That is exactly who it is for. We start from what a currency pair is and build up one skill a day.',
  },
  {
    q: 'Where and when are the sessions?',
    a: 'Sessions run live on Google Meet, with in-person sessions at the ATFX office and casual coffee meets. Schedules and links are posted in the MAZAL FX Telegram.',
  },
  {
    q: 'Will I make money after 7 days?',
    a: 'No one can promise that, and you should be wary of anyone who does. You will learn how forex works, how to read a chart, and how to manage risk. Results depend on you and the market.',
  },
];

export const RISK_DISCLAIMER =
  'Trading forex and CFDs on margin carries a high level of risk and may not be suitable for everyone. Leverage can work against you as well as for you, and you can lose more than you expect. MAZAL FX provides education and community only. Nothing on this site is financial advice, a recommendation, or a guarantee of profit. Past results do not guarantee future outcomes. Only trade with money you can afford to lose.';

export const EXPERIENCE_LEVELS = [
  { value: 'new', label: 'Brand new, never traded' },
  { value: 'some', label: 'Tried it a little' },
  { value: 'active', label: 'Trading already, want structure' },
] as const;

export const HEARD_FROM = ['Facebook', 'TikTok', 'Threads', 'X', 'Telegram', 'A friend', 'An event', 'Other'] as const;
