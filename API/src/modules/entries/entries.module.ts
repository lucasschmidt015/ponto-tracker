import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Entries } from './entries.model';

@Module({
	imports: [SequelizeModule.forFeature([Entries])],
	providers: [EntriesService],
})
export class EntriesModule {}
