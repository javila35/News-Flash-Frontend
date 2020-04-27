import React, { Component } from 'react';
import { api } from '../services/api';

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
        return this.state.articles.map(article=>{
            console.log(article)
            const {title, author, content} = article
            return(
                <div className="article">
                    <h4>{title}</h4>
                    <h5>by: {author}</h5>
                    <p>{content}</p>
                </div>
            )
        })
    };

    //need to write showarticles method to show the articles i've grabbed now.
    render(){
        return(
            <div>
                {this.state.updated?this.renderArticles():null}
            </div>
        )
    }
}

export default ArticleBrowser;