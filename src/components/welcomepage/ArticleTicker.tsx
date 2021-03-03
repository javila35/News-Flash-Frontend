import * as React from "react";
import { news_api } from "../../services/news_api";
import Loader from "../Loader";
import ArticleBox from "./ArticleBox";

type ArticleTickerProps = {
    /** Category to display in the ticker. */
    category: string;
};

export const ArticleTicker: React.FC<ArticleTickerProps> = ({ category = "" }) => {
    const [articles, setArticles] = React.useState([]);

    /** Calls API once. */
    React.useEffect(() => {
        switch (category) {
            case "top articles":
                news_api.getTopArticles()
                    .then(data => {
                        if (data.articles) {
                            setArticles(data.articles);
                        } else {
                            alert("Error in Article Ticker top articles function.");
                            console.log("error:::", data);
                        };
                    });
                break;
            default:
                news_api.searchArticles(category)
                    .then(data => {
                        if (data.articles) {
                            setArticles(data.articles);
                        } else {
                            alert("Error in Article Ticker search function");
                            console.log("error:::", data);
                        };
                    });
                break;
        };
    }, [category]);

    /** Renders out article boxes after data is fetched. */
    const renderBoxes = () => {
        if (articles) {
            return articles.map((article, index) => {
                return <ArticleBox key={index} details={article} />
            });
        }
    }

    return (
        <div className="article-ticker">
            {articles ? renderBoxes() : <Loader />}
        </div>
    );
};