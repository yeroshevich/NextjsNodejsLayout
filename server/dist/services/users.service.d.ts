import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
declare class UserService {
    users: any;
    updateUser(userId: number, userData: CreateUserDto): Promise<User[]>;
}
export default UserService;
