import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
	findOne(id: string) {
		return {
			id,
			name: 'Richard Lionhart',
			age: 49,
			email: 'teste@teste.com',
		};
	}

	findAll() {
		return [
			{
				id: 1,
				name: 'Richard Lionhart',
				age: 49,
				email: 'teste@teste.com',
			},
			{
				id: 2,
				name: 'Richard Lionhart',
				age: 49,
				email: 'teste@teste.com',
			},
			{
				id: 3,
				name: 'Richard Lionhart',
				age: 49,
				email: 'teste@teste.com',
			},
			{
				id: 4,
				name: 'Richard Lionhart',
				age: 49,
				email: 'teste@teste.com',
			},
			{
				id: 5,
				name: `Luciano's red flag`,
				age: 49,
				email: 'teste@teste.com',
			},
		];
	}

	// We would need to check if it's a good idea to use the dto here
	create(user: CreateUserDto) {
		return user;
	}

	update(id: string, body: UpdateUserDto) {
		return {
			id,
			...body,
		};
	}

	delete(id: string) {
		return {
			id,
		};
	}
}
