import * as React from "react";
import { useQuery } from "react-query";
import { news_api, TopArticlesResponseType } from "../services/news_api";
import { ArticleCard } from "./ArticleCard";
import { Loader } from "./Loader";

type ArticleBrowserProps = {
    /** Category to display in the browser */
    category: string;
};

/** TODO: Write docs for this component
 * Where is it? What does it do?
 */
export const ArticleBrowser: React.FC<ArticleBrowserProps> = ({ category }) => {
    /** Render query key based on category prop. */
    const reactQueryKey = `${category}ArticleBrowser`;

    /** Fetch articles from GNews. */
    const { isLoading, error, data } = useQuery<TopArticlesResponseType, Error>(
        [reactQueryKey, category],
        () => news_api.getArticles(category)
    );

    const renderArticles = () => {
        if (data?.articles) {
            return data.articles.map((article, index) => {
                return <ArticleCard key={index} article={article} />
            });
        }
    }

    if (isLoading) return <Loader />
    if (error) return (<>An error has occured: + {error.message}</>)

    return (
        <div className="article">
            {renderArticles()}
        </div>
    );
}