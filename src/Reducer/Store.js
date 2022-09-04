import {createStore} from 'redux';

const getDifficulty = (state = {difficulty_level : 1,name : ''},action) => {

    if(action.type === 'easy'){
        return {
            ...state,
            difficulty_level : 1,
        }
    }
    else if(action.type === 'medium'){
        return {
            ...state,
            difficulty_level : 2,
        }
    }
    else if(action.type === 'hard'){
        return {
            ...state,
            difficulty_level : 3,
        }
    }
    else{
        if(localStorage.getItem('Name') == 'undefined' || localStorage.getItem('Name') == null)
           localStorage.setItem('Name',action.payload)
        return{
            ...state,
            difficulty_level : 1,
            name: (localStorage.getItem('Name') != 'undefined') ? localStorage.getItem('Name') : action.payload 
        }
    }  
}

const store = createStore(getDifficulty);

export default store;