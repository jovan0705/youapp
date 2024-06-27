import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User as UserSchema } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { hashPassword, comparePassword } from '../middlewares/bcrypt.middlware';
import { ForbiddenException } from '../exceptions/authFailed.exception';
import { sign } from '../middlewares/jwt.middleware';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      password: await hashPassword(createUserDto.password),
    });
    return createdUser.save();
  }

  async createProfile(createUserDto: CreateUserDto): Promise<User> {
    const createdProfile = this.userModel.findOneAndUpdate(
      { email: createUserDto.email },
      createUserDto,
    );
    return createdProfile;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (Object.keys(user).length === 0) {
      // ini nanti tambahin error auth failed
      throw new ForbiddenException();
    }

    const isVerified = await comparePassword(user.password, loginDto.password);

    if (!isVerified) {
      // ini nanti tambahin error auth failed
      throw new ForbiddenException();
    }

    const token = await sign({ id: user.id, email: user.email });

    return { token };
  }

  async findOne(user): Promise<User> {
    return await this.userModel
      .findOne({ email: user.email })
      .select(['-password']);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
