// TaskItem.js
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TaskItem = ({ task, onDelete, onCheck, index, onMove }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'TASK',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`task ${task.completed ? 'completed' : ''}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onCheck(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
