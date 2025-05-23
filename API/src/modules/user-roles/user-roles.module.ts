import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { UserRolesService } from './user-roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from './user-roles.model';

@Module({
	imports: [SequelizeModule.forFeature([UserRoles])],
	controllers: [UserRolesController],
	providers: [UserRolesService],
})
export class UserRolesModule {}
