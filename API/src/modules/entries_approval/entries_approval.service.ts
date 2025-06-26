import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

import { EntriesApproval } from './entries_approval.model';
import { EntriesService } from '../entries/entries.service';

@Injectable()
export class EntriesApprovalService {
	constructor(
		@InjectModel(EntriesApproval)
		private entriesApproval: typeof EntriesApproval,
		private entriesService: EntriesService,
	) {}

	//We don't need to validade the entry_id here because the entry approval is created when the entry is created
	async createEntryApproval(data: {
		entry_id: string;
	}): Promise<EntriesApproval> {
		const entryApproval = await this.entriesApproval.create({
			_id: uuidv4(),
			justificative: null,
			entry_id: data.entry_id,
			approval_user_id: null,
			approval_date: null,
		});
		return entryApproval;
	}

	async approveEntryApproval(
		id: string,
		approval_user_id: string,
		justificative: string, // when we create the dto, we need to add validation for this field
	): Promise<EntriesApproval | null> {
		const entryApproval = await this.entriesApproval.findByPk(id);
		if (!entryApproval) {
			throw new NotFoundException(`Entry approval with ID ${id} not found`);
		}
		entryApproval.approval_user_id = approval_user_id;
		entryApproval.approval_date = new Date();
		entryApproval.justificative = justificative;
		await entryApproval.save();

		const entry = await this.entriesService['entries'].findByPk(
			entryApproval.entry_id,
		);
		if (entry) {
			entry.is_approved = true;
			await entry.save();
		}

		return entryApproval;
	}
}
