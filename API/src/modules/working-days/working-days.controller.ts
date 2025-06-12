import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WorkingDaysService } from './working-days.service';
import { ListAllWorkingDaysDto } from './dto/list-working-days.dto';
import { CreateWorkingDayToUserDto } from './dto/create-working-day-user.dto';

@Controller('working-days')
export class WorkingDaysController {
	constructor(private workingDaysService: WorkingDaysService) {}

	@Get()
	listWorkingDays(@Query() filters: ListAllWorkingDaysDto) {
		return this.workingDaysService.listWorkingDays(filters);
	}

	@Post()
	createWorkingDayToUser(@Body() workingDay: CreateWorkingDayToUserDto) {
		return this.workingDaysService.createWorkingDayToUser(workingDay);
	}
}
