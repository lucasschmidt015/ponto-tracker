import configs from 'config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { CompaniesModule } from '../companies/companies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { UserRolesModule } from '../user-roles/user-roles.module';
import { Users } from '../users/users.model';
import { Roles } from '../roles/roles.model';
import { UserRoles } from '../user-roles/user-roles.model';
import { Companies } from '../companies/companies.model';
import { JwtConfigModule } from '../common/jwt/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
	imports: [
		SequelizeModule.forRoot({
			...configs.db,
			models: [Users, Companies, Roles, UserRoles],
		}),
		JwtConfigModule,
		AuthModule,
		UsersModule,
		RolesModule,
		UserRolesModule,
		CompaniesModule,
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
