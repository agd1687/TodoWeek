import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import TodoList from './TodoList';
import {ActionTypes} from '../redux/Types'
import {createTask, deleteTask, moveTask, toggleTask} from '../redux/ActionCreator';

export default function Todo() {

    const [focusedTask, setFocusedTask] = useState({ day: "monday", index: 0, flag:false });
    const [firstDayTaskUpdate, setFirstDayTaskUpdate] = useState(false);
    const dispatch = useDispatch();
    const dayTasks = useSelector((store) => store);
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("todoweek"));
        data && dispatch({type: ActionTypes.LOAD_DATA, payload:{data}});
        data && setFirstDayTaskUpdate(true);
    }, []);

    useEffect(() => {
        setFocusedTask({...focusedTask, index: dayTasks['monday'].length})
    }, [firstDayTaskUpdate]);
    
    useEffect(() => {
        localStorage.setItem("todoweek", JSON.stringify(dayTasks));
    }, [dayTasks]);

    const handleChange = (e, day, index) => {
        setFocusedTask({ day: day, index: index, flag:!focusedTask.flag});
        dispatch(createTask(day, index, e.target.value));
    }

    const handleKeyPress = (e, day, index) => {
        if (e.key === 'Enter' && dayTasks[day].length > index) {
            setFocusedTask({ day: day, index: index + 1, flag:!focusedTask.flag});
        }
    }

    const handleCheck = (e, day, index) => {
        dispatch(toggleTask(day, index, e.target.checked));
    }

    const handleChangeTaskPosition = (day, index, type) => {
        dispatch(moveTask(day, index, type));
    }
    const handleTaskDelete = (day, index) => {
        dispatch(deleteTask(day, index));
    }

    const handleOnClickTodoList = (day) => {
        setFocusedTask({ day: day, index: dayTasks[day].length, flag:!focusedTask.flag });
    } 

    return (
        <div className="todo">
            {Object.keys(dayTasks).map(key =>
                <TodoList
                    key={key}
                    day={key}
                    tasks={dayTasks[key]}
                    handleChange={handleChange}
                    focusedTask={focusedTask}
                    handleKeyPress={handleKeyPress}
                    handleCheck={handleCheck}
                    handleChangeTaskPosition={handleChangeTaskPosition}
                    handleTaskDelete={handleTaskDelete}
                    handleOnClickTodoList={handleOnClickTodoList}
                />)}
        </div>
    );
}