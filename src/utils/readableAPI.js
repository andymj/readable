const url = 'http://localhost:3001';    // server running on localhost on port 3001
const posts = 'posts';
const categories = 'categories';

let headers = {
    Accept: 'application/json',
    Authorization: 'whatever-you-want',
    'Content-Type': 'application/json'
}

/**
 * requests data from the server using th method 'GET'
 * @param {String} url
 * returns a Promise wich contains the value requested
 */
function get(url) {
    return fetch(url, { method: 'GET', headers })
        .then(res => res.json())
        .then(data => data);
}

/**
 * Requests the server to create data.
 * @param {String} url 
 * @param {String|Object Literal} option
 * Returns a Promise which contains the value of the new data.
 */
function post(url, option) {
    const body = typeof option === 'string' ? { option } : { ...option }
    return fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
        .then( res => res.json())
        .then(data => data);
}

/**
 * Request server to update data.
 * @param {String} url 
 * @param {Object Literal} data
 * Returns a Promise with the value of the data updated.
 */
function put(url, data) {
    return fetch(url, { method: 'PUT', headers, body: JSON.stringify(data) })
        .then(res => res.json())
        .then(data => data);
}

/**
 * request the server to remove data.
 * @param {String} url 
 * @param {String} id
 * returns a Promise with value of a successful result.
 */
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