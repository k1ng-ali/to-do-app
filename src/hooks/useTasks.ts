import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import * as api from "../api/tasks"
import * as local from "../utils/localeTasks"
import type {ToDoType} from "../Types/ToDoType.tsx";

export const useGetTasks = () => {
    return useQuery<ToDoType[], Error>({
        queryKey: ["tasks"],
        queryFn: async () => {
            try {
                const data = await api.fetchTasks();
                local.saveLocalTasks(data);
                return data;
            } catch {
                return local.getLocalTasks();
            }
        },
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<ToDoType, Error, Omit<ToDoType, "id">, unknown>({
        mutationKey: ["tasks"],
        mutationFn: async (data) => {
            try {
                const created = await api.addTask(data);
                const ldata = local.getLocalTasks();
                local.saveLocalTasks([...ldata, created]);
                return created;
            } catch {
                const ldata = local.getLocalTasks();
                const fakeId = Date.now();
                const newTask = { ...data, id: fakeId };
                local.saveLocalTasks([...ldata, newTask]);
                return newTask;
            }
        },
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["tasks"]});}
    });

};


export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation<void, Error, number>({
        mutationKey: ["tasks"],
        mutationFn: async (id: number) => {
            try {
                await api.deleteTask(id);
                const ldata = local.getLocalTasks();
                local.saveLocalTasks(ldata.filter(task => task.id !== id));
            } catch  {
                const ldata = local.getLocalTasks();
                local.saveLocalTasks(ldata.filter(task => task.id !== id));
            }
        },
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["tasks"]});}
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation<ToDoType, Error, ToDoType>({
        mutationKey: ["tasks"],
        mutationFn: async (task) => {
            try {
                const updated = await api.updateTask(task.id, task); // <-- предполагаем, что API возвращает ToDoType
                const ldata = local.getLocalTasks().filter(t => t.id !== task.id);
                local.saveLocalTasks([...ldata, updated]);
                return updated;
            } catch {
                const ldata = local.getLocalTasks().filter(t => t.id !== task.id);
                local.saveLocalTasks([...ldata, task]);
                return task; //
            }
        },
        onSuccess: () => {queryClient.invalidateQueries({queryKey: ["tasks"]});}
    })
}
