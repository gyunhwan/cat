import { Body, Controller, Post } from "@nestjs/common";
import { AuthRespone, LoginDTO } from "src/users/dto/users.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  async login(@Body() loginInput: LoginDTO): Promise<AuthRespone> {
    return this.authService.login(loginInput);
  }
}
