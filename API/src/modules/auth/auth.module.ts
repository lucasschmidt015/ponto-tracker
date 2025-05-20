import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import configs from 'config';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: configs.auth.jwt_secret,
			signOptions: { expiresIn: '1h' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
