import { IGetCategoriesResponse } from '../../../../core/interfaces/category/IGetCategoriesResponse'

interface Category {
  id: string ,
  userId: string ,
  categoryId: string ,
  createdAt: Date ,
  updatedAt: Date ,
  category: {
    id: string ,
    name: string ,
    createdAt: Date ,
    updatedAt: Date
  }
}

export class CategoryFormatHelper {
	static format ( UserCategory: Category[] ): IGetCategoriesResponse[] {
		return UserCategory.map( ( category ) => ({
			id   : category.id ,
			name : category.category.name ,
		}) )
	}
}
