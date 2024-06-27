import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ForbiddenException } from '../exceptions/authFailed.exception';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    return newUser;
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.usersService.login(loginDto);
    return token;
  }

  @UseGuards(AuthGuard)
  @Put('/createProfile')
  async createProfile(@Request() req, @Body() createUserDto: CreateUserDto) {
    if (req.user.email !== createUserDto.email) {
      throw new ForbiddenException();
    }
    const updatedUser = await this.usersService.createProfile(createUserDto);
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Get('/getProfile')
  async getProfile(@Request() req) {
    const users = await this.usersService.findOne(req.user);
    return users;
  }

  @UseGuards(AuthGuard)
  @Put('/updateProfile')
  async updateProfile(@Request() req, @Body() createUserDto: CreateUserDto) {
    if (req.user.email !== createUserDto.email) {
      throw new ForbiddenException();
    }
    const updatedUser = await this.usersService.createProfile(createUserDto);
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Get('/allUsers')
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }
}
