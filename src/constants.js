const BASE_HISCORES_URL = 'https://services.runescape.com/m=hiscore_oldschool';

const HISCORES_URLS = {
  main: BASE_HISCORES_URL,
  iron: `${BASE_HISCORES_URL}_ironman`,
  uim: `${BASE_HISCORES_URL}_ultimate`,
  hcim: `${BASE_HISCORES_URL}_hardcore_ironman`,
  dmm: `${BASE_HISCORES_URL}_deadman`,
  sdmm: `${BASE_HISCORES_URL}_seasonal`,
  dmmt: `${BASE_HISCORES_URL}_tournament`,
};

const GE_URLS = {
  detail: 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json',
  graph: 'http://services.runescape.com/m=itemdb_oldschool/api/graph',
};

const STATS = {
  skills: [
    'overall',
    'attack',
    'defence',
    'strength',
    'hitpoints',
    'ranged',
    'prayer',
    'magic',
    'cooking',
    'woodcutting',
    'fletching',
    'fishing',
    'firemaking',
    'crafting',
    'smithing',
    'mining',
    'herblore',
    'agility',
    'thieving',
    'slayer',
    'farming',
    'runecraft',
    'hunter',
    'construction',
  ],
  clues: ['all', 'easy', 'medium', 'hard', 'elite', 'master'],
  bh: ['hunter', 'rogue'],
  lms: {},
};

module.exports = {
  HISCORES_URLS,
  STATS,
  GE_URLS,
};
