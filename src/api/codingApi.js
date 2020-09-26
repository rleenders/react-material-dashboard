const domain = process.env.REACT_APP_DOMAIN;

function genUrl(path, params = []) {
  const paramString = Object.keys(params).reduce((acc, val) => {
    if (params[val]) {
      if (acc.length === 0) {
        return `?${val}=${params[val]}`;
      }
      return `${acc}&${val}=${params[val]}`;
    }
    return acc;
  }, '');
  return domain + path + paramString;
}

async function handleGet(url) {
  const req = new Request(url);
  const response = await fetch(req);
  return response.json();
}

export default {
  getSales: async (params) => {
    const url = genUrl('videogamesales', params);
    return handleGet(url);
  },
  getPlatforms: async (params) => {
    const url = genUrl('lists/platform', params);
    return handleGet(url);
  },
  getGenres: async (params) => {
    const url = genUrl('lists/genre', params);
    return handleGet(url);
  },
  getPublishers: async (params) => {
    const url = genUrl('lists/publisher', params);
    return handleGet(url);
  },
};
