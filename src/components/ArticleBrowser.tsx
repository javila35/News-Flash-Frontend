import * as React from "react";
// import { useQuery } from "react-query";
import { Container, makeStyles } from "@material-ui/core";
import { Article, news_api, TopArticlesResponseType } from "../services/";
import { ArticleCard } from "./ArticleCard";
// import { Loader } from "./Loader";

type ArticleBrowserProps = {
  /** Category to display in the browser */
  category: string;
};

const data = {
  articles: [
    {
      title: "This is the fake article title.",
      description: "This is the fake article description.",
      content: "Bitch I look like I'm fresh off the run way",
      url: "https://www.internet.net",
      image: "https://i.redd.it/54awv7jxe4e41.jpg",
      publishedAt: "yesterday",
      source: {
        name: "Bitch Mob Task Force",
        url: "https://www.internet.net",
      },
    },
    {
      title: "This is the fake article title.",
      description: "This is the fake article description.",
      content: "Bitch I look like I'm fresh off the run way",
      url: "https://www.internet.net",
      image: "https://i.redd.it/54awv7jxe4e41.jpg",
      publishedAt: "yesterday",
      source: {
        name: "Bitch Mob Task Force",
        url: "https://www.internet.net",
      },
    },
    {
      title: "This is the fake article title.",
      description: "This is the fake article description.",
      content: "Bitch I look like I'm fresh off the run way",
      url: "https://www.internet.net",
      image: "https://i.redd.it/54awv7jxe4e41.jpg",
      publishedAt: "yesterday",
      source: {
        name: "Bitch Mob Task Force",
        url: "https://www.internet.net",
      },
    },
    {
      title: "This is the fake article title.",
      description: "This is the fake article description.",
      content: "Bitch I look like I'm fresh off the run way",
      url: "https://www.internet.net",
      image: "https://i.redd.it/54awv7jxe4e41.jpg",
      publishedAt: "yesterday",
      source: {
        name: "Bitch Mob Task Force",
        url: "https://www.internet.net",
      },
    },
    {
      title: "This is the fake article title.",
      description: "This is the fake article description.",
      content: "Bitch I look like I'm fresh off the run way",
      url: "https://www.internet.net",
      image: "https://i.redd.it/54awv7jxe4e41.jpg",
      publishedAt: "yesterday",
      source: {
        name: "Bitch Mob Task Force",
        url: "https://www.internet.net",
      },
    },
    {
      title: "This is the fake article title.",
      description: "This is the fake article description.",
      content: "Bitch I look like I'm fresh off the run way",
      url: "https://www.internet.net",
      image: "https://i.redd.it/54awv7jxe4e41.jpg",
      publishedAt: "yesterday",
      source: {
        name: "Bitch Mob Task Force",
        url: "https://www.internet.net",
      },
    },
  ],
};

/** Page to display query result */
export const ArticleBrowser: React.FC<ArticleBrowserProps> = ({ category }) => {
  /** Render query key based on category prop. */
  // const reactQueryKey = `${category}ArticleBrowser`;

  /** Fetch articles from GNews. */
  // const { isLoading, error, data } = useQuery<TopArticlesResponseType, Error>(
  //   [reactQueryKey, category],
  //   () => news_api.getArticles(category)
  // );

  const renderArticles = () => {
    // if (data?.articles) {
    return data.articles.map((article: Article, index) => {
      return <ArticleCard key={index} article={article} />;
    });
    // }
  };

  // if (isLoading) return <Loader />;
  // if (error) return <>An error has occured: + {error.message}</>;

  return (
    <Container>
      <>{renderArticles()}</>
    </Container>
  );
};
