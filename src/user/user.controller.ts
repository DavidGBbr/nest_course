import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator copy';

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() { name, email, password }: CreateUserDTO) {
    return await this.userService.createUser({ name, email, password });
  }

  @Get()
  async getUsers() {
    return this.userService.listUsers();
  }

  @Get(':id')
  async getUserById(@ParamId() id: number) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(@Body() data: UpdateUserDTO, @ParamId() id: number) {
    return this.userService.updateUser(id, data);
  }

  @Patch(':id')
  async updatePartialUser(
    @Body() data: UpdatePatchUserDTO,
    @ParamId() id: number,
  ) {
    return this.userService.updatePartialUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@ParamId() id: number) {
    return this.userService.deleteUser(id);
  }
}
