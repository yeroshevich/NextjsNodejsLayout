import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
export declare class UsersController {
    userService: userService;
    updateUser(userId: number, userData: CreateUserDto): Promise<{
        data: User[];
        message: string;
    }>;
}
