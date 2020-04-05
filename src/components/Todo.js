import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';

export default function Todo() {

    const [dayTasks, setDayTask] = useState({ monday: [], tuesday: [], wednesday: [], thursday: [], friday: [] });
    const [focusedTask, setFocusedTask] = useState({ day: "monday", index: 0, flag:false });
    const [firstDayTaskUpdate, setFirstDayTaskUpdate] = useState(false);
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("todoweek"));
        data && setDayTask(data);
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
        setDayTask({ ...dayTasks, [day]: [...dayTasks[day].slice(0, index), { task: e.target.value, done: false }, ...dayTasks[day].slice(index + 1)] });
    }

    const handleKeyPress = (e, day, index) => {
        if (e.key === 'Enter' && dayTasks[day].length > index) {
            setFocusedTask({ day: day, index: index + 1, flag:!focusedTask.flag});
        }
    }

    const handleCheck = (e, day, index) => {
        setDayTask({ ...dayTasks, [day]: [...dayTasks[day].slice(0, index), { ...dayTasks[day][index], done: e.target.checked }, ...dayTasks[day].slice(index + 1)] });
    }

    const handleChangeTaskPosition = (day, index, type) => {
        if (type === "arrowUp" && index > 0) {
            setDayTask({ ...dayTasks, [day]: [...dayTasks[day].slice(0, index - 1), dayTasks[day][index], dayTasks[day][index - 1], ...dayTasks[day].slice(index + 1)] });
        } else if (type === "arrowDown" && index + 1 < dayTasks[day].length) {
            setDayTask({ ...dayTasks, [day]: [...dayTasks[day].slice(0, index), dayTasks[day][index + 1], dayTasks[day][index], ...dayTasks[day].slice(index + 2)] });
        }
    }
    const handleTaskDelete = (day, index) => {
        // Other Option >>> setDayTask({ ...dayTasks, [day]: [...dayTasks[day].slice(0, index), ...dayTasks[day].slice(index + 1)] });
        const taskArrayUpdated = dayTasks[day].filter((task, indexTask) => indexTask !== index);
        setDayTask({ ...dayTasks, [day]:taskArrayUpdated });
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