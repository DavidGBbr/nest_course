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
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  private readonly users = [];
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() { name, email, password }: CreateUserDTO) {
    return await this.userService.createUser({ name, email, password });
  }

  @Get()
  async getUsers() {
    return this.users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.users.find((user) => user.id === id);
  }

  @Put(':id')
  async updateUser(
    @Body() { name, email, password }: UpdateUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[userIndex] = { ...this.users[userIndex], name, email, password };
    return this.users[userIndex];
  }

  @Patch(':id')
  async updatePartialUser(
    @Body() { name, email, password }: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);

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
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(userIndex, 1);
    return { message: 'User deleted successfully' };
  }
}
