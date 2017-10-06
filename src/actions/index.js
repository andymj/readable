export const GET_POSTS = 'GET_POSTS';

export const getPosts = (posts) => ({
    type: GET_POSTS,
    posts: posts
});