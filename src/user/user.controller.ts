import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Get()
  async getUsers() {
    return this.users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.users.find((user) => user.id === Number(id));
  }
}
