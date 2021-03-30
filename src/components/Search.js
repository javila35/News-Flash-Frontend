import * as React from "react";
import { useParams } from "react-router-dom";
import { ArticleBrowser } from "./ArticleBrowser";

/**
 * Enables a user to use Search input
 * @returns ```<ArticleBrowser category={query} />```
 */
export const Search = () => {
  const { query } = useParams();
  return <ArticleBrowser category={query} />;
};
