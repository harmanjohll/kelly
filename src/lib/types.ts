export type Intention =
  | 'love'
  | 'thanks'
  | 'proud'
  | 'celebrate'
  | 'sorry'
  | 'here'
  | 'sympathy'
  | 'self';

export type Relationship = 'partner' | 'parent' | 'family' | 'friend' | 'colleague' | 'teacher' | 'self';
export type Setting = 'home' | 'hospital' | 'wake' | 'office' | 'ceremony';
export type Household = 'allergies' | 'pets';
export type Culture = 'chinese' | 'malay' | 'indian' | 'japanese' | 'other';
export type Lifespan = 'fleeting' | 'forever' | 'both' | 'unsure';
export type Palette = 'soft' | 'bright' | 'deep' | 'white' | 'green';
export type Budget = 'gentle' | 'considered' | 'generous';
export type Line = 'fresh' | 'forever' | 'stays' | 'bespoke';

export interface Product {
  slug: string;
  name: string;
  line: Line;
  summary: string;
  story: string;
  priceFrom: number | null;
  budget: Budget;
  intentions: Partial<Record<Intention, number>>;
  relationships: Relationship[];
  palette: Palette;
  colors: string[];
  flowers: string[];
  stems: number;
  potted: boolean;
  pollen: boolean;
  fragrant: boolean;
  mourningCoded: boolean;
  leadDays: number;
  lifespan: string;
  care: string;
  size: string;
  makeHours?: number;
  yarn?: string;
  art: ArtSpec;
}

export interface ArtSpec {
  blooms: BloomKind[];
  seed: number;
  tone: 'blush' | 'sun' | 'wine' | 'ivory' | 'sage';
}

export type BloomKind = 'rose' | 'tulip' | 'daisy' | 'ruffle' | 'lily' | 'orchid' | 'sprig';

export interface IntentionDef {
  id: Intention;
  say: string;
  phrase: string;
  hint: string;
  register: 'open' | 'quiet';
}

export interface RuleMatch {
  stems?: number[];
  flowers?: string[];
  colors?: string[];
  palette?: Palette[];
  lines?: Line[];
  potted?: boolean;
  pollen?: boolean;
  fragrant?: boolean;
  mourningCoded?: boolean;
}

export interface Rule {
  id: string;
  when: {
    culture?: Culture[];
    intention?: Intention[];
    notIntention?: Intention[];
    setting?: Setting[];
    household?: Household[];
  };
  action: 'exclude' | 'boost' | 'note';
  match?: RuleMatch;
  boost?: number;
  explain: string;
}

export interface Answers {
  intention?: Intention;
  relationship?: Relationship;
  setting?: Setting;
  household: Household[];
  culture?: Culture;
  lifespan?: Lifespan;
  palette?: Palette;
  budget?: Budget;
  date?: string; // ISO yyyy-mm-dd, optional
  name?: string; // recipient's name, optional
  detail?: string; // one true thing about them, optional
}

export interface Pick {
  product: Product;
  score: number;
  reason: string;
}

export interface CoachResult {
  picks: Pick[];
  trail: string[];
  notes: string[];
  register: 'open' | 'quiet';
}
