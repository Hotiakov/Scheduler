import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({ username });
  }

  async getUserInfo(id: string) {
    return await this.userModel.findById(id).select('username dayInterval');
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
