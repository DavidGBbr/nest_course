import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

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

  @Put(':id')
  async updateUser(@Body() body, @Param('id') id: string) {
    const { name, email, password } = body;
    const userIndex = this.users.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex] = { ...this.users[userIndex], name, email, password };
    return this.users[userIndex];
  }

  @Patch(':id')
  async updatePartialUser(@Body() body, @Param('id') id: string) {
    const { name, email, password } = body;
    const userIndex = this.users.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (name) {
      this.users[userIndex].name = name;
    }

    if (email) {
      this.users[userIndex].email = email;
    }

    if (password) {
      this.users[userIndex].password = password;
    }

    const updatedUser = { ...this.users[userIndex], name, email, password };
    this.users[userIndex] = updatedUser;

    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
    return { message: 'User deleted successfully' };
  }
}
