import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Companies } from './companies.model';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

@Module({
	imports: [SequelizeModule.forFeature([Companies])],
	providers: [CompaniesService],
	controllers: [CompaniesController],
})
export class CompaniesModule {}
