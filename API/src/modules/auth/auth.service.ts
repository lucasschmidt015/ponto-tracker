import {
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, password: string): Promise<any> {
		const user = await this.usersService.findByEmail(email);

		if (!user) {
			throw new NotFoundException(
				'No account was found with the provided email.',
			);
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			user.dataValues.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user._id, email: user.email };

		const token = await this.jwtService.signAsync(payload);

		return {
			access_token: token,
		};
	}
}
