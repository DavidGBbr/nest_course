import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ email, name, password }: CreateUserDTO) {
    return await this.prisma.user.create({ data: { email, name, password } });
  }

  async listUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(
    id: number,
    { email, name, password, birthAt }: UpdateUserDTO,
  ) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
      },
    });
  }

  async updatePartialUser(
    id: number,
    { email, name, password, birthAt }: UpdatePatchUserDTO,
  ) {
    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = password;
    }

    return await this.prisma.user.update({ where: { id }, data });
  }
}
