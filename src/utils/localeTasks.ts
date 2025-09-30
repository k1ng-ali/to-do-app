import type {ToDoType} from "../Types/ToDoType.tsx";

const STORAGE_KEY = "tasks";

export function getLocalTasks(): ToDoType[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveLocalTasks(tasks: ToDoType[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
