const key = '&apiKey=0a14a58999ab42358ae8ae02df4e0336'
const root_api = 'http://newsapi.org/v2/'

const getArticles = (endpoint) => {
    let url = root_api + endpoint + key;
    let req = new Request(url);
    return fetch(req).then(response => response.json())
};

export const news_api = {
    getArticles,
};