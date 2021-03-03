import env from "react-dotenv"
const API_KEY = `&apiKey=${env.NEWSAPI_KEY}`
const ROOT_API = 'http://newsapi.org/v2/'

// const key = '?token=9c753f53ce4c56377dc4b98c598a36d2'
// const ROOT_API = 'https://gnews.io/api/v3/'

// const getArticles = (endpoint) => {
//     let url = root_api + endpoint + API_KEY;
//     let req = new Request(url);
//     return fetch(req).then(response => response.json())
// };

/** 
 * Types come from API docs. 
 * https://newsapi.org/docs/endpoints/top-headlines
 */
export type Article = {
    /** Source the article originates from. */
    source: { id: string, name: string };
    /** Author name */
    author: string;
    /** Headline or title of the article */
    title: string;
    /** Description or snippet from the article */
    description: string;
    /** Direct link to the article */
    url: string;
    /** URL to a relevant image for the article */
    urlToImage: string;
    /** Date and time article was published (UTC) */
    pulishedAt: string;
    /** Unformatted content of the article, where available. Truncated to 200 chars. */
    content: string;
}

export type TopArticlesResponseType = {
    /** Status of response */
    status: string;
    /** Total number of results */
    totalResults: number;
    /** Array containing articles*/
    articles: Article[];
}

/**
 * Query "Top Article" endpoint.
 * If no endpoint is supplied queries US top articles.
 * Optionally provide an endpoint to get top articles for that topic.
 * @param {string} endpoint 
 */
const getTopArticles = (endpoint?: string) => {
    let url;
    if (endpoint) {
        url = ROOT_API + `top-headlines?q=${endpoint}` + API_KEY;
        return fetch(url).then(response => response.json());
    };
    url = ROOT_API + "top-headlines?country=us" + API_KEY;

    return fetch(url).then(response => response.json());
};

/**
 * Search articles based on an endpoint.
 * @param {string} endpoint 
 */
const searchArticles = (endpoint: string) => {
    const url = ROOT_API + `everything?q=${endpoint}&sortBy=popularity` + API_KEY;
    return fetch(url).then(response => response.json());
};

export const news_api = {
    getTopArticles,
    searchArticles,
};