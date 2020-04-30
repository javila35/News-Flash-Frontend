const API_ROOT = 'http://localhost:3000';
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
    }).then(response=>response.json());
};

const editUser = user_details => {
    return fetch(`${API_ROOT}/users/${user_details.id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify(user_details)
        }).then(response => response.json());
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers: headers()
    }).then(response => {
        return response.json();
    });
};

const getUserToDisplay = username => {
    return fetch(`${API_ROOT}/users/${username}`, {headers:headers()})
        .then(response=>response.json())
};

const getArticles = () => {
    let url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=0a14a58999ab42358ae8ae02df4e0336';
    let req = new Request(url);
    return fetch(req)
    .then(response => response.json()
    )
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
    }).then(response=> response.json());
}

export const api = {
    auth: {
        login,
        getCurrentUser,
        createUser
    },
    users: {
        getUserToDisplay,
        deleteUser,
        editUser
    },
    articles: {
        getArticles,
        postBookmark
    },
    comments: {
        postComment
    }
};