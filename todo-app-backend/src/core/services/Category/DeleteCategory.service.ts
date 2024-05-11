import { IDeleteCategory } from '../../interfaces/category/IDeleteCategory'
import { ICategoryRepository } from '../../repositories/category/ICategoryRepository'
import { UseCase } from '../../useCases/useCase'

export class DeleteCategory implements UseCase<IDeleteCategory , void> {
	constructor ( private readonly categoryRepository: ICategoryRepository ) {}

	async execute ( param: IDeleteCategory ): Promise<void> {
		const { userCategoryId } = param

		await this.categoryRepository.deleteCategory({
			userCategoryId
		})
	}
}
