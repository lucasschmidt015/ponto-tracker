import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EntriesService } from './entries.service';

import { RegisterNewEntryDto } from './dtos/register-new-entry.dto';
import { UserOwnsResourceGuard } from 'src/reusable-guards/user-owns-resource.guard';

@Controller('entries')
export class EntriesController {
	constructor(private entriesService: EntriesService) {}

	@UseGuards(UserOwnsResourceGuard('user_id'))
	@Post()
	registerUserEntry(@Body() entry: RegisterNewEntryDto) {
		return this.entriesService.registerUserEntry(entry);
	}
}
