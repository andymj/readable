import { combineReducers } from 'redux';
import { GET_POSTS, GET_CATEGORIES } from '../actions';

const initialPosts = null;

function posts(state=initialPosts, action) {
    switch (action.type){
        case GET_POSTS :
            const { posts } = action;
            return posts;
        default :
            return state;
    }
}

function categories(state={}, action) {
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