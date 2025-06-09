import { Module } from '@nestjs/common';
import { WorkingDaysService } from './working-days.service';

@Module({
	providers: [WorkingDaysService],
})
export class WorkingDaysModule {}
