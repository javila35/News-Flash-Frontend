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
export interface CreateCommentDTO {
    /** User ID to associate the comment to */
    user_id: number;
    /** Bookmark ID to associate the comment to */
    bookmark_id: number;
    /** Text to display */
    comment_text: string;
}

export interface CommentDTO extends CreateCommentDTO {
    /** Comment id */
    id: number;
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
    /** Array of comments to display */
    comments?: CommentDTO[];
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


type SuccesfulUpdateUserResponse = Pick<SuccessfulAuthSessionResponse, "user"> & {
    status: 200;
}

type UnsuccesfulUpdateUserResponse = {
    /** Custom error message created by DB admin */
    errors: string;
    status: 406;
};

export type UpdateUserResponse = SuccesfulUpdateUserResponse | UnsuccesfulUpdateUserResponse;

/** Successful login or sign up response type */
interface SuccessfulAuthSessionResponse {
    /** Nested userDTO object */
    user: UserDTO;
    /** Encoded JsonWebToken */
    jwt: string;
    /** Succesful http status*/
    status: 200 | 201 | 202;
}

/** Unsuccesful login or sign up response type */
type UnsuccesfulAuthResponse = {
    /** Custom response created by DB admin */
    errors: string;
    /** Type of failure */
    status: 401 | 500;
}

/** Union of Authenticate success and failure */
export type AuthResponse = SuccessfulAuthSessionResponse | UnsuccesfulAuthResponse;

/** Succesful response for token decoding */
type SuccesfulCurrentUserResponse = {
    user: UserDTO;
    status: 200;
}

/** Failure to decode token response */
type UnsuccesfulCurrentUserResponse = {
    error: string;
    status: 401;
}

/** Union of current user method */
export type GetCurrentUserResponse = SuccesfulCurrentUserResponse | UnsuccesfulCurrentUserResponse;