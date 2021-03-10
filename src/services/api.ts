import {
    AuthenticateUserParams,
    EditUserDTO,
    CreateBookmarkDTO,
    CreateCommentDTO
} from "./types";

let API_ROOT: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    API_ROOT = 'http://localhost:3000';
} else {
    API_ROOT = 'https://news-flash-api.herokuapp.com';
};

const token = () => localStorage.getItem("token");

const headers: HeadersInit = new Headers();
headers.set("Content-Type", "application/json");
headers.set("Accept", "application/json");

if (token()) {
    headers.set("Authorization", token() as string);
};

/** Create a new user. */
const createUser = (userObject: AuthenticateUserParams) => {
    return fetch(`${API_ROOT}/users`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userObject)
    }).then(response => response.json());
};

/** Delete a user record */
const deleteUser = (userID: number) => {
    return fetch(`${API_ROOT}/users/${userID}`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(userID)
    }).then(response => response.json());
};

/** Update a user record */
const editUser = (user_details: EditUserDTO) => {
    return fetch(`${API_ROOT}/users/${user_details.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(user_details)
    }).then(response => response.json());
};

/** Query all usernames */
const getAllUsers = () => {
    return fetch(`${API_ROOT}/users`, {
        headers: headers
    })
        .then(response => response.json());
};

/** Query a bookmark record */
const getBookmark = (bookmarkId: number) => {
    return fetch(`${API_ROOT}/bookmarks/${bookmarkId}`, {
        headers: headers
    }).then(response => response.json());
};

/** Retrieve logged in user record via token */
const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers: headers
    }).then(response => response.json());
};

/** Retrieve a user record by username  */
const getUserToDisplay = (username: string) => {
    return fetch(`${API_ROOT}/users/${username}`, { headers: headers })
        .then(response => response.json());
};

/** Authenticates a user */
const login = (data: AuthenticateUserParams) => {
    return fetch(`${API_ROOT}/auth`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json());
};

/** Create a bookmark */
const postBookmark = (bookmarkData: CreateBookmarkDTO) => {
    return fetch(`${API_ROOT}/bookmarks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bookmarkData)
    }).then(response => response.json());
};

/** Create a comment */
const postComment = (data: CreateCommentDTO) => {
    return fetch(`${API_ROOT}/comments`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json());
}

export const api = {
    auth: {
        login,
        getCurrentUser,
        createUser
    },
    users: {
        getAllUsers,
        getUserToDisplay,
        deleteUser,
        editUser
    },
    bookmarks: {
        getBookmark,
        postBookmark
    },
    comments: {
        postComment
    }
};