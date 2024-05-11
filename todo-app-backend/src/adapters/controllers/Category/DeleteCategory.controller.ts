import { Request , Response } from 'express'
import { DeleteCategory } from '../../../core/services/Category'

export class DeleteCategoryController {
	constructor ( private useCase: DeleteCategory ) {}

	async deleteCategory ( req: Request , res: Response ) {
		const { userCategoryId } = req.body

		await this.useCase.execute({
			userCategoryId
		})

		res.status( 204 ).end()
	}
}
