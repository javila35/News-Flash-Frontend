/** User type recieved from Rails API */
export interface UserDTO {
    /** ID in database */
    id: number;
    /** User's unique username */
    username: string;
    /** User provided first name */
    first_name?: string;
    /** User provided location */
    location?: string;
    /** User provided biography */
    bio?: string;
}

/** Object to update a user. */
export type EditUserDTO = Pick<UserDTO, "id" | "first_name" | "location" | "bio"> & {
    /** Field to update user's unique username */
    username?: string;
}

/** User object for create */
export type AuthenticateUserParams = {
    username: string;
    password: string;
}

/** Query for all users response type */
export type AllUsersResponse = string[];

/** Create a new bookmark */
export type CreateBookmarkDTO = {
    /** User ID to associate the bookmark to */
    user_id: number;
    /** Title for the bookmark */
    article_title: string;
    /** Link to the published article */
    article_link: string;
}

/** Create a new comment  */
export type CreateCommentDTO = {
    /** User ID to associate the comment to */
    user_id: number;
    /** Bookmark ID to associate the comment to */
    bookmark_id: number;
    /** Text to display */
    comment_text: string;
}

