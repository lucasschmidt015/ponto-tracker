import { Test } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { getModelToken } from '@nestjs/sequelize';
import { Companies } from './companies.model';
import { ConflictException, NotFoundException } from '@nestjs/common';
import DestroyedResponse from 'src/types/delete.response';

describe('CompaniesService', () => {
	let service: CompaniesService;

	const mockCompaniesModel = {
		findOne: jest.fn(),
		findAll: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		destroy: jest.fn(),
		findByPk: jest.fn(),
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				CompaniesService,
				{
					provide: getModelToken(Companies),
					useValue: mockCompaniesModel,
				},
			],
		}).compile();

		service = moduleRef.get(CompaniesService);

		jest.clearAllMocks();
	});

	describe('findOne', () => {
		it('should return a company by id', async () => {
			const result = { _id: '1', name: 'Company A' };
			mockCompaniesModel.findOne.mockResolvedValue(result);

			expect(await service.findOne('1')).toBe(result);
			expect(mockCompaniesModel.findOne).toHaveBeenCalledWith({
				where: { _id: '1' },
			});
		});
	});

	describe('findAll', () => {
		it('should return all companies', async () => {
			const result = [{ name: 'Company A' }, { name: 'Company B' }];
			mockCompaniesModel.findAll.mockResolvedValue(result);

			expect(await service.findAll()).toBe(result);
			expect(mockCompaniesModel.findAll).toHaveBeenCalledWith({});
		});
	});

	describe('create', () => {
		it('should throw ConflictException if company email already exists', async () => {
			const dto = { name: 'New Co', email: 'existing@email.com' };
			mockCompaniesModel.findOne.mockResolvedValue({ _id: 'x' });

			await expect(service.create(dto as any)).rejects.toThrow(
				ConflictException,
			);
		});

		it('should create and return a new company', async () => {
			const dto = { name: 'New Co', email: 'new@email.com' };
			const createdCompany = { _id: 'uuid', ...dto };

			mockCompaniesModel.findOne.mockResolvedValue(null);
			mockCompaniesModel.create.mockResolvedValue(createdCompany);

			const result = await service.create(dto as any);
			expect(result).toBe(createdCompany);
			expect(mockCompaniesModel.create).toHaveBeenCalledWith(
				expect.objectContaining(dto),
			);
		});
	});

	describe('update', () => {
		it('should update and return affected count and updated companies', async () => {
			const dto = { name: 'Updated Co' };
			const updated = [1, [{ _id: '1', ...dto }]];

			mockCompaniesModel.update.mockResolvedValue(updated as any);

			const result = await service.update('1', dto as any);
			expect(result).toBe(updated);
			expect(mockCompaniesModel.update).toHaveBeenCalledWith(dto, {
				where: { _id: '1' },
				returning: true,
			});
		});
	});

	describe('delete', () => {
		it('should delete a company successfully', async () => {
			const _id = '1';
			mockCompaniesModel.destroy.mockResolvedValue(1);
			mockCompaniesModel.findByPk.mockResolvedValue(true);

			const expectedResult: DestroyedResponse = {
				_id,
				message: `Company with id ${_id} successfully deleted`,
				success: 1,
			};

			const result = await service.delete(_id);
			expect(result).toEqual(expectedResult);
			expect(mockCompaniesModel.destroy).toHaveBeenCalledWith({
				where: { _id },
			});
			expect(mockCompaniesModel.findByPk).toHaveBeenCalledWith(_id);
		});

		it('should throw a NotFoundException since the company was not found', async () => {
			const _id = '1';
			mockCompaniesModel.findByPk.mockResolvedValue(false);

			await expect(service.delete(_id)).rejects.toThrow(NotFoundException);
			expect(mockCompaniesModel.findByPk).toHaveBeenCalled();
		});
	});
});
