import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { CatsModule } from "./cats/cats.module";
import { CoreModule } from "./core/core.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [CoreModule, CatsModule, UserModule, AuthModule],
})
export class AppModule {}
