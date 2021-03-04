const ROOT_API = 'https://gnews.io/api/v4/';
let API_KEY: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV) {
    API_KEY = `token=${process.env.REACT_APP_GNEWS_KEY}`;
} else {
    API_KEY = `token=${process.env.REACT_APP_GNEWS_KEY}`;
}

/** Article type recieved from GNews API */
export type Article = {
    /** Title or headline for article */
    title: string;
    /** Description of article */
    description: string;
    /** Truncated content with character count at the end. */
    content: string;
    /** Link to article */
    url: string;
    /** Link to image */
    image: string;
    /** UTC date and time of publish.  */
    publishedAt: string;
    /** Information about publication */
    source: {
        /** Name of source */
        name: string;
        /** Link to website */
        url: string;
    };
};

export type TopArticlesResponseType = {
    /** Total number of results */
    totalArticles: number;
    /** Array containing articles*/
    articles: Article[];
}

/**
 * Query "Top Article" endpoint.
 */
const getTopArticles = () => {
    const url = ROOT_API + "top-headlines?" + API_KEY;

    return fetch(url).then(response => response.json());
};

/**
 * Search articles based on an endpoint.
 * @param {string} endpoint 
 */
const searchArticles = (endpoint: string) => {
    const url = ROOT_API + `search?q=${endpoint}&${API_KEY}`;
    return fetch(url).then(response => response.json());
};

export const news_api = {
    getTopArticles,
    searchArticles,
};