const axios = require('axios');
const { GE_URLS } = require('./constants');

/**
 * Fetches and returns the specified item's detailed infos from the official API
 *
 * @access private
 * @param {number} id Item's id
 */
const _fetchItem = id => new Promise((resolve, reject) => {
  axios
    .get(`${GE_URLS.detail}?item=${id}`)
    .then((res) => {
      const regex = /[^0-9-,\s]/gm;
      const found = regex.exec(res.data);

      if (found) {
        reject(new Error('OSRS API appears to be down.'));
      }

      resolve(res.data);
    })
    .catch((err) => {
      if (!err.response) {
        reject(new Error('An unknown networking error occurred.'));
      }
      if (
        (err.response.data && err.response.data.includes('not found'))
          || (err.data && err.data.includes('not found'))
      ) reject(new Error('No items were found for the specified id'));

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
  if (typeof id !== 'number' || id <= 0) throw new Error('Invalid item id');

  return _fetchItem(id);
};

/**
 * Fetches and returns the specified item's graph infos from the official API
 *
 * @access private
 * @param {number} id Item's id
 */
const _fetchGraph = id => new Promise((resolve, reject) => {
  axios
    .get(`${GE_URLS.graph}/${id}.json`)
    .then(res => resolve(res.data))
    .catch((err) => {
      if (!err.response) {
        reject(new Error('An unknown networking error occurred.'));
      }
      if (
        (err.response.data && err.response.data.includes('not found'))
          || (err.data && err.data.includes('not found'))
      ) reject(new Error('No items were found for the specified id'));

      reject(err);
    });
});

/**
 * Returns a JSON friendly object containing all the graph infos for the specified item
 *
 * @access public
 * @param {number} id Item's id
 */
const getGraph = (id) => {
  if (typeof id !== 'number' || id <= 0) throw new Error('Invalid item id');

  return _fetchGraph(id);
};

module.exports = { getItem, getGraph };
