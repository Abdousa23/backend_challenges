import { Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './users.service';
import { RegisterDto } from './dto/create-user.dto';
import { LoginDto } from './dto/update-user.dto';
// getting messages from the gateway and handling them
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @MessagePattern({ cmd: 'LOGIN' })
  login(@Payload() loginDto: LoginDto) {

    return this.userService.login(loginDto);
  }

  @Post()
  @MessagePattern({ cmd: 'REGISTER' })
  register(@Payload() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @MessagePattern({ cmd: 'LOGOUT' })
  logout(@Payload() user) {
    console.log(user);
    return this.userService.logout(user);
  }
  @MessagePattern({ cmd: 'VALIDATE_API_KEY' })
  async validateApiKey(apiKey: string) {
    return this.userService.validateApiKey(apiKey);
  }
  @MessagePattern({ cmd: 'ALL-USERS' })
  async allUsers() {
    return this.userService.allUsers();
  }
}
