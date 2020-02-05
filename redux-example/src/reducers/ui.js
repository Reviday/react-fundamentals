import * as types from '../actions/ActionTypes';

const inintialState = {
    color: [255, 255, 255]
};

export default function ui(state = inintialState, action) {
    if(action.type === types.SET_COLOR) {
        return {
            color: action.color
        }
    } else {
        return state;
    }
}