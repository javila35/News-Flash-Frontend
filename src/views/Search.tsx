import * as React from "react";
import { useParams } from "react-router-dom";
import { ArticleBrowser } from "../views/ArticleBrowser";

type SearchParams = {
  /** User input to search for */
  query: string;
};

/** Enables a user to use Search input */
export const Search: React.FC = () => {
  const { query } = useParams<SearchParams>();
  return <ArticleBrowser category={query} />;
};
