const Axios = require('axios');

export function getRequest(url) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return Axios({
    method: 'GET',
    url,
    headers,
  }).then(response => response.data);
}
