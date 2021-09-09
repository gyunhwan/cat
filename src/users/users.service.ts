import { Prisma, Users } from '.prisma/client';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOne(username: string): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    delete user.password;
    return user;
  }
  async create(createInput: Prisma.UsersCreateInput): Promise<Users> {
    const existing = await this.prisma.users.findUnique({
      where: { username: createInput.username },
    });
    if (existing) {
      throw new ConflictException('username_already_exists');
    }

    const hashedPassword = await bcrypt.hash(createInput.password, 10);

    const user = await this.prisma.users.create({
      data: { ...createInput, password: hashedPassword },
    });
    delete user.password;
    return user;
  }
}
