export const DEFAULT_CHANNELS = [
  {
    slug: "general",
    label: "General",
    desc: "Daily updates and quick questions.",
    requireKey: false,
    guidelines: [
      "Keep topics neighborly and inclusive.",
      "Search before asking repeat questions.",
      "Be kind and assume good intent.",
    ],
  },
  {
    slug: "events",
    label: "Events",
    desc: "Block parties, yard sales, and meetups.",
    requireKey: false,
    guidelines: [
      "Include date, time, and location.",
      "Mark events as past when over.",
      "Post rain plans when possible.",
    ],
  },
  {
    slug: "safety",
    label: "Safety",
    desc: "Alerts and preparedness resources.",
    requireKey: true,
    guidelines: [
      "No doxxing or private info.",
      "Share verified details; avoid rumors.",
      "Contact authorities in emergencies.",
    ],
  },
  {
    slug: "lost-found",
    label: "Lost & Found",
    desc: "Help items and pets find their way home.",
    requireKey: false,
    guidelines: [
      "Include photo and last seen location.",
      "Avoid posting private addresses.",
      "Mark resolved once found.",
    ],
  },
  {
    slug: "market",
    label: "Marketplace",
    desc: "Buy, sell, and give away locally.",
    requireKey: false,
    guidelines: [
      "Be honest about item condition.",
      "Meet in public places.",
      "No prohibited items.",
    ],
  },
  {
    slug: "help",
    label: "Requests for Help",
    desc: "Mutual aid and neighbor support.",
    requireKey: false,
    guidelines: [
      "Be specific about the request.",
      "Respect boundaries and availability.",
      "Thank helpers and close resolved posts.",
    ],
  },
];
