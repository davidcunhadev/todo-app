import { z } from 'zod'

export const createTodoValues = {
    title: '',
    description: '',
    category: ''
}

export const CreateTodoSchema = z.object({
    title: z.string().min(6),
    description: z.string(),
    category: z.string(),
})
