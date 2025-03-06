
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import ContextProvider from "./TaskContext";

function App() {

  return (
    <ContextProvider>
      <h2  style={{marginLeft: "22px"}} >Todo List</h2>
      <AddTask />
      <TaskList />
    </ContextProvider>
  )
}

export default App
