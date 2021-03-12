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

/** Create auth session params */
export type AuthenticateUserParams = {
    username: string;
    password: string;
}

/** Query for all users response type */
export type UserIndexResponse = string[];

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

export type BookmarkDTO = {
    /** Bookmark id */
    id: number;
    /** User bookmark belongs to */
    user_id: number;
    /** Title for article */
    article_title: string;
    /** Link to article */
    article_link: string;
    /** Link to article image */
    article_img: string;
}

/** Nested object created by FastJSONAPI */
interface UserShowAttributes extends UserDTO {
    bookmarks: BookmarkDTO[];
}

/** Response when hitting the Users#show route */
export type UserShowResponse = {
    /** User id */
    id: number;
    /** Type of object */
    type: "user";
    /** Serialized attributes for user */
    attributes: UserShowAttributes;
}

/** Successful login or sign up response type */
interface SuccessfulAuthSessionResponse {
    /** Nested userDTO object */
    user: UserDTO;
    /** Encoded JsonWebToken */
    jwt: string;
    /** Succesful http status*/
    status: 202 | 201;
}

/** Unsuccesful login or sign up response type */
type UnsuccesfulAuthResponse = {
    /** Custom response created by DB admin */
    errors: string;
    /** Type of failure */
    status: 401 | 500;
}

export type AuthResponse = SuccessfulAuthSessionResponse | UnsuccesfulAuthResponse;