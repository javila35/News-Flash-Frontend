/** Article type recieved from GNews API */
export type Article = {
  /** Title or headline for article */
  title: string;
  /** Description of article */
  description: string;
  /** Truncated content with character count at the end. */
  content: string;
  /** Link to article */
  url: string;
  /** Link to image */
  image: string;
  /** UTC date and time of publish.  */
  publishedAt: string;
  /** Information about publication */
  source: {
    /** Name of source */
    name: string;
    /** Link to website */
    url: string;
  };
};

export type TopArticlesResponseType = {
  /** Total number of results */
  totalArticles: number;
  /** Array containing articles*/
  articles: Article[];
};
