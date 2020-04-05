import React, { useState, useRef, useEffect } from 'react';

export default function TodoItem({ task, empty = false, day, index, handleChange, focusedTask, handleKeyPress, handleCheck, handleChangeTaskPosition, handleTaskDelete }) {
    const [showMenu, setShowMenu] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (day === focusedTask.day && index === focusedTask.index) {
            inputRef.current.focus();
        }
    }, [task, focusedTask.day, focusedTask.index, focusedTask.flag]);

    const classDone = task.done ? "task-done" : "";
    const placeholder = empty ? " New Task" : "";

    return (
        <div className={"todo-item " + classDone} onMouseOver={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} onClick={(e) => e.stopPropagation()}>
            <div className="todo-item-input">
                {!empty && <input type="checkbox" checked={task.done} onChange={(e) => handleCheck(e, day, index)} />}
                <input
                    className={classDone}
                    ref={inputRef}
                    type="text"
                    value={task.task}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e, day, index)}
                    onKeyPress={(e) => handleKeyPress(e, day, index)}
                />
            </div>
            {!empty && showMenu && <div className="todo-item-menu">
                <button onClick={(e) => handleChangeTaskPosition(day, index, "arrowUp")}><i className="fas fa-arrow-up"></i></button>
                <button onClick={(e) => handleChangeTaskPosition(day, index, "arrowDown")}><i className="fas fa-arrow-down"></i></button>
                <button onClick={(e) => handleTaskDelete(day, index)}><i className="fas fa-trash-alt"></i></button>
            </div>}
        </div>
    );
}