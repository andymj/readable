import { GET_POSTS } from '../actions';

export default function posts(state={}, action) {
    switch (action.type){
        case GET_POSTS :
            return { posts: action.posts };
        default :
            return state;
    }
}