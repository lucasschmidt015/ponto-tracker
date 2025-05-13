import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Delete,
	Patch,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/create-company.dto';

@Controller('companies')
export class CompaniesController {
	constructor(private companiesService: CompaniesService) {}

	@Get('/:id')
	findOne(@Param('id') id: string) {
		return '';
		// return this.companiesService.findOne(id);
	}

	@Get()
	findAll() {
		// return this.companiesService.findAll();
		return '';
	}

	@Post()
	create(@Body() createCompany: CreateCompanyDto) {
		console.log('createCompany <----- ', createCompany);
		return '';
		// return this.companiesService.create(createUser);
	}

	// @Patch('/:id')
	// update(@Param('id') id: string, @Body() body: UpdateUserDto) {
	// 	return this.companiesService.update(id, body);
	// }

	@Delete('/:id')
	delete(@Param('id') id: string) {
		return '';
		// return this.companiesService.delete(id);
	}
}
