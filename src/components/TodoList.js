import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ day, tasks = [], handleChange, focusedTask, handleKeyPress, handleCheck, handleChangeTaskPosition, handleTaskDelete, handleOnClickTodoList }) {
    //const emptyCells = new Array(5 - tasks.length).fill(""); {emptyCells.map((item, index) => <TodoItem key={"TDW"+index} task={item} empty={true} day={day} handleChange={handleChange}/>)}
    return (
        <div className="todo-list" onClick={() => handleOnClickTodoList(day)}>
            <div>
                <h3>{day.toUpperCase()}</h3>
                <p>{tasks.filter((task => task.done)).length}/{tasks.length}</p>
            </div>
            {tasks.map((item, index) =>
                <TodoItem key={index}
                    task={item} day={day}
                    index={index}
                    handleChange={handleChange}
                    focusedTask={focusedTask}
                    handleKeyPress={handleKeyPress}
                    handleCheck={handleCheck}
                    handleChangeTaskPosition={handleChangeTaskPosition}
                    handleTaskDelete={handleTaskDelete}
                />)}
            <TodoItem
                key={tasks.length}
                task="" empty={true}
                day={day}
                index={tasks.length}
                handleChange={handleChange}
                focusedTask={focusedTask}
                handleKeyPress={handleKeyPress}
            />
        </div>
    );
}