import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/users.model';
import { getModelToken } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
	compare: jest.fn(),
}));

describe('AuthService', () => {
	let service: AuthService;

	const mocksUsersService = {
		findByEmail: jest.fn(),
	};

	const mocksJwtService = {
		signAsync: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersService,
					useValue: mocksUsersService,
				},
				{
					provide: JwtService,
					useValue: mocksJwtService,
				},
				{
					provide: getModelToken(Users),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('signIn', () => {
		it('should signIn successfully and return a token ', async () => {
			const user = {
				_id: '123',
				name: 'Lucas',
				password: '123123',
				email: 'teste@teste.com',
				roles: [],
			};
			mocksUsersService.findByEmail.mockResolvedValue(user);
			(bcrypt.compare as jest.Mock).mockResolvedValue(true);
			mocksJwtService.signAsync.mockResolvedValue('this_is_a_very_real_token');

			expect(await service.signIn('teste@teste.com', '123123')).toEqual({
				access_token: 'this_is_a_very_real_token',
			});
			expect(mocksUsersService.findByEmail).toHaveBeenCalledWith(
				'teste@teste.com',
			);
			expect(bcrypt.compare).toHaveBeenCalledWith('123123', user.password);
			expect(mocksJwtService.signAsync).toHaveBeenCalledWith({
				sub: user._id,
				email: user.email,
				roles: user.roles,
			});
		});

		it('should throw a NotFoundException if no account was found', async () => {
			mocksUsersService.findByEmail.mockResolvedValue(null);

			await expect(service.signIn('teste@teste.com', '123123')).rejects.toThrow(
				NotFoundException,
			);
			expect(mocksUsersService.findByEmail).toHaveBeenCalledWith(
				'teste@teste.com',
			);
		});

		it('should throw a UnauthorizedException if the password is invalid', async () => {
			const user = {
				email: 'teste@teste.com',
				password: '12123',
			};
			mocksUsersService.findByEmail.mockResolvedValue(user);
			(bcrypt.compare as jest.Mock).mockResolvedValue(false);

			await expect(service.signIn(user.email, user.password)).rejects.toThrow(
				UnauthorizedException,
			);
			expect(mocksUsersService.findByEmail).toHaveBeenCalledWith(user.email);
			expect(bcrypt.compare).toHaveBeenCalledWith(user.password, user.password);
		});
	});
});
