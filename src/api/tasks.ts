import type {ToDoType} from "../Types/ToDoType.tsx";
import {api} from "./axios.ts"

export async function fetchTasks(): Promise<ToDoType[]> {
    const res = await api.get('todo/', {
        withCredentials: true
    });
    return res.data;
}

export async function addTask(task: Omit<ToDoType, "id">): Promise<ToDoType> {
    const res = await api.post('todo/', task, {
        withCredentials: true
    })
    return res.data;
}

export async function updateTask(id:number, updates: Partial<ToDoType>): Promise<ToDoType> {
    const res = await api.patch(`todo/${id}/`, updates, {
        withCredentials: true,
    });
    return res.data;
}

export async function deleteTask(id:number): Promise<void> {
    await api.delete(`todo/${id}/`, {
        withCredentials: true,
    });
}

