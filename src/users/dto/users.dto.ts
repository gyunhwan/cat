import { Users } from ".prisma/client";
import { IsString, Length } from "class-validator";

export class CreateUserDTO {
  @IsString()
  @Length(3, 30)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;

  @IsString()
  @Length(1, 50)
  displayName: string;
  @IsString()
  role;
}
export class AuthRespone {
  token: string;
  user: Users;
}
export class LoginDTO {
  // constructor({ username, password }) {
  //   this.username = username;
  //   this.password = password;
  // }
  @IsString()
  username: string;
  @IsString()
  password: string;
}
