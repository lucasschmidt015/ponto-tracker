import { IsString, MinLength, IsDateString, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@MinLength(2)
	name: string;

	@IsOptional()
	@IsDateString()
	birthday_date: string;
}
