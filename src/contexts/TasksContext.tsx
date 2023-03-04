import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { Action, Tasks } from '../typings/types';

const TasksContetx = createContext<Tasks[] | null>(null);
const TasksDispatchContext = createContext<Dispatch<Action> | null>(null);

interface Props {
  children: ReactNode;
}

export function TasksProvider({ children }: Props) {
  const [tasks, dispatchTasks] = useReducer(tasksReducer, initialTasks);
  return (
    <TasksContetx.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatchTasks}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContetx.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContetx);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

function tasksReducer(tasks: Tasks[], action: Action): Tasks[] {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ');
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false },
];
