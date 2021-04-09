const ROOT_API = "https://gnews.io/api/v4/";
const API_KEY = `token=${process.env.REACT_APP_GNEWS_KEY}`;

/**
 * Query GNews API.
 * If no query string is provided, queries for top headlines.
 */
const getArticles = (query: string) => {
  let url;
  if (query) {
    url = ROOT_API + `search?q=${query}&${API_KEY}`;
  } else {
    url = ROOT_API + "top-headlines?" + API_KEY;
  }

  return fetch(url).then((response) => response.json());
};

export const news_api = {
  getArticles,
};
