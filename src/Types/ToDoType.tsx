export interface ToDoType {
    id: number;
    title: string;
    description: string;
    status: "pending" | "inProgress" | "done";
}