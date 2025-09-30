import {type ChangeEvent, useState} from "react";
import "./Styles/CreatTask.css"
import {useCreateTask} from "../hooks/useTasks.ts";

interface CreatorProps {
    onClose: () => void;
    className?: string;
}

export default function CreateTask({className, onClose}: CreatorProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState<boolean>(false);
    const [descError, setDescError] = useState<boolean>(false);

    const createNewTask = useCreateTask();

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        setTitleError(false);
    }
    const handleDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
        setDescError(false);
    }
    const createTask = () => {
        if (title === "" || description === "") {
            if (title ==="") {
                setTitleError(true);
            }
            if (description == "") {
                setDescError(true);
            }
            return;
        }
        createNewTask.mutate({
            title,
            description,
            status: "pending"
        })
        setTitle("");
        setDescription("");
        onClose();
    }
    return (
        <div className={`creat-task ${className}`}>
            <div className={`container ${className}`}>
                <div className={"btm-cnt"}>
                    <h3 className={`title ${titleError ? "error" : ""}`}>Заголовок</h3>
                    <button className={"close-btn"} onClick={onClose}>X</button>
                </div>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Введите текст..."
                    className={"title-input"}
                />
                <h3 className={`desc ${descError ? "error" : ""}`}>Описание</h3>
                <textarea
                    value={description}
                    onChange={handleDescChange}
                    placeholder="Введите текст..."
                    className={"desc-input"}
                />
                <button className={`create ${(title === "" || description === "") ? "nonactive" : ""}`}
                    onClick={createTask}>Добавить</button>
            </div>
        </div>
    )
}
