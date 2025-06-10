import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { WorkingDaysService } from './working-days.service';
import { WorkingDays } from './working-days.model';

@Module({
	imports: [SequelizeModule.forFeature([WorkingDays])],
	providers: [WorkingDaysService],
})
export class WorkingDaysModule {}
