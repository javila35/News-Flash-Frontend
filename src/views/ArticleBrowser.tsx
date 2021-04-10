import * as React from "react";
import { useQuery } from "react-query";
import { Container } from "@material-ui/core";
import { Article, news_api, TopArticlesResponseType } from "../services";
import { ArticleCard } from "../components/ArticleCard";
import { Loader } from "../components/Loader";

type ArticleBrowserProps = {
  /** Category to display in the browser */
  category: string;
};

/** Page to display query result */
export const ArticleBrowser: React.FC<ArticleBrowserProps> = ({ category }) => {
  /** Render query key based on category prop. */
  const reactQueryKey = `${category}ArticleBrowser`;

  /** Fetch articles from GNews. */
  const { isLoading, error, data } = useQuery<TopArticlesResponseType, Error>(
    [reactQueryKey, category],
    () => news_api.getArticles(category),
    { staleTime: Infinity, cacheTime: Infinity }
  );

  const renderArticles = () => {
    if (data?.articles) {
      return data.articles.map((article: Article, index: number) => {
        return <ArticleCard key={index} article={article} />;
      });
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <>An error has occured: + {error.message}</>;

  return (
    <Container style={{ marginTop: "1em" }}>
      <>{renderArticles()}</>
    </Container>
  );
};
