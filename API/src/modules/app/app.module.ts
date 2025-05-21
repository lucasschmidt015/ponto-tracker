import configs from 'config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Users } from '../users/users.model';
import { Companies } from '../companies/companies.model';
import { JwtConfigModule } from '../common/jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
	imports: [
		SequelizeModule.forRoot({
			...configs.db,
			models: [Users, Companies],
		}),
		JwtConfigModule,
		UsersModule,
		CompaniesModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AppModule {}
