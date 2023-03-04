export type Tasks = {
  id: number;
  text: string;
  done: boolean;
};

export type Action =
  | {
      type: 'added';
      id: number;
      text: string;
      done: boolean;
    }
  | {
      type: 'changed';
      task: Tasks;
    }
  | {
      type: 'deleted';
      id: number;
    };
