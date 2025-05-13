import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Companies extends Model {
	@Column({ primaryKey: true })
	_id: string;

	@Column
	name: string;

	@Column
	email: string;

	@Column
	latitude: string;

	@Column
	longitude: string;

	@Column
	allow_entry_out_range: boolean;

	@Column({
		type: DataType.DATE,
	})
	start_time_morning: Date;

	@Column({
		type: DataType.DATE,
	})
	start_time_afternoon: Date;

	@Column({
		type: DataType.DATE,
	})
	end_time_morning: Date;

	@Column({
		type: DataType.DATE,
	})
	end_time_afternoon: Date;
}
