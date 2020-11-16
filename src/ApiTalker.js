const defaultOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('bearer'),
    },
};

function throwIfUnauthorised(response) {
    if (response.status === 403) {
        //localStorage.removeItem('bearer');
        throw new Error('Zugriff verweigert');
    }
}

export function login(username, password) {
    return fetch('/login', {...defaultOptions, method: 'POST', body: JSON.stringify({username, password})})
        .then((response) => {
            if (response.ok) {
                localStorage.setItem('bearer', response.headers.get('authorization'));
            } else {
                throw new Error("Login Fehlgeschlagen");
            }
            return response;
        });
}

export function logout() {
    localStorage.removeItem('bearer');
}

export async function fetchEntries() {
    return await fetch('/entries', defaultOptions).then((response) => {
        throwIfUnauthorised(response);
        return response;
    });
}

export function deleteEntry(entryId) {
    return fetch(`/entries/${entryId}`, {
        ...defaultOptions,
        method: 'DELETE'
    }).then((response) => {
        throwIfUnauthorised(response);
        return response;
    });
}

export function updateEntry(entry, entryId) {
    return fetch(`/entries/${entryId}`, {
        ...defaultOptions, method: 'PUT',
        body: JSON.stringify(entry)
    }).then((response) => {
        throwIfUnauthorised(response);
        return response;
    });
}

export function saveEntry(entry) {
    return fetch('/entries', {
        ...defaultOptions,
        body: JSON.stringify(entry),
        method: 'POST'
    }).then((response) => {
        throwIfUnauthorised(response);
        return response;
    });
}

export function registerCategory(category) {
    return fetch('/categories', {
        ...defaultOptions, method: 'POST',
        body: JSON.stringify(category)
    }).then((response) => {
        throwIfUnauthorised(response);
        return response;
    });
}

export function fetchCategories() {
    return fetch('/categories', {
        ...defaultOptions,
        method: 'GET'
    }).then((response) => {
        throwIfUnauthorised(response);
        return response;
    });
}

export function deleteCategory(categoryId) {
    return fetch(`/categories/${categoryId}`, {
        ...defaultOptions,
        method: 'DELETE'
    })
        .then((response) => {
            throwIfUnauthorised(response);
            return response;
        });
}

export function updateCategory(category, categoryId) {
    return fetch(`/categories/${categoryId}`, {
        ...defaultOptions,
        method: 'PUT'
    })
        .then((response) => {
            throwIfUnauthorised(response);
            return response;
        });
}

export function fetchUsers() {
    fetch('/users', {
        ...defaultOptions, method: 'GET'
    })
        .then((response) => {
        throwIfUnauthorised(response);
        return response;
    })
}

export function registerUser(user) {
    fetch('/users', {
        ...defaultOptions,
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then((response) => {
            throwIfUnauthorised(response);
            return response;
        });
}

export function deleteUser(userId) {
    fetch(`/users/${userId}`, {
        ...defaultOptions,
        method: 'DELETE'
    })
        .then((response) => {
        throwIfUnauthorised(response);
        return response;
    });
}

export function updateUser(user, userId) {
    fetch(`/users/${userId}`, {
        ...defaultOptions,
        method: 'PUT',
        body: JSON.stringify(user)
    }).then((response) => {
        throwIfUnauthorised(response);
        return response;
    })
}