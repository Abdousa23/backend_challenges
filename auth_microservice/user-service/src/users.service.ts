import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/create-user.dto';
import { LoginDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private User: Model<User>
  ) { }
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto
    try {
      if (!username || !password) {
        return new BadRequestException('username and password are required')
      }
      const user = await this.User.findOne({ username: username })
      if (!user) {
        return new NotFoundException('user not found')
      }
      const passwordMatch = bcrypt.compareSync(password, user.password)
      if (!passwordMatch) {
        return new BadRequestException('invalid password')
      }
      const apiKey = this.generateAPIKey()
      user.apiKey = apiKey
      await user.save()
      return { apiKey: user.apiKey };
    } catch (error) {
      return new InternalServerErrorException(error)

    }
  }

  async register(registerDto: RegisterDto) {
    console.log(registerDto)
    const { email, username, password, confirmPassword } = registerDto
    try {
      if (password !== confirmPassword) {
        throw new BadRequestException('passwords do not match')
      }
      const found = await this.User.findOne({ email: email })
      console.log(found)
      if (found) {
        return new BadRequestException('email already exists')
      }
      const foundUsername = await this.User.findOne({ username: username })
      if (foundUsername) {
        return new BadRequestException('username already exists')
      }
      const hashedPassword = bcrypt.hashSync(password, 10)
      registerDto.password = hashedPassword
      const apiKey = this.generateAPIKey()
      const newUser = new this.User({ ...registerDto, apiKey: apiKey })
      await newUser.save()
      console.log(newUser)

      return newUser;
    } catch (error) {
      return new InternalServerErrorException(error)
    }
  }

  async logout(user: User) {
    try {
      await this.User.updateOne({ _id: user._id }, { apiKey: null })
      return 'user logged out'
    } catch (error) {
      return new InternalServerErrorException(error)
    }
  }

  generateAPIKey() {
    const ApiKey = randomBytes(20).toString('hex');
    return ApiKey;
  }
  async validateApiKey(apiKey: string): Promise<User | null> {
    const user = await this.User.findOne({ apiKey })
    if (!user) {
      console.log('no api key')
      return null;
    }
    return user;
  }
  async allUsers() {
    const users = await this.User.find()
    return users
  }

}
