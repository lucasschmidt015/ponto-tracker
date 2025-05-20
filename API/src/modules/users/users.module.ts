import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';

@Module({
	imports: [SequelizeModule.forFeature([Users])],
	providers: [
		UsersService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
