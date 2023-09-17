// Task.js
import React from "react";

const Task = ({ task, onDelete, onCheck, onMoveUp, onMoveDown }) => {
  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onCheck(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
      <button onClick={() => onMoveUp(task.id)}>Move Up</button>
      <button onClick={() => onMoveDown(task.id)}>Move Down</button>
    </div>
  );
};

export default Task;
