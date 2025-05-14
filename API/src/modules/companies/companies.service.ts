import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Companies } from './companies.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { UpdateCompanyDto } from './dtos/update-company.dto';

@Injectable()
export class CompaniesService {
	constructor(
		@InjectModel(Companies) private companiesModule: typeof Companies,
	) {}

	findOne(_id: string): Promise<Companies | null> {
		return this.companiesModule.findOne({
			where: {
				_id,
			},
		});
	}

	findAll(): Promise<Companies[]> {
		return this.companiesModule.findAll({});
	}

	async create(company: CreateCompanyDto): Promise<Companies> {
		const _id = uuidv4();

		const companyAlreadyExists = await this.companiesModule.findOne({
			where: {
				email: company.email,
			},
		});

		if (companyAlreadyExists) {
			throw new ConflictException('Email already in use');
		}

		return this.companiesModule.create({
			_id,
			...company,
		});
	}

	update(
		_id: string,
		company: UpdateCompanyDto,
	): Promise<[number, Companies[]]> {
		return this.companiesModule.update(company, {
			where: {
				_id,
			},
			returning: true,
		});
	}

	delete(_id: string) {
		return this.companiesModule.destroy({
			where: {
				_id,
			},
		});
	}
}
