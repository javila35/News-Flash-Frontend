let API_ROOT;
if (!process.env.NODE_ENV || process.env.NODE_ENV) {
    API_ROOT = 'localhost:3000';
} else {
    API_ROOT = 'https://news-flash-api.herokuapp.com/';
};

const token = () => localStorage.getItem("token");

const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token()
    };
};

const createUser = user_details => {
    return fetch(`${API_ROOT}/users`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(user_details)
    }).then(response => response.json());
};

const deleteUser = user_details => {
    return fetch(`${API_ROOT}/users/${user_details}`, {
        method: 'DELETE',
        headers: headers(),
        body: JSON.stringify(user_details)
    }).then(response => response.json());
};

const editUser = user_details => {
    return fetch(`${API_ROOT}/users/${user_details.id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(user_details)
    }).then(response => response.json());
};

const getAllUsers = () => {
    return fetch(`${API_ROOT}/users`, {
        headers: headers()
    })
        .then(response => response.json());
};

const getBookmark = bookmark => {
    return fetch(`${API_ROOT}/bookmarks/${bookmark}`, {
        headers: headers()
    })
        .then(response => response.json());
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers: headers()
    }).then(response => {
        return response.json();
    });
};

const getUserToDisplay = username => {
    return fetch(`${API_ROOT}/users/${username}`, { headers: headers() })
        .then(response => response.json())
};

const login = data => {
    return fetch(`${API_ROOT}/auth`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(response => response.json());
};

const postBookmark = data => {
    return fetch(`${API_ROOT}/bookmarks`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    }).then(response => response.json());
};

const postComment = data => {
    return fetch(`${API_ROOT}/comments`, {
        method: 'POST',
        headers: headers(),
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