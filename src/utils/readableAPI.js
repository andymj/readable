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
    const body = typeof option === 'string' ? { option } : { ...option }
    return fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
        .then( res => res.json())
        .then(data => data);
}

function put(url, data) {
    return fetch(url, { method: 'PUT', headers, body: JSON.stringify(data) })
        .then(res => res.json())
        .then(data => data);
}

function remove(url, id) {
    return fetch(url, { method: 'DELETE', headers })
        .then(res => res.json())
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

export function updateCommentVote(vote, commentId) {
    return post(`${url}/comments/${commentId}`, vote);
}

export function addCommentToPost(data) {
    return post(`${url}/comments`, data);
}

export function editComment(commentData, commentId) {
    return put(`${url}/comments/${commentId}`, commentData);
}

export function deleteComment(commentId) {
    return remove(`${url}/comments/${commentId}`);
}

export function createPost(postData) {
    return post(`${url}/posts`, postData);
}

export function editPost(postData, postId) {
    return put(`${url}/posts/${postId}`, postData);
}

export function deletePost(postId) {
    return remove(`${url}/posts/${postId}`);
}