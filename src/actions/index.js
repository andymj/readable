import * as readableAPI from "../utils/readableAPI";

export const GET_POSTS = 'GET_POSTS';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SORT_BY_DATE = 'SORT_BY_DATE';
export const SORT_BY_VOTES = 'SORT_BY_VOTES';
export const GET_POST_COMMENTS = 'GET_POST_COMMENTS'
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT';

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

export const getPostComments = (comments) => ({
    type: GET_POST_COMMENTS,
    comments
})

export function fetchPostComments(postId) {
    return (dispatch) => {
        readableAPI.getPostComments(postId).then(response => {
            dispatch(getPostComments(response));
        });
    }
}

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

export const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

export const addCommentToPost = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

export function updatePostVotes(vote, postId) {
    return (dispatch) => {
        readableAPI.updateVote(vote, postId).then(response => {
            dispatch(updatePost(response));
        });
    }
}

export function updateCommentVotes(vote, commentId) {
    return (dispatch) => {
        readableAPI.updateCommentVote(vote, commentId).then(response => {
            dispatch(updateComment(response));
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

export function createComment(commentData) {
    return (dispatch) => {
        readableAPI.addCommentToPost(commentData).then(response => {
            dispatch(addCommentToPost(response));
        });
    }
}