import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Users extends Model {
	@Column({
		primaryKey: true,
		type: DataType.STRING(36),
	})
	_id: string;

	@Column({
		type: DataType.STRING(255),
	})
	name: string;

	@Column({
		type: DataType.STRING(255),
	})
	email: string;

	@Column({
		type: DataType.DATE,
	})
	birthday_date: Date;

	@Column({
		type: DataType.STRING(255),
	})
	password: string;
}
