import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Users } from './users.model';
import { getModelToken } from '@nestjs/sequelize';
import { CreateUserDto } from './dtos/create-user.dto';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
	let usersService: UsersService;

	const mockSequelizeMethods = {
		findOne: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		destroy: jest.fn(),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [],
			providers: [
				UsersService,
				{
					provide: getModelToken(Users),
					useValue: mockSequelizeMethods,
				},
			],
		}).compile();

		usersService = moduleRef.get(UsersService);
	});

	describe('findAll', () => {
		it('should return an array of users', async () => {
			const result = [{ name: 'John' }];
			mockSequelizeMethods.findAll.mockResolvedValue(result);

			expect(await usersService.findAll()).toBe(result);
			expect(mockSequelizeMethods.findAll).toHaveBeenCalled();
		});
	});

	describe('findOne', () => {
		it('should Return an specific user', async () => {
			const result = { name: 'carlinhos' };
			mockSequelizeMethods.findOne.mockResolvedValue(result);

			expect(await usersService.findOne('1')).toBe(result);
			expect(mockSequelizeMethods.findOne).toHaveBeenCalled();
		});
	});

	describe('create', () => {
		it('should create a user successfully', async () => {
			const newUserInput: CreateUserDto = {
				name: 'Carlinhos',
				birthday_date: new Date().toString(),
				email: 'teste',
				password: '11111',
				password_confirmation: '11111',
			};

			const createdUser = {
				_id: '123',
				...newUserInput,
			};

			mockSequelizeMethods.create.mockResolvedValue(createdUser);
			mockSequelizeMethods.findOne.mockResolvedValue(undefined);

			expect(await usersService.create(newUserInput)).toBe(createdUser);
			expect(mockSequelizeMethods.findOne).toHaveBeenCalled();
			expect(mockSequelizeMethods.create).toHaveBeenCalled();
		});

		it('should fail to create the user since the email already exists', async () => {
			const newUserInput: CreateUserDto = {
				name: 'Carlinhos',
				birthday_date: new Date().toString(),
				email: 'teste',
				password: '11111',
				password_confirmation: '11111',
			};

			mockSequelizeMethods.findOne.mockResolvedValue(true);

			await expect(usersService.create(newUserInput)).rejects.toThrow(
				ConflictException,
			);
		});
	});
});
