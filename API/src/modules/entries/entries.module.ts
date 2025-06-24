import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Entries } from './entries.model';
import { WorkingDaysModule } from '../working-days/working-days.module';
import { EntriesController } from './entries.controller';
import { CompaniesModule } from '../companies/companies.module';

@Module({
	imports: [
		SequelizeModule.forFeature([Entries]),
		WorkingDaysModule,
		CompaniesModule,
	],
	controllers: [EntriesController],
	providers: [EntriesService],
})
export class EntriesModule {}
