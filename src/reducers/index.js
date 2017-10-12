import { combineReducers } from 'redux';
import { GET_POSTS, GET_CATEGORIES, SORT_BY_DATE, SORT_BY_VOTES } from '../actions';

const initialPosts = null;

function posts(state=initialPosts, action) {
    const { posts } = action;
    switch (action.type){
        case GET_POSTS :
            return [...posts].sort((a, b) => (b.voteScore - a.voteScore));
        case SORT_BY_DATE :
            return [...posts].sort((a, b) => ( b.timestamp - a.timestamp) );
        case SORT_BY_VOTES :
            return [...posts].sort((a, b) => ( b.voteScore - a.voteScore) );
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

export default combineReducers({
    posts,
    categories
})