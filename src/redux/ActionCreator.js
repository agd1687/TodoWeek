import {ActionTypes} from './Types';

export const createTask = (day, index, task) => ({
    type: ActionTypes.CREATE_TASK,
    payload:{
        day,
        index,
        task
    }
});

export const deleteTask = (day, index) => ({
    type: ActionTypes.DELETE_TASK,
    payload:{
        day,
        index
    }
});

export const moveTask = (day, index, direction) => ({
    type: ActionTypes.MOVE_TASK,
    payload:{
        day,
        index, 
        direction
    }
});

export const toggleTask = (day, index, done) => ({
    type: ActionTypes.TOGGLE_TASK,
    payload:{
        day,
        index,
        done
    }
});