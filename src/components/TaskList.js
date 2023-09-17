// TaskList.js
import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, onDelete, onCheck, onMoveUp, onMoveDown }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onCheck={onCheck}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
        />
      ))}
    </div>
  );
};

export default TaskList;
