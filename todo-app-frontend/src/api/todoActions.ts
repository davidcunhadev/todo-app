import { auth } from "./auth";
import { apiUrl } from "./apiUrl";
import { ICreateTodo } from "@/interface/todo/ICreateTodo";
import { ITodo } from "@/interface/todo/ITodo";

const {token,userId} = auth()

export async function createTodo({title,description,category}: ICreateTodo): Promise<void> {
    const response = await fetch(`${apiUrl}/todo/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, title, description, category }),
    });

    if (!response.ok) {
        throw new Error("Error creating todo");
    }
}

export async function getTodos( search: string, ): Promise<ITodo[]> {
    const searchValue = search === 'todas' ? '' : search
    const response = await fetch(`${apiUrl}/todo/get?category=${searchValue}`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching todos');
    }

    const data = await response.json();
    const uncompletedTodos = data.filter((todo: ITodo) => !todo.completed )	
    return uncompletedTodos;
}

export async function getImportantsTodos(): Promise<ITodo[]> {
    const response = await fetch(`${apiUrl}/todo/important`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching todos');
    }

    const data = await response.json();
    return data as ITodo[];
}

export async function getCompletedTodos(): Promise<ITodo[]> {
    const response = await fetch(`${apiUrl}/todo/completed`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching todos');
    }

    const data = await response.json();
    return data as ITodo[];
}

export async function getTodoById(todoId:string): Promise<ITodo> {
    const response = await fetch(`${apiUrl}/todo/${todoId}`, {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    if (!response.ok) {
        throw new Error('Error fetching todos');
    }

    const data = await response.json();
    return data as ITodo;
}

type UpdateTodo = {
    id: string,
    title: string,
    description: string,
    category: string,
}
export async function updateTodo({id,title,description,category}:UpdateTodo): Promise<void> {
    const response = await fetch(`${apiUrl}/todo/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, title, description, category }),
    });

    if (!response.ok) {
        throw new Error("Error updating todo");
    }
}

export type AddImportant = {
    id: string,
    important: boolean
}

export async function addImportant({id, important}: AddImportant): Promise<void> {
    const response = await fetch(`${apiUrl}/todo/important`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, important }),
    });

    if (!response.ok) {
        throw new Error("Error updating todo");
    }
}

export type AddCompleted = {
    id: string,
    completed: boolean
}

export async function addCompleted({id, completed}: AddCompleted): Promise<void> {
    const response = await fetch(`${apiUrl}/todo/completed`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, completed }),
    });

    if (!response.ok) {
        throw new Error("Error updating todo");
    }
}


export async function deleteTodo(id: string, ): Promise<void> {
    const response = await fetch(`${apiUrl}/todo/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
    });

    if (!response.ok) {
        throw new Error('Error deleting todo');
    }
}

