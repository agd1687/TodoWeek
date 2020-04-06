import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
    const totalTasks = useSelector(store => Object.values(store).map(arrayList => arrayList.length).reduce((accum, num) => accum + num));
    const completedTasks = useSelector(store => Object.values(store).map(taskList => taskList.filter(task => task.done)).map(arrayList => arrayList.length).reduce((accum, num) => accum + num))
    return (
        <>
            <h1>Todo Week</h1>
            <h3 className="total-task">{completedTasks}/{totalTasks}</h3>
        </>
    );
}