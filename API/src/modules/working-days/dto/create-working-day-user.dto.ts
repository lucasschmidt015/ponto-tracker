import { IsString, MinLength, IsUUID } from 'class-validator';

export class CreateWorkingDayToUserDto {
	@IsString()
	@MinLength(2)
	_id: string;

	@IsUUID()
	user_id: string;

	@IsUUID()
	company_id: string;
}
