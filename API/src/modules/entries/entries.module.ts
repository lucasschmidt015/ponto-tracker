import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';

@Module({
	providers: [EntriesService],
})
export class EntriesModule {}
