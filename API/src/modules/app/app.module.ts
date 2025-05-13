import configs from 'config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../users/users.model';
import { Companies } from '../companies/companies.model';

@Module({
	imports: [
		SequelizeModule.forRoot({
			...configs.db,
			models: [Users, Companies],
		}),
		UsersModule,
		CompaniesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
