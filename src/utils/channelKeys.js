const PREFIX_MAP = {
  "general": "gen",
  "events": "evt",
  "safety": "saf",
  "lost-found": "lost",
  "market": "mkt",
  "help": "hlp",
};

export function keyPrefixFor(slug){
  return PREFIX_MAP[slug] || slug.slice(0,3);
}

export function generateJoinKey(slug){
  const p = keyPrefixFor(slug);
  const code = Math.floor(100000 + Math.random()*900000).toString();
  return `${p}-${code}`;
}

