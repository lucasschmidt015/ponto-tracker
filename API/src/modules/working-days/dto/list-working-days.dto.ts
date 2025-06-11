import { IsOptional, IsUUID } from 'class-validator';

export class ListAllWorkingDaysDto {
	@IsOptional()
	@IsUUID()
	user_id: string;

	@IsOptional()
	startDate: Date;

	@IsOptional()
	endDate: Date;
}
