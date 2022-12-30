import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { TokenData } from '@interfaces/auth.interface';
import { User, UserResponse } from '@interfaces/users.interface';
import { PhoneDTO } from "@dtos/phones.dto";
declare class AuthService {
    users: any;
    findPhone(phone: String): Promise<{
        user: UserResponse;
        message: string;
    }>;
    signup(userData: CreateUserDto): Promise<UserResponse>;
    login(userData: LoginUserDto): Promise<{
        cookie: string;
        findUser: UserResponse;
    }>;
    loginByCode(phone: PhoneDTO): Promise<{
        cookie: string;
        findUser: UserResponse;
    }>;
    logout(userData: LoginUserDto): Promise<UserResponse>;
    createToken(user: User): TokenData;
    createCookie(tokenData: TokenData): string;
}
export default AuthService;
