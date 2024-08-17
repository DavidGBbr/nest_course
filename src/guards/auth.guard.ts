import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers?.authorization;

    if (!authorization) {
      return false;
    }

    try {
      const token = authorization.split(' ')[1];
      if (!token) {
        throw new Error('Token not found');
      }

      const data = this.authService.checkToken(token);
      request.tokenPayload = data;

      request.user = await this.userService.getUserById(data.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
