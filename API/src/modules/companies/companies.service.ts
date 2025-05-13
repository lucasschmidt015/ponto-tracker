import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Companies } from './companies.model';

@Injectable()
export class CompaniesService {
	constructor(
		@InjectModel(Companies) private companiesModule: typeof Companies,
	) {}
}
