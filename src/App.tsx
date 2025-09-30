import './App.css'
import {useState} from "react";
import Task from "./Components/Task.tsx"
import Header from "./Components/Header.tsx"
import CreateTask from "./Components/CreateTask.tsx";
import {useGetTasks} from "./hooks/useTasks.ts";

function App() {
    const [visibleForm, setVisibleForm] = useState<boolean>(false);
    const {data:Tasks = []} = useGetTasks();
    return (
    <>
        <Header onCreate={() => setVisibleForm(true)}/>
        <CreateTask
            className={visibleForm ? "" : "closed"}
            onClose={() => setVisibleForm(false)}
        />
        {Tasks.map((task) => (
            <Task
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
            />
        ))}
        {Tasks.length === 0 && (
            <h3>Список пуст, создайте новую задачу</h3>
        )}
    </>
  )
}

export default App
