import React, { Component } from 'react';
import { news_api } from '../../services/news_api';
import ArticleBox from './ArticleBox';

class ArticleTicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: {},
            fetched: false
        };
    };

    componentDidMount() {
        this.callAPI();
    };

    renderBoxes() {
        return this.state.articles.map((article,index)=>{
            return <ArticleBox key={index} details={article} />
        });
    };

    callAPI = () => {
        const {category} = this.props;
        if (category === 'top articles') {
            news_api.getArticles('top-news').then(data=>{
                this.setState({
                    articles: data.articles,
                    fetched: true
                });
            });
        } else {
            news_api.getArticles(`topics/${category}`).then(data=>{
                this.setState({
                    articles: data.articles,
                    fetched: true
                });
            });
        };
    };

    render() {
        return( 
            <>
            {this.state.fetched ? 
                <div className="article-ticker">
                    {this.renderBoxes()}
                </div> 
            : null}
            </>
        )
    }
}

export default ArticleTicker;