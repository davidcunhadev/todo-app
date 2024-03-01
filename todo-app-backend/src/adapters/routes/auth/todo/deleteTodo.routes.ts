import { Router , Request , Response } from 'express'
import { todoRepository } from '../../../../external/prisma/repositories/todo/TodoRepository'
import { DeleteTodoService } from '../../../../core/services/Todo/deleteTodoService'
import { DeleteTodoController } from '../../../controllers/Todo/deleteTodoController'

const deleteTodoService = new DeleteTodoService( todoRepository )
const deleteTodoController = new DeleteTodoController( deleteTodoService )
const deleteTodoRoutes = Router()

deleteTodoRoutes.delete( '/' ,
	( req:Request , res:Response ) => deleteTodoController.deleteTodo( req , res ) )

export { deleteTodoRoutes }