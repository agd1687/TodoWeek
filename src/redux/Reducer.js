import { ActionTypes } from './Types';

export const TaskReducer = (store, action) => {
    const storeBase = { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [] };
    //const { task, day, index, done, direction, data } = action.payload;
    const payload = action.payload;
    const type = action.type;
    switch (type) {
        case ActionTypes.CREATE_TASK:
            return { ...storeBase, ...store, [payload.day]: [...store[payload.day].slice(0, payload.index), { task: payload.task, done: false }, ...store[payload.day].slice(payload.index + 1)] };
        case ActionTypes.DELETE_TASK:
            return { ...storeBase, ...store, [payload.day]: [...store[payload.day].slice(0, payload.index), ...store[payload.day].slice(payload.index + 1)] };
        case ActionTypes.MOVE_TASK:
            if (payload.direction === "arrowUp" && payload.index > 0) {
                return { ...storeBase, ...store, [payload.day]: [...store[payload.day].slice(0, payload.index - 1), store[payload.day][payload.index], store[payload.day][payload.index - 1], ...store[payload.day].slice(payload.index + 1)] };
            } else if (payload.direction === "arrowDown" && payload.index + 1 < store[payload.day].length) {
                return { ...storeBase, ...store, [payload.day]: [...store[payload.day].slice(0, payload.index), store[payload.day][payload.index + 1], store[payload.day][payload.index], ...store[payload.day].slice(payload.index + 2)] };
            } else {
                return store || storeBase;
            }
        case ActionTypes.TOGGLE_TASK:
            return ({ ...storeBase, ...store, [payload.day]: [...store[payload.day].slice(0, payload.index), { ...store[payload.day][payload.index], done: payload.done }, ...store[payload.day].slice(payload.index + 1)] });
        case ActionTypes.LOAD_DATA:
            return { ...payload.data };
        default:
            return store || storeBase;
    }
}