import * as React from "react";
import { useQuery } from "react-query";
import { news_api, TopArticlesResponseType } from "../../services/news_api";
import Loader from "../Loader";
import ArticleBox from "./ArticleBox";

type ArticleTickerProps = {
    /** Category to display in the ticker. */
    category: string;
};

export const ArticleTicker: React.FC<ArticleTickerProps> = ({ category = "" }) => {
    /** Render query key based on category prop. */
    const reactQueryKey = (category ? `${category}Articles` : "topArticles");

    /** Fetch articles from GNews. */
    const { isLoading, error, data } = useQuery([reactQueryKey, category], () => news_api.getArticles(category))

    if (isLoading) return <Loader />;
    if (error) return (<>"An error has orccured: " + error.message</>);

    /** Renders out article boxes after data is fetched. */
    const renderBoxes = (data: TopArticlesResponseType) => {
        if (data.articles) {
            return data.articles.map((article, index) => {
                return <ArticleBox key={index} details={article} />
            });
        }
    }


    /** TODO: Turn the welcome page to a grid, and article ticker to a column from MUI. */
    return (
        <div className="article-ticker">
            {renderBoxes(data)}
        </div>
    );
};