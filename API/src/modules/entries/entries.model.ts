import {
	Column,
	Model,
	Table,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';

import { WorkingDays } from '../working-days/working-days.model';

@Table
export class Entries extends Model {
	@Column({
		primaryKey: true,
		type: DataType.STRING(36),
	})
	_id: string;

	@Column({
		type: DataType.TIME,
		allowNull: false,
	})
	entry_time: string;

	@Column({
		type: DataType.STRING(50),
	})
	latitude: string;

	@Column({
		type: DataType.STRING(50),
	})
	longitude: string;

	@ForeignKey(() => WorkingDays)
	@Column({
		type: DataType.STRING(36),
		allowNull: false,
	})
	working_day_id: string;

	@BelongsTo(() => WorkingDays)
	working_day: WorkingDays;
}
