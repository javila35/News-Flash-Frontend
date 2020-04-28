import React, { Component } from 'react';
import { api } from '../services/api';
import ArticleCard from '../components/ArticleCard';

class ArticleBrowser extends Component {
    state={
        updated:false,
        articles: {}
    }

    componentDidMount() {
        this.getArticles();
    };

    getArticles() {
        api.articles.getArticles().then(data=>
            this.setState({articles: data.articles, updated:true}))
    };

    renderArticles() {
        return this.state.articles.map((article, index)=>{
            return <ArticleCard key={index} article={article}/>
        });
    };

    //need to write showarticles method to show the articles i've grabbed now.
    render(){
        return(
            <>
                {this.state.updated ? this.renderArticles() : null}
            </>
        )
    }
}

export default ArticleBrowser;