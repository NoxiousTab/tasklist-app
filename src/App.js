// App.js
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import update from 'immutability-helper';
import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Task from "./components/Task";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (text) => {
    const newTask = {
      id: Math.random(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const checkTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const moveTaskUp = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex > 0) {
      const newTasks = [...tasks];
      [newTasks[taskIndex], newTasks[taskIndex - 1]] = [
        newTasks[taskIndex - 1],
        newTasks[taskIndex],
      ];
      setTasks(newTasks);
    }
  };

  const moveTask = (dragIndex, hoverIndex) => {
    const dragTask = tasks[dragIndex];
    setTasks(
      update(tasks, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragTask],
        ],
      })
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(updatedTasks);
  };

  const moveTaskDown = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex < tasks.length - 1) {
      const newTasks = [...tasks];
      [newTasks[taskIndex], newTasks[taskIndex + 1]] = [
        newTasks[taskIndex + 1],
        newTasks[taskIndex],
      ];
      setTasks(newTasks);
    }
  };

  /*return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <h1 className="task-list-heading">Task List</h1>
        <TaskForm onAddTask={addTask} />
        <Droppable droppableId="task-list">
          {(provided) => (
            <div
              className="task-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        task={task}
                        onDelete={deleteTask}
                        onCheck={checkTask}
                        onMoveUp={moveTaskUp}
                        onMoveDown={moveTaskDown}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}*/
	return (
    <div className="app">
      <h1 className="task-list-heading">Task List</h1>
      <TaskForm onAddTask={addTask} />
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            index={index}
            task={task}
            onDelete={deleteTask}
            onCheck={checkTask}
            onMove={moveTask}
          />
        ))}
      </div>
    </div>
  );
}


export default App;

