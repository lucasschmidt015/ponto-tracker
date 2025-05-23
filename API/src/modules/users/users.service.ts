import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(@InjectModel(Users) private usersModule: typeof Users) {}

	findOne(_id: string): Promise<Users | null> {
		return this.usersModule.findOne({
			where: {
				_id,
			},
			attributes: { exclude: ['password'] },
		});
	}

	findByEmail(email: string): Promise<Users | null> {
		return this.usersModule.findOne({
			where: {
				email,
			},
			raw: true,
			include: [
				{
					association: 'userRoles',
					include: ['role'],
				},
			],
		});
	}

	findAll(): Promise<Users[]> {
		return this.usersModule.findAll({
			attributes: { exclude: ['password'] },
		});
	}

	async create(user: CreateUserDto): Promise<Users> {
		const _id = uuidv4();

		const userAlreadyExists = await this.usersModule.findOne({
			where: {
				email: user.email,
			},
		});

		if (userAlreadyExists) {
			throw new ConflictException('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(user.password, 10);

		return this.usersModule.create({
			_id,
			...user,
			password: hashedPassword,
		});
	}

	update(_id: string, user: UpdateUserDto): Promise<[number, Users[]]> {
		return this.usersModule.update(user, {
			where: {
				_id,
			},
			returning: true,
		});
	}

	delete(_id: string): Promise<number> {
		return this.usersModule.destroy({
			where: {
				_id,
			},
		});
	}
}
