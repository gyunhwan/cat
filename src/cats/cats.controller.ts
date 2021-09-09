import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/user/user.decorator";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";
// @UseGuards(AuthGuard("jwt"))
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  // @UseGuards(RolesGuard)
  // @Roles("admin")
  // @SetMetadata("roles", ["admin"])
  async create(@Body("cat") createCatDto: CreateCatDto, @User() user) {
    console.log(user);
    return this.catsService.create(createCatDto);
  }
  // @UseGuards(RolesGuard)
  // @Roles("admin")
  // @SetMetadata("roles", ["admin"])
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    // get by ID logic
  }
}
