import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.model';

describe('Users Module', () => {
	let usersController: UsersController;
	let usersService: UsersService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService],
		}).compile();

		usersService = moduleRef.get(UsersService);
		usersController = moduleRef.get(UsersController);
	});

	describe('findAll', () => {
		it('should return an array of users', async () => {
			const user = new Users({
				_id: '123123',
				name: 'carlinhos',
				email: 'teste@teste.com',
				birthday_date: new Date('1998-05-15'),
				password: '123123',
			});

			jest.spyOn(usersService, 'findAll').mockResolvedValue([user]);
			expect(await usersController.findAll()).toBe(user);
		});
	});
});
