import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator copy';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return await this.userService.createUser(data);
  }

  @Roles(Role.Admin)
  @Get()
  async getUsers() {
    return this.userService.listUsers();
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getUserById(@ParamId() id: number) {
    return this.userService.getUserById(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async updateUser(@Body() data: UpdateUserDTO, @ParamId() id: number) {
    return this.userService.updateUser(id, data);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartialUser(
    @Body() data: UpdatePatchUserDTO,
    @ParamId() id: number,
  ) {
    return this.userService.updatePartialUser(id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUser(@ParamId() id: number) {
    return this.userService.deleteUser(id);
  }
}
