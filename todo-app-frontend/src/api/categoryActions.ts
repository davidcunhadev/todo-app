import { auth } from "./auth";
import { organizeCategories } from "@/helpers/organizeCategories";
import { apiUrl } from "./apiUrl";
import { ICategory } from "@/interface/category/ICategory";

const {token, userId} = auth()

export async function getCategories(): Promise<ICategory[]> {
        const response = await fetch(`${apiUrl}/category/get`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching categories");
    }

    const data = await response.json();
    const organizedCategories = organizeCategories(data)
    
    return organizedCategories as ICategory[];
}

export async function createCategory(name: string ): Promise<void> {
    const response = await fetch(`${apiUrl}/category/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            name: name.toLocaleLowerCase()
            ,userId }),
    });

    if (!response.ok) {
        throw new Error("Error creating category");
    }
}

export async function updateCategory(userCategoryId: string, name: string ): Promise<void> {
    const response = await fetch(`${apiUrl}/category/update`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            name: name.toLocaleLowerCase(),
            userCategoryId 
            }),
    });

    if (!response.ok) {
        throw new Error("Error updating category");
    }
}

export async function deleteCategory(userCategoryId: string, ): Promise<void> {
    const response = await fetch(`${apiUrl}/category/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userCategoryId }),
    });

    if (!response.ok) {
        throw new Error('Error deleting category');
    }
}