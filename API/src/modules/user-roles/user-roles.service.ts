import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRoles } from './user-roles.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { Op } from 'sequelize';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UserRolesService {
	constructor(
		@InjectModel(UserRoles) private userRolesModel: typeof UserRoles,
		private usersService: UsersService,
		private rolesService: RolesService,
	) {}

	findAll(): Promise<UserRoles[]> {
		return this.userRolesModel.findAll({});
	}

	async create(userRole: CreateUserRoleDto): Promise<UserRoles> {
		const _id = uuidv4();

		await this.usersService.findOne(userRole.user_id); //  Looks weard right? But this is validation if the user exists, please do not remove it
		await this.rolesService.findOne(userRole.role_id);

		const roleAlreadyExists = await this.userRolesModel.findOne({
			where: {
				[Op.and]: [
					{ user_id: userRole.user_id },
					{ role_id: userRole.role_id },
				],
			},
		});

		if (roleAlreadyExists) {
			throw new ConflictException('This role already exists.');
		}

		return this.userRolesModel.create({
			_id,
			...userRole,
		});
	}

	delete(_id: string): Promise<number> {
		return this.userRolesModel.destroy({
			where: {
				_id,
			},
		});
	}
}
