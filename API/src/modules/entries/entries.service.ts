import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

import { Entries } from './entries.model';
import { WorkingDays } from '../working-days/working-days.model';

import { WorkingDaysService } from '../working-days/working-days.service';

import { RegisterNewEntryDto } from './dtos/register-new-entry.dto';

@Injectable()
export class EntriesService {
	constructor(
		@InjectModel(Entries) private entries: typeof Entries,
		private workingDay: WorkingDaysService,
	) {}

	async registerUserEntry(entry: RegisterNewEntryDto): Promise<Entries | null> {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const currentWorkingDay: WorkingDays =
			await this.workingDay.createWorkingDayToUser({
				...entry,
				worked_date: today.toDateString(),
			});

		const _id = uuidv4();

		const newEntry = await this.entries.create({
			_id,
			user_id: entry.user_id,
			working_day_id: currentWorkingDay.dataValues._id,
			entry_time: new Date(),
			latitude: entry.latitude || null,
			longitude: entry.longitude || null,
			is_approved: false,
		});

		return newEntry;
	}
}
