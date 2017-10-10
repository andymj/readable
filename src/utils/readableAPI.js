const url = 'http://localhost:3001';
const posts = 'posts';
const categories = 'categories';
const comments = 'comments';

let headers = {
    Accept: 'application/json',
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json'
}

function get(url, headers) {
    return fetch(url, { method: 'GET', headers })
        .then(res => res.json())
        .then(data => data);
}

export function getAllPosts() {
    return get(`${url}/${posts}`, headers);
}

export function getCategories() {
    return get(`${url}/${categories}`, headers);
}