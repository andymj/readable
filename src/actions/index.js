import * as readableAPI from "../utils/readableAPI";

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SORT_BY_DATE = 'SORT_BY_DATE';
export const SORT_BY_VOTES = 'SORT_BY_VOTES';

export const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
});

export const sortByDate = (posts) => ({
    type: SORT_BY_DATE,
    posts
})

export const sortByVotes = (posts) => ({
    type: SORT_BY_VOTES,
    posts
})

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