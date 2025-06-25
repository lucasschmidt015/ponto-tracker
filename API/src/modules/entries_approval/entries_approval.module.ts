import { Module } from '@nestjs/common';
import { EntriesApprovalController } from './entries_approval.controller';
import { EntriesApprovalService } from './entries_approval.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { EntriesApproval } from './entries_approval.model';

@Module({
	imports: [SequelizeModule.forFeature([EntriesApproval])],
	controllers: [EntriesApprovalController],
	providers: [EntriesApprovalService],
})
export class EntriesApprovalModule {}
