import React from "react";
import type {ToDoType} from "../Types/ToDoType.tsx";
import "./Styles/Task.css"
import StatusBar from "./Status.tsx";
import { MdDeleteOutline } from "react-icons/md";
import {useUpdateTask, useDeleteTask} from "../hooks/useTasks.ts";

export default function Task(props: ToDoType) {
    const [status, setStatus] = React.useState<"pending" | "done" | "inProgress">(props.status);
    const [isHidden, setIsHidden] = React.useState(false);

    const deleteTask = useDeleteTask();
    const updateTask = useUpdateTask();

    const onClick = () => {
        setIsHidden(!isHidden);
    }
    const changeStatus = (status: "pending" | "done" | "inProgress") => {
        setStatus(status);
        updateTask.mutate(props)
    }
    return (
        <div className={"Task"} onClick={onClick}>
            <h3 className={"task-title"}>{props.title}</h3>
            {isHidden && <p className={"task-desc"}>{props.description}</p>}
            <div className={"bottom-container"}>
                <StatusBar status={status} onClick={changeStatus}/>
                {isHidden && <MdDeleteOutline className={"delete-icon"}
                onClick={() => deleteTask.mutate(props.id)}/>}
            </div>
        </div>
    )
}
