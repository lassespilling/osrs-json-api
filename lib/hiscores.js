const axios = require('axios');
const { HISCORES_URLS, STATS } = require('./constants');

/**
 * Converts the stats CSV to a 2d array
 *
 * @access private
 * @param {string} csv CSV string of a player's stats
 */
const csvToArray = (csv) => {
  const csvArray = csv.split('\n');

  csvArray.pop(); // removes the last item since it's always an empty string

  return csvArray.map(line => line.split(','));
};

/**
 * Fetches player's CSV stats from the official API
 *
 * @access private
 * @param {string} rsn Player's RuneScape Name
 * @param {string} mode Player's game mode
 */
const fetchPlayerCSV = (rsn, mode) => new Promise((resolve, reject) => {
  axios
    .get(`${HISCORES_URLS[mode]}/index_lite.ws?player=${rsn}`)
    .then(res => resolve(res.data))
    .catch((err) => {
      if (
        (err.response.data && err.response.data.includes('not found'))
          || (err.data && err.data.includes('not found'))
      ) reject(new Error('Player not found! Check RSN or game mode.'));

      reject(err);
    });
});

/**
 * Returns a mapped out skills stats object
 *
 * @access private
 * @param {Object[]} statsArray Array obtained from csvToArray()
 */
const parseSkills = (statsArray) => {
  const stats = statsArray.slice(0, 24); // skill stats always are the first 23 items

  const skills = {};

  STATS.skills.forEach((skill, i) => {
    skills[skill] = {
      rank: stats[i][0],
      level: stats[i][1],
      xp: stats[i][2],
    };
  });

  return skills;
};

/**
 * Returns a mapped out clues stats object
 *
 * @access private
 * @param {Object[]} statsArray Array obtained from csvToArray()
 */
const parseClues = (statsArray) => {
  const stats = statsArray.slice(26, 32);

  const clues = {};

  STATS.clues.forEach((clue, i) => {
    clues[clue] = {
      rank: stats[i][0],
      score: stats[i][1],
    };
  });

  return clues;
};

/**
 * Returns a mapped out bounty hunter stats object
 *
 * @access private
 * @param {Object[]} statsArray Array obtained from csvToArray()
 */
const parseBH = (statsArray) => {
  const stats = statsArray.slice(24, 26);

  const bh = {};

  STATS.bh.forEach((mode, i) => {
    bh[mode] = {
      rank: stats[i][0],
      score: stats[i][1],
    };
  });

  return bh;
};

/**
 * Returns a mapped out a LMS stats object
 *
 * @access private
 * @param {Object[]} stats Array obtained from csvToArray()
 */
const parseLMS = (stats) => {
  const lms = stats.pop();

  return { rank: lms[0], score: lms[1] };
};

/**
 * Returns a JSON friendly object with all of the player's hiscores stats
 *
 * @access private
 * @param {Object[]} stats Array obtained from csvToArray()
 */
const parseStats = (stats) => {
  if (!stats || !Array.isArray(stats) || stats.length <= 0) throw new Error('Invalid stats parameter received!');

  const player = {};

  player.skills = parseSkills(stats);
  player.clues = parseClues(stats);
  player.bh = parseBH(stats);
  player.lms = parseLMS(stats);

  return player;
};

/**
 * Get a player's stats - Default game mode = 'main'
 *
 * @access public
 * @param {string} rsn Player's RuneScape Name
 * @param {'main' | 'iron' |'uim' |'hcim' | 'dmm' | 'sdmm' | 'dmmt'} mode Player's game mode
 */
const getPlayer = async (rsn, mode = 'main') => {
  if (!rsn || typeof rsn !== 'string') throw new Error('RSN must be of type string');
  else if (rsn.length > 12) throw new Error('RSN must be less or equal to 12 characters!');

  // Invalid mode
  if (!Object.keys(HISCORES_URLS).includes(mode)) throw new Error(`${mode} is not a valid mode!`);

  const csv = await fetchPlayerCSV(rsn, mode);

  return parseStats(csvToArray(csv));
};

module.exports = {
  getPlayer,
};
