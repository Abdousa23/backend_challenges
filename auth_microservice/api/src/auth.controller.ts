import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { LoginDto } from "./dto/update-auth.dto";
import { RegisterDto } from "./dto/create-auth.dto";
import { ClientProxy } from "@nestjs/microservices";
import { Req } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

// sending requests to user service using cmds
@Controller('auth')
export class AuthController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) { }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return this.client.send({ cmd: 'LOGIN' }, payload)
  }

  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return this.client.send({ cmd: 'REGISTER' }, payload)
  }
  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Req() request) {
    const user = request.user;
    return this.client.send({ cmd: 'LOGOUT' }, user);
  }
  @UseGuards(AuthGuard)
  @Get('users')
  async users() {
    return this.client.send({ cmd: 'ALL-USERS' }, {});
  }
}