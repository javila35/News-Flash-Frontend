const ROOT_API = 'https://gnews.io/api/v4/';
const API_KEY = `token=${process.env.REACT_APP_GNEWS_KEY}`;

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
 * Query GNews API.
 * If no query string is provided, queries for top headlines.
 * @param {string} query
 */
const getArticles = (query: string) => {
    // let url;
    // if (query) {
    //     url = ROOT_API + `search?q=${query}&${API_KEY}`;
    // } else {
    //     url = ROOT_API + "top-headlines?" + API_KEY;
    // }
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=0a14a58999ab42358ae8ae02df4e0336"
    return fetch(url).then(response => response.json());
};

export const news_api = {
    getArticles
};