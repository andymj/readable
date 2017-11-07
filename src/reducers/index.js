import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { 
    GET_POSTS, 
    GET_CATEGORIES, 
    SORT_BY_DATE, 
    SORT_BY_VOTES,
    GET_POST_COMMENTS,
    UPDATE_POST,
    UPDATE_COMMENT,
    CREATE_COMMENT,
    CREATE_POST } from '../actions';

const initialPosts = null;

function posts(state=initialPosts, action) {
    const { posts, post } = action;
    switch (action.type){
        case GET_POSTS :
            return [...posts].filter( post => post.deleted === false ).sort((a, b) => (b.voteScore - a.voteScore));
        case SORT_BY_DATE :
            return [...posts].sort((a, b) => ( b.timestamp - a.timestamp));
        case SORT_BY_VOTES :
            return [...posts].sort((a, b) => ( b.voteScore - a.voteScore));
        case UPDATE_POST :
            return [
                ...state.map((item) => {
                    if(item.id === post.id) {
                        return post;
                    }
                    return item;
                }).filter(post => post.deleted === false).sort((a, b) => (b.voteScore - a.voteScore))
            ]
        case CREATE_POST :
            return [
                ...state,
                post
            ];
        default :
            return state;
    }
}

function categories(state=null, action) {
    switch (action.type) {
        case GET_CATEGORIES :
            const { categories } = action
            return categories.categories;
        default :
            return state
    }
}

function comments(state=[], action) {
    const { comments, comment } = action;
    switch (action.type) {
        case GET_POST_COMMENTS :
            return [...comments].sort((a, b) => (b.voteScore - a.voteScore));
        case UPDATE_COMMENT :
            return [
                ...state.map((item)=> {
                    if( item.id === comment.id) {
                        return comment;
                    }
                    return item;
                }).sort((a, b) => (b.voteScore - a.voteScore))
            ];
        case CREATE_COMMENT :
            return [
                ...state,
                comment
            ].sort((a, b) => (b.voteScore - a.voteScore));
        default :
            return state;
    }
}

export default combineReducers({
    posts,
    categories,
    comments,
    router: routerReducer
})