import {createStore} from 'redux';

const getDifficulty = (state = {difficulty_level : 1},action) => {

    if(action.type === 'easy'){
        return {
            difficulty_level : 1
        }
    }
    if(action.type === 'medium'){
        return {
            difficulty_level : 2
        }
    }
    if(action.type === 'hard'){
        return {
            difficulty_level : 3
        }
    }
    return state;
}

const store = createStore(getDifficulty);

export default store;