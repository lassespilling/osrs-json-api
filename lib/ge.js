const axios = require('axios');
const { GE_URLS } = require('./constants');

/**
 * Fetches and returns the specified item's detailed infos from the official API
 *
 * @access private
 * @param {number} id Item's id
 */
const fetchItem = id => new Promise((resolve, reject) => {
  axios
    .get(`${GE_URLS.detail}?item=${id}`)
    .then(res => resolve(res.data))
    .catch((err) => {
      if (
        (err.response.data && err.response.data.includes('not found'))
          || (err.data && err.data.includes('not found'))
      ) reject(new Error(`There are no items for this id! (${id})`));

      reject(err);
    });
});

/**
 * Returns a JSON friendly object containing all the detailed infos for the specified item
 *
 * @access public
 * @param {number} id Item's id
 */
const getItem = async (id) => {
  if (typeof id !== 'number' || id <= 0) throw new Error('Invalid item ID!');

  return fetchItem(id);
};

/**
 * Fetches and returns the specified item's graph infos from the official API
 *
 * @access private
 * @param {number} id Item's id
 */
const fetchGraph = id => new Promise((resolve, reject) => {
  axios
    .get(`${GE_URLS.graph}/${id}.json`)
    .then(res => resolve(res.data))
    .catch((err) => {
      if (
        (err.response.data && err.response.data.includes('not found'))
          || (err.data && err.data.includes('not found'))
      ) reject(new Error(`There are no items for this id! (${id})`));

      reject(err);
    });
});

/**
 * Returns a JSON friendly object containing all the graph infos for the specified item
 *
 * @access public
 * @param {number} id Item's id
 */
const getGraph = async (id) => {
  if (typeof id !== 'number' || id <= 0) throw new Error('Invalid item ID!');

  return fetchGraph(id);
};

module.exports = { getItem, getGraph };
