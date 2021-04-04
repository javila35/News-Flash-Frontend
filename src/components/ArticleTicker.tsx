import * as React from "react";
import { useQuery } from "react-query";
import { news_api, TopArticlesResponseType } from "../services/";
import { Loader } from "./Loader";
import { ArticleBox } from "./ArticleBox";

type ArticleTickerProps = {
  /** Category to display in the ticker. */
  category: string;
};

/**
 * Component used on landing page to display "snapshot" of headlines.
 * @param {string} category
 */
export const ArticleTicker: React.FC<ArticleTickerProps> = ({
  category = "",
}) => {
  /** Render query key based on category prop. */
  const reactQueryKey = category ? `${category}Articles` : "topArticles";

  /** Fetch articles from GNews. */
  const { isLoading, error, data } = useQuery<TopArticlesResponseType, Error>(
    [reactQueryKey, category],
    () => news_api.getArticles(category)
  );

  if (isLoading) return <Loader />;
  if (error) return <>"An error has occured: " + {error.message}</>;

  /** Renders out article boxes after data is fetched. */
  const renderBoxes = () => {
    if (data?.articles) {
      return data.articles.map((article, index) => {
        return <ArticleBox key={index} article={article} />;
      });
    }
  };

  /** TODO: Turn the welcome page to a grid, and article ticker to a column from MUI. */
  return <div className="article-ticker">{renderBoxes()}</div>;
};
