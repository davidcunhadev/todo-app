/* eslint-disable max-lines-per-function */
import { PrismaClient } from '../../../../node_modules/.prisma/client/index'
import { users } from './data/users.seed'

const prisma = new PrismaClient()

async function seeedDatabase () {
	const defaultUserCategories = [ 'todas' , 'importantes' ]
	try {
		const createUsers = await prisma.user.create({
			data : users
		})

		defaultUserCategories.forEach( async ( category ) => {
			await prisma.userCategory.create({
				data : {
					category : {
						connectOrCreate : {
							where : {
								name : category
							} ,
							create : {
								name : category
							} ,
						} ,
					} ,
					user : {
						connect : {
							id : users.id ,
						} ,
					} ,
				} ,
			})
		}
		)

		console.log( 'Usuários cadastrados' , createUsers )

		await prisma.$disconnect()
	} catch ( error ) {
		console.error( error )

		await prisma.$disconnect()

		process.exit( 1 )
	}
}

seeedDatabase()
