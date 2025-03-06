import {Dispatch , createContext ,ReactNode,useContext,useReducer} from "react";

type Task = {
    id: number;
    text: string;
    done: boolean;
  };
  type TaskAction =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: Task }
  | { type: 'deleted'; id: number };

const initialState : Task[] = [
    { id: 0, text: 'React Project', done: true },
    { id: 1, text: 'Python Assignement', done: false },
    { id: 2, text: 'JS Concepts',done: true }
]


type myContextType = Task[];//we have to return a task list to perform actions
type myDispatchContextType = Dispatch<TaskAction>; // to update the state we use dispatch function

const myContext =  createContext<myContextType | undefined>(undefined);

const myDispatchContext = createContext<myDispatchContextType | undefined>(undefined);

type TasksProviderProps = {
    children: ReactNode;
  };

function ContextProvider({children}:TasksProviderProps) {
    const [tasks,dispatch] = useReducer(tasksReducer,initialState)
    
    return (
    <myContext.Provider value={tasks}>
        <myDispatchContext.Provider value={dispatch}>
            {children}
        </myDispatchContext.Provider>
    </myContext.Provider>
)
}
function tasksReducer(tasks: Task[],action:TaskAction):Task[] {
    switch(action.type){
            case 'added':
              return [...tasks, { id: action.id, text: action.text, done: false }];
            case 'changed':
              return tasks.map((t) => (t.id === action.task.id ? action.task : t));
            case 'deleted':
              return tasks.filter((t) => t.id !== action.id);
            default:
              throw new Error('Unknown action');
          }
    }

export function  useTasks(): myContextType{
    const context = useContext(myContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
export function useTasksDispatch() : myDispatchContextType{
    const context = useContext(myDispatchContext);
    if (!context) {
      throw new Error('useTasksDispatch must be used within a TasksProvider');
    }
    return context;
}
export default ContextProvider;