import { Users } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() input: CreateUserDTO): Promise<Users> {
    return this.usersService.create(input);
  }
  @Get(':username')
  async findOne(@Param('username') username: string): Promise<Users> {
    return this.usersService.findOne(username);
  }
}
