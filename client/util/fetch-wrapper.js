import { SERVER_API_PATH } from '../config';
import 'regenerator-runtime';

/**
 * fetches resource and returns parsed json if the fetching was successful.
 *
 * Returns an object with an error property if something went wrong.
 * @param {string} path - resource path to send the fetch request to
 * @param {Object} options - additional fetch options
 */
const fetchJSON = (resource, options = {}) => new Promise((resolve) => {
  fetch(`${SERVER_API_PATH}${resource}`, options)
    .then((response) => {
      if (response.status !== 200) {
        resolve({ error: response.status });
        return true;
      }

      return response.json();
    })
    .then((json) => resolve(json))
    .catch((err) => resolve({ error: err.message }));
});

export default fetchJSON;
