import { IsString, MinLength, IsDateString } from 'class-validator';

export class UpdateUserDto {
	@IsString()
	@MinLength(2)
	name: string;

	@IsDateString()
	birthday_date: string;
}
