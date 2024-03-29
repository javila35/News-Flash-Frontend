import * as React from "react";
import { useQuery } from "react-query";
import { GridList } from "@material-ui/core";
import { news_api, TopArticlesResponseType } from "../services/";
import { Loader } from "./Loader";
import { GridBox } from "./ArticleBox";

type ArticleTickerProps = {
  /** Category to display in the ticker. */
  category: string;
};

/** Column to display GridBox on index page */
export const GridColumn: React.FC<ArticleTickerProps> = ({ category }) => {
  /** Render query key based on category prop. */
  const reactQueryKey = category ? `${category}Articles` : "topArticles";

  /** Fetch articles from GNews. */
  const { isLoading, error, data } = useQuery<TopArticlesResponseType, Error>(
    [reactQueryKey, category],
    () => news_api.getArticles(category),
    { staleTime: Infinity, cacheTime: Infinity }
  );

  if (isLoading) return <Loader />;
  if (error) return <>"An error has occured: " + {error.message}</>;

  /** Renders out article boxes after data is fetched. */
  const renderBoxes = () => {
    if (data?.articles) {
      return data.articles.map((article, index) => {
        return <GridBox key={index} article={article} />;
      });
    }
  };

  return (
    <GridList cellHeight={300} cols={1}>
      {renderBoxes()}
    </GridList>
  );
};
