import { BookmarkDTO } from "./Bookmark";

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

export type UserState = UserDTO | null;

/** Object to update a user. */
export type EditUserDTO = Pick<
  UserDTO,
  "id" | "first_name" | "location" | "bio"
> & {
  /** Field to update user's unique username */
  username?: string;
};

/** Create auth session params */
export type AuthenticateUserParams = {
  username: string;
  password: string;
};

/** Query for all users response type */
export type UserIndexResponse = string[];

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
};

type SuccesfulUpdateUserResponse = Pick<
  SuccessfulAuthSessionResponse,
  "user"
> & {
  status: 200;
};

type UnsuccesfulUpdateUserResponse = {
  /** Custom error message created by DB admin */
  errors: string;
  status: 406;
};

export type UpdateUserResponse =
  | SuccesfulUpdateUserResponse
  | UnsuccesfulUpdateUserResponse;

type AuthErrorMessage = "Could not find username." | "Incorrect password.";

/** Successful log in response type */
interface SuccessfulAuthSessionResponse {
  /** Nested userDTO object */
  user: UserDTO;
  /** Encoded JsonWebToken */
  jwt: string;
  /** Succesful http status*/
  status: 200 | 201 | 202;
}

/** Unsuccesful log in response type */
type UnsuccesfulAuthResponse = {
  /** Custom response created by DB admin */
  message: AuthErrorMessage;
  /** Type of failure */
  status: 401;
};

/** Union of Authenticate success and failure */
export type AuthResponse =
  | SuccessfulAuthSessionResponse
  | UnsuccesfulAuthResponse;

/** Succesful response for token decoding */
type SuccesfulCurrentUserResponse = {
  user: UserDTO;
  status: 200;
};

/** Failure to decode token response */
type UnsuccesfulCurrentUserResponse = {
  error: string;
  status: 401;
};

/** Union of current user method */
export type GetCurrentUserResponse =
  | SuccesfulCurrentUserResponse
  | UnsuccesfulCurrentUserResponse;

export type AccountCreationError =
  | "Passwords do not match."
  | "Username has already been taken";

type SuccesfulAccountCreationResponse = {
  user: UserDTO;
  jwt: string;
  status: 201;
};

type UnsuccesfulAccountCreationResponse = {
  message: AccountCreationError;
  status: 401;
};

export type AccountCreationResponse =
  | SuccesfulAccountCreationResponse
  | UnsuccesfulAccountCreationResponse;
