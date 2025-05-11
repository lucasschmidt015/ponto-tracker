import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Users extends Model {
	@Column({ primaryKey: true })
	_id: string;

	@Column
	name: string;

	@Column
	email: string;

	@Column
	birthdayDate: string;

	@Column
	password: string;
}
