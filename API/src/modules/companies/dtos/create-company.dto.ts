import { IsString, MinLength, IsEmail, IsDateString } from 'class-validator';

export class CreateCompanyDto {
	@IsString()
	@MinLength(1)
	_id: string;

	@IsString()
	@MinLength(1)
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	latitude: string;

	@IsString()
	longitude: string;

	allow_entry_out_range: boolean;

	@IsDateString()
	start_time_morning: string;

	@IsDateString()
	start_time_afternoon: string;

	@IsDateString()
	end_time_morning: string;

	@IsDateString()
	end_time_afternoon: string;
}
