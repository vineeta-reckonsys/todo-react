import { useState} from 'react';
import { useTasksDispatch } from '../TaskContext.tsx';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
       style={{padding: "5px",marginLeft: "22px"}}
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}  style={{padding: "5px",margin: "5px"}} >Add</button>
    </>
  );
}

let nextId = 3;