import { PrismaClient } from '@prisma/client'
import { ITodoRepository } from '../../../../core/repositories/todo/ITodoRepository'

import { ICreateTodo } from '../../../../core/interfaces/Todo/ICreateTodo'
import { ITodo } from '../../../../core/interfaces/Todo/ITodo'
import { IGetTodos } from '../../../../core/interfaces/Todo/IGetTodos'
import { TodoFormatHelper } from '../../helpers/TodoFormatHelper'
import { IUpdateTodo } from '../../../../core/interfaces/Todo/IUpdateTodo'
import { IDeleteTodo } from '../../../../core/interfaces/Todo/IDeleteTodo'

export class TodosRepository implements ITodoRepository {
	protected prisma: PrismaClient
	constructor () {
		this.prisma = new PrismaClient()
	}

	async createTodo ( params: ICreateTodo ): Promise<void> {
		const { title , description , userId , category } = params

		const existingCategory = await this.prisma.category.findUnique({
			where : {
				name : category
			}
		})

		const todo = await this.prisma.todo.create({
			data : {
				title ,
				description ,
				userId ,
			}
		})

		if ( existingCategory ) {
			await this.prisma.todoCategory.create({
				data : {
					categoryId : existingCategory.id ,
					todoId     : todo.id
				}
			})
		}
	}

	async getTodos ( params: IGetTodos ): Promise<ITodo[]> {
		const { userId , category } = params

		const existingCategory = await this.prisma.category.findUnique({
			where : {
				name : category
			}
		})

		const todos = await this.prisma.todo.findMany({
			where : {
				userId ,
				TodoCategory : existingCategory ? {
					some : {
						categoryId : existingCategory.id
					}
				} : undefined
			} ,
			include : {
				TodoCategory : {
					select : {
						category : true
					}
				}
			}
		})

		return TodoFormatHelper.format( todos || [] )
	}

	async updateTodo ( params: IUpdateTodo ): Promise<void> {
		const { title , description , category , id } = params
		const categoryExists = await this.prisma.category.findUnique({
			where : {
				name : category
			}
		})

		await this.prisma.todo.update({
			where : {
				id
			} ,
			data : {
				title ,
				description ,
				TodoCategory : {
					update : {
						where : {
							todoId : id
						} ,
						data : {
							categoryId : categoryExists?.id
						}
					}
				}
			}
		})
	}

	async deleteTodo ( params: IDeleteTodo ): Promise<void> {
		const { id } = params

		await this.prisma.todo.delete({
			where : {
				id
			}
		})
	}
}

export const todosRepository = new TodosRepository()
