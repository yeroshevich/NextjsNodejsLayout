import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import {User  as Users} from '@database/database'
import { isEmpty } from '@utils/util';

class UserService {
  public users = Users

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
    return null
  }

}

export default UserService;
