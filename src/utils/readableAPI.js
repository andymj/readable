const url = 'http://localhost:3001';
const posts = 'posts';
const categories = 'categories';

let headers = {
    Accept: 'application/json',
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json'
}

function get(url) {
    return fetch(url, { method: 'GET', headers })
        .then(res => res.json())
        .then(data => data);
}

function post(url, option) {
    return fetch(url, { method: 'POST', headers, body: { option } })
        .then( res => res.json())
        .then(data => data);
}

export function getAllPosts() {
    return get(`${url}/${posts}`);
}

export function getCategories() {
    return get(`${url}/${categories}`);
}

export function getAllCategoryPosts(category) {
    return get(`${url}/${category}/posts`);
}

export function getPostComments(postId) {
    return get(`${url}/posts/${postId}/comments`);
}

export function updateVote(vote, postId) {
    return post(`${url}/posts/${postId}`, vote);
}