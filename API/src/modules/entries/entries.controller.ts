import { Controller, Post, Body } from '@nestjs/common';
import { EntriesService } from './entries.service';

import { RegisterNewEntryDto } from './dtos/register-new-entry.dto';
import { Public } from 'src/custom-decorators/public';

@Controller('entries')
export class EntriesController {
	constructor(private entriesService: EntriesService) {}

	@Public() // Temporary <-----
	@Post()
	registerUserEntry(@Body() entry: RegisterNewEntryDto) {
		return this.entriesService.registerUserEntry(entry);
	}
}
