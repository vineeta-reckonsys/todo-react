import { useState } from 'react';
import { useTasks, useTasksDispatch } from "../TaskContext";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} />
        </li>
      ))}
    </ul>
  );
}

type TaskProps = {
  task: Task;
};


function TaskItem({ task }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useTasksDispatch();

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          style={{padding: "5px",margin: "5px"}}
          onChange={(e) =>
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value,
              },
            })
          }
        />
        <button  style={{padding: "5px",margin: "3px"}} onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button  style={{padding: "5px",margin: "3px"}} onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        style={{padding: "2px",marginRight: "5px"}}
        onChange={(e) =>
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked,
            },
          })
        }
      />
      {taskContent}
      <button
       style={{padding: "5px",margin: "5px"}}
        onClick={() =>
          dispatch({
            type: 'deleted',
            id: task.id,
          })
        }
      >
        Delete
      </button>
    </label>
  );
}