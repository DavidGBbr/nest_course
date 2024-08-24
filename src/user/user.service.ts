import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return await this.prisma.user.create({ data });
  }

  async listUsers() {
    return await this.prisma.user.findMany();
  }

  async getUserById(id: number) {
    await this.userExists(id);
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(
    id: number,
    { email, name, password, birthAt, role }: UpdateUserDTO,
  ) {
    await this.userExists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    return await this.prisma.user.update({
      where: { id },
      data: {
        email,
        name,
        password,
        birthAt: birthAt ? new Date(birthAt) : null,
        role,
      },
    });
  }

  async updatePartialUser(
    id: number,
    { email, name, password, birthAt, role }: UpdatePatchUserDTO,
  ) {
    await this.userExists(id);

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
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }

    if (role) {
      data.role = role;
    }

    return await this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    await this.userExists(id);

    return this.prisma.user.delete({ where: { id } });
  }

  async userExists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
}
