import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { WorkingDays } from './working-days.model';

import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';

import { CreateWorkingDayToUserDto } from './dto/create-working-day-user.dto';
import { ListAllWorkingDaysDto } from './dto/list-working-days.dto';
import { UpdateWorkingDayTimeDto } from './dto/update-working-day-time.dto';

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
			where.worked_date = {
				[Op.between]: [startDate, endDate],
			};
		} else if (startDate) {
			where.worked_date = {
				[Op.gte]: startDate,
			};
		} else if (endDate) {
			where.worked_date = {
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

		const workingDayAlreadyExists = await this.workingDays.findOne({
			where: {
				user_id: workingDay.user_id,
				worked_date: workingDay.worked_date,
			},
		});

		if (workingDayAlreadyExists) {
			return workingDayAlreadyExists;
		}

		const createdWorkingDay = await this.workingDays.create({
			_id,
			worked_time: 0,
			user_id: user.dataValues._id,
			company_id: company.dataValues._id,
			worked_date: workingDay.worked_date,
		});

		return createdWorkingDay;
	}

	async updateWorkedTime(updateWorkingDay: UpdateWorkingDayTimeDto) {}
}
