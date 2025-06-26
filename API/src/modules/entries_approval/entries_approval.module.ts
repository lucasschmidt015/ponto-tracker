import { Module } from '@nestjs/common';
import { EntriesApprovalController } from './entries_approval.controller';
import { EntriesApprovalService } from './entries_approval.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EntriesApproval } from './entries_approval.model';
import { EntriesModule } from '../entries/entries.module';

@Module({
	imports: [SequelizeModule.forFeature([EntriesApproval]), EntriesModule],
	controllers: [EntriesApprovalController],
	providers: [EntriesApprovalService],
})
export class EntriesApprovalModule {}
