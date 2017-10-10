import * as readableAPI from "../utils/readableAPI";

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
});

export const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    categories
});

export function fetchPosts() {
    return (dispatch) => {
        readableAPI.getAllPosts().then(response => {
            dispatch(getPosts(response));
        });
    }
}

export function fetchCategories() {
    return (dispatch) => {
        readableAPI.getCategories().then(response => {
            dispatch(getCategories(response));
        });
    }
}