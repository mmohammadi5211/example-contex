import { useState } from 'react';
import { useTasksDispatch } from '../contexts/TasksContext';

export default function AddTask() {
  const [text, setText] = useState<string>('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder='Add task'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          if (dispatch !== null) {
            dispatch({
              type: 'added',
              id: Math.random(),
              text: text,
              done: false,
            });
          }
        }}>
        Add
      </button>
    </>
  );
}
