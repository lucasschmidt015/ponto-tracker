import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign_in.dto';

describe('AuthController', () => {
	let controller: AuthController;
	let mockAuthService: { signIn: jest.Mock };

	beforeEach(async () => {
		mockAuthService = {
			signIn: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: mockAuthService,
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('signIn', () => {
		it('should call authService.signIn with correct parameters and return the token', async () => {
			const dto: SignInDto = {
				email: 'teste@teste.com',
				password: '123123',
			};
			const expectedResult = { access_token: 'mocked_token' };

			mockAuthService.signIn.mockResolvedValue(expectedResult);

			const result = await controller.signIn(dto);

			expect(mockAuthService.signIn).toHaveBeenCalledWith(
				dto.email,
				dto.password,
			);
			expect(result).toEqual(expectedResult);
		});
	});
});
