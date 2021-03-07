let API_ROOT: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV) {
    API_ROOT = 'http://localhost:3000';
} else {
    API_ROOT = 'https://news-flash-api.herokuapp.com';
};

export type UserDTO = {
    /** ID in database */
    id: number;
    /** User's unique username */
    username: string;
    /** User provided first name */
    first_name?: string;
    /** User provided location */
    location?: string;
}

export type UserState = UserDTO | null;

/** User object for create */
export type UserAuthDTO = {
    username: string;
    password: string;
}

const token = () => localStorage.getItem("token");

const headers: HeadersInit = new Headers();
headers.set("Content-Type", "application/json");
headers.set("Accept", "application/json");

// const headers = () => {
//     return {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: token()
//     };
// };

const createUser = (userObject: UserAuthDTO) => {
    return fetch(`${API_ROOT}/users`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(userObject)
    }).then(response => response.json());
};

const deleteUser = (userID: number) => {
    return fetch(`${API_ROOT}/users/${userID}`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(userID)
    }).then(response => response.json());
};

// const editUser = (user_details: string) => {
//     return fetch(`${API_ROOT}/users/${user_details.id}`, {
//         method: 'PUT',
//         headers: headers,
//         body: JSON.stringify(user_details)
//     }).then(response => response.json());
// };

export type AllUsersResponse = string[];

const getAllUsers = () => {
    return fetch(`${API_ROOT}/users`, {
        headers: headers
    })
        .then(response => response.json());
};

const getBookmark = (bookmark: string) => {
    return fetch(`${API_ROOT}/bookmarks/${bookmark}`, {
        headers: headers
    })
        .then(response => response.json());
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers: headers
    }).then(response => {
        return response.json();
    });
};

const getUserToDisplay = (username: string) => {
    return fetch(`${API_ROOT}/users/${username}`, { headers: headers })
        .then(response => response.json())
};

// const login = data => {
//     return fetch(`${API_ROOT}/auth`, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(data)
//     }).then(response => response.json());
// };

// const postBookmark = data => {
//     return fetch(`${API_ROOT}/bookmarks`, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(data)
//     }).then(response => response.json());
// };

// const postComment = data => {
//     return fetch(`${API_ROOT}/comments`, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(data)
//     }).then(response => response.json());
// }

export const api = {
    auth: {
        // login,
        getCurrentUser,
        createUser
    },
    users: {
        getAllUsers,
        getUserToDisplay,
        deleteUser,
        // editUser
    },
    bookmarks: {
        getBookmark,
        // postBookmark
    },
    comments: {
        // postComment
    }
};