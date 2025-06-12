import { IsUUID } from 'class-validator';
export class UpdateWorkingDayTimeDto {
	@IsUUID()
	working_day_id: string;
}
