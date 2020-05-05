import React, { useEffect } from 'react';
import { news_api } from '../../services/news_api';

function ArticleTicker(props) {

    useEffect(()=>{
        callAPI()
      });

    const {category} = props;
    
    const articles = [];

    const renderArticles = () =>{
        console.log(articles)
        return articles.forEach(article => console.log(article))
    };

    const callAPI = (endpoint) => {
        if (category === 'top articles') {
            news_api.getArticles('top-headlines?country=us').then(data=> {
                console.log(data)
                return data.articles.map(article=>{
                    articles.push(article)
                })
            });
        }
    }

    return(
        <div className="article-ticker">
            {renderArticles()}
        </div>
    )
};

export default ArticleTicker;