export type Person = {
  slug: string
  name: string
  initials: string
  role: string
  description: string
}

export type Lore = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  paragraphs: string[]
}

export type Meme = {
  slug: string
  title: string
  subtitle: string
  image: string
  originalImage: string
  width: number
  height: number
  alt: string
  date: string
  dateLabel: string
  depicted: string[]
  referenced: string[]
  creator: string
  requester: string
  format: string
  formatUrl: string
  lore: string[]
  story: string
  note?: string
}

export const people: Person[] = [
  {
    slug: 'brolley',
    name: 'Fat Brolley',
    initials: 'FB',
    role: 'Recurring character',
    description:
      'The face of this first collection. Cast as C.H.A.T.’s ruler, judge, musician and very enthusiastic fact-checker. These are fictional meme roles, not real-world claims.',
  },
  {
    slug: 'pete',
    name: 'Pete / Peter',
    initials: 'P',
    role: 'Referenced in the captions',
    description:
      'The recurring counterpart in the return-to-chat, appeal and “one quick correction” jokes. Mentioned in these memes, rather than pictured.',
  },
  {
    slug: 'andres',
    name: 'Andres',
    initials: 'A',
    role: 'Referenced in the captions',
    description:
      'The “good market” refrain and the bait that Brolley cannot resist connect several entries. Mentioned in the first collection, rather than pictured.',
  },
  {
    slug: 'josh',
    name: 'Josh',
    initials: 'J',
    role: 'Series requester · referenced',
    description:
      'Requested the recurring Fat Brolley remixes and supplied the group-chat context. Also appears by name in the corrected “peace to C.H.A.T.” caption.',
  },
  {
    slug: 'dot',
    name: 'dot',
    initials: 'd',
    role: 'AI image generation & adaptation',
    description:
      'Produced this collection for Josh using recurring-character references and existing meme formats. Credit for the underlying formats belongs to their respective creators; those original creators have not been independently verified here.',
  },
]

export const lore: Lore[] = [
  {
    slug: 'admin-cinematic-universe',
    title: 'The admin cinematic universe',
    eyebrow: 'POWER · APPEALS · ABSOLUTELY NO DUE PROCESS',
    summary: 'An ordinary group-chat admin role becomes an entire fictional government.',
    paragraphs: [
      'This collection turns the running admin-power joke into a sequence of increasingly elaborate institutions: an empire, private property and a supreme court.',
      'The joke is the mismatch in scale. Removing somebody from a chat gets the visual treatment of a galactic betrayal; an appeal becomes paperwork for a shredder. These are comic scenes, not records of real legal proceedings.',
      'The corrected opening caption names Andres, Peter and Josh. Later entries narrow the rivalry to Brolley and Pete.',
    ],
  },
  {
    slug: 'one-more-reply',
    title: 'Just one more reply',
    eyebrow: 'BAIT · CORRECTIONS · A RARE FAIR POINT',
    summary: 'A promise to stay out of the conversation lasts exactly one message.',
    paragraphs: [
      'Brolley enters for “one quick correction,” arrives carrying an enormous book called ACTUALLY, and somehow still expects this to be a brief visit.',
      'The same loop drives the Scrib Doon entry: the pledge not to take Andres’s bait gives way to frantic typing. “Fair point” imagines the unlikely happy ending, with Pete conceding and actually stopping.',
      'The archive preserves the joke as a fictionalized running bit. It does not treat the captions as verbatim records of a specific exchange.',
    ],
  },
  {
    slug: 'good-market',
    title: 'An outstanding market',
    eyebrow: 'ONE REFRAIN · A WHOLE TINY DESK',
    summary: 'Andres’s “good market” refrain becomes a flooded concert set.',
    paragraphs: [
      'The delivery caption puts it simply: Andres sees a great market; Brolley hears a hit. The image literalizes the contrast with a cheerful performance in a room full of water.',
      'The keyboard, saxophone, C.H.A.T. Tiny Desk sign and floating home-insurance page are visual pieces of the joke. No real property, insurance policy or financial position is asserted.',
    ],
  },
]

export const memes: Meme[] = [
  {
    slug: 'peace-in-chat',
    title: 'Peace to C.H.A.T.',
    subtitle: 'The admin saga gets its origin scene.',
    image: '/memes/peace-in-chat.webp',
    originalImage: '/memes/peace-in-chat.png',
    width: 1254,
    height: 1254,
    alt: 'Two-panel Anakin and Obi-Wan parody. Top: “Remove Andres and Peter not Josh!” Bottom: Fat Brolley says “I have brought peace to C.H.A.T.” against a fiery backdrop.',
    date: '2026-11-04T15:50:46Z',
    dateLabel: 'Corrected version · Nov 4, 2026',
    depicted: ['brolley'],
    referenced: ['andres', 'pete', 'josh'],
    creator: 'dot',
    requester: 'josh',
    format: 'Anakin / “I have brought peace”',
    formatUrl: 'https://knowyourmeme.com/memes/anakin-skywalker-gen-z-male-rage-memes',
    lore: ['admin-cinematic-universe'],
    story:
      'The first delivered remix casts Brolley as the victorious admin in a fiery Star Wars-style confrontation. The grand claim of peace lands against a very specific disagreement about who should be removed from the chat.',
    note: 'This is the corrected asset. Josh requested the top caption “Remove Andres and Peter not Josh!” The earlier caption variant is not included.',
  },
  {
    slug: 'hit-the-road',
    title: 'Hit the road, dude.',
    subtitle: 'Returning to the chat requires admin approval.',
    image: '/memes/hit-the-road.webp',
    originalImage: '/memes/hit-the-road.png',
    width: 1024,
    height: 1536,
    alt: 'Brolley leans out of a white truck marked C.H.A.T. Private Property. The caption reads “Brolley when Pete asks to rejoin C.H.A.T.” He answers “Back? Hit the road, dude.”',
    date: '2026-11-04T16:47:57Z',
    dateLabel: 'Delivered · Nov 4, 2026',
    depicted: ['brolley'],
    referenced: ['pete'],
    creator: 'dot',
    requester: 'josh',
    format: 'State Property / Hit the Road, Dude',
    formatUrl: 'https://viralmemes.app/meme/state-property-hit-the-road-dude',
    lore: ['admin-cinematic-universe'],
    story:
      'Brolley treats C.H.A.T. like his own private property. Pete’s imagined request to return meets a two-panel dismissal from the driver’s seat. It extends the admin-power storyline into an absurdly literal gatekeeping scene.',
  },
  {
    slug: 'outstanding',
    title: 'Outstanding.',
    subtitle: 'A good market. An extremely wet concert.',
    image: '/memes/outstanding.webp',
    originalImage: '/memes/outstanding.png',
    width: 1122,
    height: 1402,
    alt: 'Two Fat Brolley figures perform at a flooded C.H.A.T. Tiny Desk, one singing at a keyboard and the other playing saxophone. “When Andres says bro good market bro.” “Outstanding.”',
    date: '2026-11-04T17:49:47Z',
    dateLabel: 'Delivered · Nov 4, 2026',
    depicted: ['brolley'],
    referenced: ['andres'],
    creator: 'dot',
    requester: 'josh',
    format: '“Outstanding” Tiny Desk',
    formatUrl: 'https://viralmemes.app/meme/outstanding-tiny-desk-ai',
    lore: ['good-market'],
    story:
      'Andres’s “bro good market bro” refrain is answered by an enthusiastic Brolley concert. The flooded room and floating home-insurance page supply the visual contradiction. The two performers are both the recurring Brolley character, not an identified second person.',
  },
  {
    slug: 'due-process',
    title: 'Scientists reveal the due process',
    subtitle: 'Your appeal is being processed. Technically.',
    image: '/memes/due-process.webp',
    originalImage: '/memes/due-process.png',
    width: 1122,
    height: 1402,
    alt: 'Brolley as a smiling judge at the C.H.A.T. Supreme Court feeds a sheet titled Pete’s Appeal into a shredder. Bottom text: “Scientists reveal the due process.”',
    date: '2026-11-04T18:47:29.680073Z',
    dateLabel: 'Delivered · Nov 4, 2026',
    depicted: ['brolley'],
    referenced: ['pete'],
    creator: 'dot',
    requester: 'josh',
    format: 'Scientists Reveal',
    formatUrl: 'https://knowyourmeme.com/memes/scientists-reveal-the-hi',
    lore: ['admin-cinematic-universe'],
    story:
      'The chat’s fictional government acquires a supreme court. Brolley plays judge, Pete supplies the appeal, and a desk shredder supplies the punchline. “Due process” is treated as a physical process rather than a fair hearing.',
  },
  {
    slug: 'one-quick-correction',
    title: 'One quick correction',
    subtitle: 'The book is called ACTUALLY.',
    image: '/memes/one-quick-correction.webp',
    originalImage: '/memes/one-quick-correction.png',
    width: 1122,
    height: 1402,
    alt: 'Brolley tiptoes through a barn in ornate storybook clothes and sneakers, holding a huge ACTUALLY book. “Brolley entering C.H.A.T. for one quick correction to Pete.”',
    date: '2026-11-04T19:47:35Z',
    dateLabel: 'Delivered · Nov 4, 2026',
    depicted: ['brolley'],
    referenced: ['pete'],
    creator: 'dot',
    requester: 'josh',
    format: 'Rumpelstiltskin tiptoe',
    formatUrl: 'https://viralmemes.app/meme/rumpelstiltskin-tip-toe-meme',
    lore: ['one-more-reply'],
    story:
      'A tiny correction arrives with ceremonial clothing, a raised finger and an enormous reference volume. The tiptoe pose makes Brolley’s supposedly casual entrance feel anything but casual.',
  },
  {
    slug: 'not-taking-the-bait',
    title: 'Not taking the bait.',
    subtitle: 'A two-panel commitment to restraint.',
    image: '/memes/not-taking-the-bait.webp',
    originalImage: '/memes/not-taking-the-bait.png',
    width: 1024,
    height: 1536,
    alt: 'Brolley in an orange jumpsuit says he will not take Andres’s bait. In the next panel, after Andres posts one political meme, he is intensely typing on his phone.',
    date: '2026-11-04T20:41:49Z',
    dateLabel: 'Delivered · Nov 4, 2026',
    depicted: ['brolley'],
    referenced: ['andres'],
    creator: 'dot',
    requester: 'josh',
    format: 'Biddy Blas / Scrib Doon',
    formatUrl: 'https://knowyourmeme.com/memes/biddy-blas-scrib-doon',
    lore: ['one-more-reply'],
    story:
      'The cheerful vow is in the first panel. The second panel is the entire rebuttal: Andres posts once and Brolley is already typing. The joke is about the promise of restraint, not a claim about anybody’s political beliefs.',
  },
  {
    slug: 'fair-point',
    title: 'Permission to cry, soldier.',
    subtitle: 'He said fair point. He stopped typing.',
    image: '/memes/fair-point.webp',
    originalImage: '/memes/fair-point.png',
    width: 1122,
    height: 1402,
    alt: 'A smiling Brolley in a C.H.A.T. tactical vest salutes while holding a tissue. “Brolley when Pete says fair point and actually stops typing.” “Permission to cry, soldier.”',
    date: '2026-11-04T21:48:14.829142Z',
    dateLabel: 'Delivered · Nov 4, 2026',
    depicted: ['brolley'],
    referenced: ['pete'],
    creator: 'dot',
    requester: 'josh',
    format: 'Permission to Cry, Soldier',
    formatUrl: 'https://knowyourmeme.com/memes/permission-to-cry-soldier',
    lore: ['one-more-reply'],
    story:
      'The imagined breakthrough is not winning an argument. It is Pete saying “fair point” and then actually putting the keyboard down. A salute and a tissue give that small miracle the full ceremonial treatment.',
  },
]
