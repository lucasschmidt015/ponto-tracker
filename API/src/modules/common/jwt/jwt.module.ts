import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import configs from 'config';

@Global()
@Module({
	imports: [
		JwtModule.register({
			secret: configs.auth.jwt_secret,
			signOptions: { expiresIn: '60s' },
		}),
	],
	exports: [JwtModule],
})
export class JwtConfigModule {}
