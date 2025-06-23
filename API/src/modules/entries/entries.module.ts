import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Entries } from './entries.model';
import { WorkingDaysModule } from '../working-days/working-days.module';
import { EntriesController } from './entries.controller';

@Module({
	imports: [SequelizeModule.forFeature([Entries]), WorkingDaysModule],
	controllers: [EntriesController],
	providers: [EntriesService],
})
export class EntriesModule {}
