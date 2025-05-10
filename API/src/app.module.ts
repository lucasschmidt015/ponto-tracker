import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users/users.model';

import configs from 'config';

console.log('configs <----- ', configs);

@Module({
  imports: [
    SequelizeModule.forRoot({
      // Hey hacker, this is fake database properties 🥹
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'ponto-tracker',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      models: [Users],
    }),
    UsersModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
