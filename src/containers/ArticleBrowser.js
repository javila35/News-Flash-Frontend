import React, { Component } from 'react';
import { news_api } from '../services/news_api';
import ArticleCard from '../components/ArticleCard';

class ArticleBrowser extends Component {
    state = {
        updated: false,
        articles: {}
    }

    componentDidMount() {
        this.getArticles();
    };

    componentDidUpdate() {
        this.getArticles()
    }

    getArticles() {
        news_api.searchArticles(this.props.endpoint).then(data => {
            if (data.articles) {
                this.setState({ articles: data.articles, update: true })
            } else {
                alert("Maximum number of API requests made today.")
            };
        });
    };

    renderArticles() {
        return this.state.articles.map((article, index) => {
            return <ArticleCard key={index} article={article} />
        });
    };

    render() {
        return (
            <div className="article">
                {this.state.updated ? this.renderArticles() : null}
            </div>
        )
    }
}

export default ArticleBrowser;