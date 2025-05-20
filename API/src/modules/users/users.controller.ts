import {
	Controller,
	Post,
	Body,
	Get,
	Param,
	Delete,
	Patch,
	// UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
// import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	// @UseGuards(AuthGuard)
	@Get('/:id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	// @UseGuards(AuthGuard)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Post()
	create(@Body() createUser: CreateUserDto) {
		return this.usersService.create(createUser);
	}

	// @UseGuards(AuthGuard)
	@Patch('/:id')
	update(@Param('id') id: string, @Body() body: UpdateUserDto) {
		return this.usersService.update(id, body);
	}

	// @UseGuards(AuthGuard)
	@Delete('/:id')
	delete(@Param('id') id: string) {
		return this.usersService.delete(id);
	}
}
