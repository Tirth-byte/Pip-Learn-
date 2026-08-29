export interface Institution {
  id: string;
  name: string;
  slug: string;
  shortName?: string;
  country: string;
  location: string;
  domain?: string;
  logoKey?: string;
  verified: boolean;
  memberCount: number;
  isCustom?: boolean;
  createdAt: string;
}

export const PREDEFINED_INSTITUTIONS: Institution[] = [
  {
    id: "harvard",
    name: "Harvard University",
    slug: "harvard-university",
    shortName: "Harvard",
    country: "United States",
    location: "Cambridge, MA",
    domain: "harvard.edu",
    logoKey: "harvard",
    verified: true,
    memberCount: 1420,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "stanford",
    name: "Stanford University",
    slug: "stanford-university",
    shortName: "Stanford",
    country: "United States",
    location: "Stanford, CA",
    domain: "stanford.edu",
    logoKey: "stanford",
    verified: true,
    memberCount: 1890,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    slug: "massachusetts-institute-of-technology",
    shortName: "MIT",
    country: "United States",
    location: "Cambridge, MA",
    domain: "mit.edu",
    logoKey: "mit",
    verified: true,
    memberCount: 2150,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "oxford",
    name: "University of Oxford",
    slug: "university-of-oxford",
    shortName: "Oxford",
    country: "United Kingdom",
    location: "Oxford, UK",
    domain: "ox.ac.uk",
    logoKey: "oxford",
    verified: true,
    memberCount: 1180,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    slug: "university-of-cambridge",
    shortName: "Cambridge",
    country: "United Kingdom",
    location: "Cambridge, UK",
    domain: "cam.ac.uk",
    logoKey: "cambridge",
    verified: true,
    memberCount: 1060,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "berkeley",
    name: "University of California, Berkeley",
    slug: "uc-berkeley",
    shortName: "UC Berkeley",
    country: "United States",
    location: "Berkeley, CA",
    domain: "berkeley.edu",
    logoKey: "berkeley",
    verified: true,
    memberCount: 1740,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cmu",
    name: "Carnegie Mellon University",
    slug: "carnegie-mellon-university",
    shortName: "CMU",
    country: "United States",
    location: "Pittsburgh, PA",
    domain: "cmu.edu",
    logoKey: "cmu",
    verified: true,
    memberCount: 1320,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "eth-zurich",
    name: "ETH Zurich",
    slug: "eth-zurich",
    shortName: "ETH Zurich",
    country: "Switzerland",
    location: "Zürich, Switzerland",
    domain: "ethz.ch",
    logoKey: "eth-zurich",
    verified: true,
    memberCount: 890,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "utoronto",
    name: "University of Toronto",
    slug: "university-of-toronto",
    shortName: "U of T",
    country: "Canada",
    location: "Toronto, ON, Canada",
    domain: "utoronto.ca",
    logoKey: "utoronto",
    verified: true,
    memberCount: 1250,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "nus",
    name: "National University of Singapore",
    slug: "national-university-of-singapore",
    shortName: "NUS",
    country: "Singapore",
    location: "Singapore",
    domain: "nus.edu.sg",
    logoKey: "nus",
    verified: true,
    memberCount: 940,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    slug: "iit-bombay",
    shortName: "IIT Bombay",
    country: "India",
    location: "Mumbai, India",
    domain: "iitb.ac.in",
    logoKey: "iit-bombay",
    verified: true,
    memberCount: 1610,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "waterloo",
    name: "University of Waterloo",
    slug: "university-of-waterloo",
    shortName: "Waterloo",
    country: "Canada",
    location: "Waterloo, ON, Canada",
    domain: "uwaterloo.ca",
    logoKey: "waterloo",
    verified: true,
    memberCount: 1470,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "tsinghua",
    name: "Tsinghua University",
    slug: "tsinghua-university",
    shortName: "Tsinghua",
    country: "China",
    location: "Beijing, China",
    domain: "tsinghua.edu.cn",
    logoKey: "tsinghua",
    verified: true,
    memberCount: 820,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "imperial",
    name: "Imperial College London",
    slug: "imperial-college-london",
    shortName: "Imperial",
    country: "United Kingdom",
    location: "London, UK",
    domain: "imperial.ac.uk",
    logoKey: "imperial",
    verified: true,
    memberCount: 780,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "georgia-tech",
    name: "Georgia Institute of Technology",
    slug: "georgia-institute-of-technology",
    shortName: "Georgia Tech",
    country: "United States",
    location: "Atlanta, GA",
    domain: "gatech.edu",
    logoKey: "georgia-tech",
    verified: true,
    memberCount: 1530,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "uw-seattle",
    name: "University of Washington",
    slug: "university-of-washington",
    shortName: "UW",
    country: "United States",
    location: "Seattle, WA",
    domain: "uw.edu",
    logoKey: "uw",
    verified: true,
    memberCount: 1120,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "princeton",
    name: "Princeton University",
    slug: "princeton-university",
    shortName: "Princeton",
    country: "United States",
    location: "Princeton, NJ",
    domain: "princeton.edu",
    logoKey: "princeton",
    verified: true,
    memberCount: 680,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "cornell",
    name: "Cornell University",
    slug: "cornell-university",
    shortName: "Cornell",
    country: "United States",
    location: "Ithaca, NY",
    domain: "cornell.edu",
    logoKey: "cornell",
    verified: true,
    memberCount: 950,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "umich",
    name: "University of Michigan",
    slug: "university-of-michigan",
    shortName: "UMich",
    country: "United States",
    location: "Ann Arbor, MI",
    domain: "umich.edu",
    logoKey: "umich",
    verified: true,
    memberCount: 1210,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "ut-austin",
    name: "University of Texas at Austin",
    slug: "university-of-texas-at-austin",
    shortName: "UT Austin",
    country: "United States",
    location: "Austin, TX",
    domain: "utexas.edu",
    logoKey: "ut-austin",
    verified: true,
    memberCount: 1390,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    slug: "university-of-melbourne",
    shortName: "UniMelb",
    country: "Australia",
    location: "Melbourne, Australia",
    domain: "unimelb.edu.au",
    logoKey: "melbourne",
    verified: true,
    memberCount: 620,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "tokyo",
    name: "University of Tokyo",
    slug: "university-of-tokyo",
    shortName: "UTokyo",
    country: "Japan",
    location: "Tokyo, Japan",
    domain: "u-tokyo.ac.jp",
    logoKey: "tokyo",
    verified: true,
    memberCount: 540,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "tum",
    name: "Technical University of Munich",
    slug: "technical-university-of-munich",
    shortName: "TUM",
    country: "Germany",
    location: "Munich, Germany",
    domain: "tum.de",
    logoKey: "tum",
    verified: true,
    memberCount: 710,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "42-school",
    name: "42 School",
    slug: "42-school",
    shortName: "École 42",
    country: "France",
    location: "Paris, France & Global",
    domain: "42.fr",
    logoKey: "42",
    verified: true,
    memberCount: 1140,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

const CUSTOM_STORAGE_KEY = "piplearn_custom_institutions_v1";

function loadCustomInstitutions(): Institution[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(CUSTOM_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved) as Institution[];
    }
  } catch (e) {
    console.error("Failed to load custom institutions", e);
  }
  return [];
}

function saveCustomInstitutions(institutions: Institution[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(institutions));
  } catch (e) {
    console.error("Failed to save custom institutions", e);
  }
}

export function getAllInstitutions(): Institution[] {
  const custom = loadCustomInstitutions();
  return [...PREDEFINED_INSTITUTIONS, ...custom];
}

export function getInstitutionById(id?: string | null): Institution | null {
  if (!id) return null;
  const all = getAllInstitutions();
  return all.find((inst) => inst.id.toLowerCase() === id.toLowerCase()) || null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function searchInstitutions(query: string): Institution[] {
  const all = getAllInstitutions();
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return all;

  return all.filter((inst) => {
    return (
      inst.name.toLowerCase().includes(cleanQuery) ||
      (inst.shortName && inst.shortName.toLowerCase().includes(cleanQuery)) ||
      inst.location.toLowerCase().includes(cleanQuery) ||
      inst.country.toLowerCase().includes(cleanQuery) ||
      (inst.domain && inst.domain.toLowerCase().includes(cleanQuery))
    );
  });
}

export function requestOrAddInstitution(data: {
  name: string;
  country?: string;
  location?: string;
}): Institution {
  const trimmedName = data.name.trim();
  const slug = slugify(trimmedName);
  const all = getAllInstitutions();

  // Check if an existing institution matches
  const existing = all.find(
    (inst) =>
      inst.slug === slug ||
      inst.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (existing) {
    return existing;
  }

  const customCountry = data.country?.trim() || "Global";
  const customLocation = data.location?.trim() || customCountry;

  const newInstitution: Institution = {
    id: `custom-${slug}-${Date.now().toString(36)}`,
    name: trimmedName,
    slug,
    shortName: trimmedName.length > 25 ? trimmedName.slice(0, 20) + "…" : trimmedName,
    country: customCountry,
    location: customLocation,
    verified: false,
    memberCount: 1,
    isCustom: true,
    createdAt: new Date().toISOString(),
  };

  const customList = loadCustomInstitutions();
  const updatedCustomList = [...customList, newInstitution];
  saveCustomInstitutions(updatedCustomList);

  return newInstitution;
}
