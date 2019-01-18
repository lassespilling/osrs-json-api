const HISCORES_URLS = {
  main: 'http://services.runescape.com/m=hiscore_oldschool',
  iron: 'http://services.runescape.com/m=hiscore_oldschool_ironman',
  uim: 'http://services.runescape.com/m=hiscore_oldschool_ultimate',
  hcim: 'http://services.runescape.com/m=hiscore_oldschool_hardcore_ironman',
  dmm: 'http://services.runescape.com/m=hiscore_oldschool_deadman',
  sdmm: 'http://services.runescape.com/m=hiscore_oldschool_seasonal',
  dmmt: 'http://services.runescape.com/m=hiscore_oldschool_tournament',
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
