import configs from 'config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users/users.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...configs.db,
      models: [Users],
    }),
    UsersModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
