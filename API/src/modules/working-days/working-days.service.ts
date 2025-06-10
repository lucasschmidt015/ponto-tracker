import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkingDays } from './working-days.model';
import { CreateWorkingDayToUserDto } from './dto/create-working-day-user.dto';

@Injectable()
export class WorkingDaysService {
	constructor(
		@InjectModel(WorkingDays) private workingDays: typeof WorkingDays,
	) {}

	async createWorkingDayToUser(workingDay: CreateWorkingDayToUserDto) {
		console.log('workingDay <----', workingDay);

		//Check whether the user exists
		//Check Whether the company exists

		//Create the working day.

		//Return the created data
	}
}
