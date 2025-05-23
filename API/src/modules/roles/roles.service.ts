import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from './roles.model';
import { CreateRoleDto } from './dtos/create-role.dto';
import { v4 as uuidv4 } from 'uuid';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class RolesService {
	constructor(@InjectModel(Roles) private rolesModel: typeof Roles) {}

	findOne(_id: string): Promise<Roles | null> {
		return this.rolesModel.findOne({
			where: {
				_id,
			},
		});
	}

	findAll(): Promise<Roles[]> {
		return this.rolesModel.findAll({});
	}

	async create(role: CreateRoleDto): Promise<Roles> {
		const _id = uuidv4();

		const roleAlreadyExists = await this.rolesModel.findOne({
			where: {
				name: role.name,
			},
		});

		if (roleAlreadyExists) {
			throw new ConflictException('This role already exists.');
		}

		return this.rolesModel.create({
			_id,
			...role,
		});
	}

	update(_id: string, user: CreateRoleDto): Promise<[number, Roles[]]> {
		return this.rolesModel.update(user, {
			where: {
				_id,
			},
			returning: true,
		});
	}

	delete(_id: string): Promise<number> {
		return this.rolesModel.destroy({
			where: {
				_id,
			},
		});
	}
}
