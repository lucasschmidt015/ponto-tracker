import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkingDays } from './working-days.model';
import { CreateWorkingDayToUserDto } from './dto/create-working-day-user.dto';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { ListAllWorkingDaysDto } from './dto/list-working-days.dto';

@Injectable()
export class WorkingDaysService {
	constructor(
		@InjectModel(WorkingDays) private workingDays: typeof WorkingDays,
		private usersService: UsersService,
		private companiesService: CompaniesService,
	) {}

	async listWorkingDays(
		filter: ListAllWorkingDaysDto,
	): Promise<WorkingDays[] | []> {
		const { user_id, startDate, endDate } = filter;

		const where: any = {};

		if (user_id) {
			where.user_id = user_id;
		}

		if (startDate && endDate) {
			where.createdAt = {
				[Op.between]: [startDate, endDate],
			};
		} else if (startDate) {
			where.createdAt = {
				[Op.gte]: startDate,
			};
		} else if (endDate) {
			where.createdAt = {
				[Op.lte]: endDate,
			};
		}

		const workingDaysData = await this.workingDays.findAll({
			where: where,
		});

		return workingDaysData || [];
	}

	async createWorkingDayToUser(
		workingDay: CreateWorkingDayToUserDto,
	): Promise<WorkingDays> {
		const user = await this.usersService.findOne(workingDay.user_id);

		if (!user) {
			throw new NotFoundException(
				`The user with id ${workingDay.user_id} was not found`,
			);
		}

		const company = await this.companiesService.findOne(workingDay.company_id);

		if (!company) {
			throw new NotFoundException(
				`The company with id ${workingDay.company_id} was not found.`,
			);
		}

		const _id = uuidv4();

		console.log('userId: ', user.dataValues._id);
		console.log('companyId: ', company.dataValues._id);

		const createdWorkingDay = await this.workingDays.create({
			_id,
			worked_time: 0,
			user_id: user.dataValues._id,
			company_id: company.dataValues._id,
			worked_date: workingDay.worked_date,
		});

		return createdWorkingDay;
	}
}
