import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Delete,
	Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Public } from 'src/custom-decorators/public';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get('/:id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Public()
	@Post()
	create(@Body() createUser: CreateUserDto) {
		return this.usersService.create(createUser);
	}

	@Patch('/:id')
	update(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(id, body);
	}

	@Delete('/:id')
	delete(@Param('id') id: string) {
		return this.usersService.delete(id);
	}
}
