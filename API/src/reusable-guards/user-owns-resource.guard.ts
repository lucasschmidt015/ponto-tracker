import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	Type,
	mixin,
} from '@nestjs/common';
import { Request } from 'express';

export function UserOwnsResourceGuard(property: string): Type<CanActivate> {
	@Injectable()
	class DynamicUserOwnsResourceGuard implements CanActivate {
		canActivate(context: ExecutionContext): boolean {
			const request = context.switchToHttp().getRequest<Request>();
			const bodyValue = request.body?.[property];
			// @ts-ignore
			const userId = request.user?.sub;

			if (!bodyValue || bodyValue !== userId) {
				throw new UnauthorizedException(
					'You are not authorised to access this resource.',
				);
			}

			return true;
		}
	}

	return mixin(DynamicUserOwnsResourceGuard);
}
