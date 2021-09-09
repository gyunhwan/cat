import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthRespone, LoginDTO } from 'src/users/dto/users.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(loginInput: LoginDTO): Promise<AuthRespone> {
    const { username, password } = loginInput;

    const user = await this.prisma.users.findUnique({
      where: { username },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('invalid_password');
    }
    delete user.password;

    return {
      token: this.jwt.sign({ username }),
      user,
    };
  }
}
