import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.schema'

@Injectable()
export class AppService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>
  ) { }

  async get(id: string): Promise<User> {
    if (!id) throw new BadRequestException('id must be sent');
    const user: User = await this.userModel.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async delete(id: string): Promise<void> {
    const userExist = await this.userModel.findById(id);
    if (!userExist) throw new NotFoundException();
    await this.userModel.findByIdAndDelete(id);
  }

  async getUsername(username: string): Promise<User> {
    if (!username) throw new BadRequestException('username must be sent');
    const user: User = await this.userModel.findOne({ username });
    if (!user) throw new NotFoundException();
    return user;
  }

  async getEmail(email: string): Promise<User> {
    if (!email) throw new BadRequestException('email must be sent');
    const user: User = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();
    return user;
  }

}
