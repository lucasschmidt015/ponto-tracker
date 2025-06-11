import { IsUUID, IsDateString } from 'class-validator';

export class CreateWorkingDayToUserDto {
	@IsUUID()
	user_id: string;

	@IsUUID()
	company_id: string;

	@IsDateString()
	worked_date: string;
}
