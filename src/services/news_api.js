// https://gnews.io/api/v3/top-news?token=9c753f53ce4c56377dc4b98c598a36d2

const key = '?token=9c753f53ce4c56377dc4b98c598a36d2'
const root_api = 'https://gnews.io/api/v3/'

const getArticles = (endpoint) => {
    let url = root_api + endpoint + key;
    let req = new Request(url);
    return fetch(req).then(response => response.json())
};

export const news_api = {
    getArticles,
};