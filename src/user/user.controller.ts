import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  private readonly users = [];
  @Post()
  async createUser(@Body() body) {
    const { name, email, password } = body;
    const user = { id: Date.now(), name, email, password };
    this.users.push(user);
    return user;
  }
}
