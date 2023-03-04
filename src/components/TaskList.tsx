import { useState } from 'react';
import { useTasks, useTasksDispatch } from '../contexts/TasksContext';
import { Tasks } from '../typings/types';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </>
  );
}

interface PropsTask {
  task: Tasks;
}

function Task({ task }: PropsTask) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            if (dispatch !== null) {
              dispatch({
                type: 'changed',
                task: {
                  ...task,
                  text: e.target.value,
                },
              });
            }
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type='checkbox'
        checked={task.done}
        onChange={(e) => {
          if (dispatch !== null) {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                done: e.target.checked,
              },
            });
          }
        }}
      />
      {taskContent}
      <button
        onClick={() => {
          if (dispatch !== null) {
            dispatch({
              type: 'deleted',
              id: task.id,
            });
          }
        }}>
        Delete
      </button>
    </label>
  );
}
