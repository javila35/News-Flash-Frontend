import * as React from "react";
import { useParams } from "react-router-dom";
import { UserState } from "../services";
import { ArticleBrowser } from "./ArticleBrowser";

type SearchParams = {
  /** User input to search for */
  query: string;
};

type SearchProps = {
  currentUser?: UserState;
};

/** Enables a user to use Search input */
export const Search: React.FC<SearchProps> = ({ currentUser }) => {
  const { query } = useParams<SearchParams>();
  return <ArticleBrowser category={query} currentUser={currentUser} />;
};
