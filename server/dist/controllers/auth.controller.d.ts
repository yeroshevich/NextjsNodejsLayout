import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { User, UserResponse } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { PhoneDTO } from "@dtos/phones.dto";
import { RequestWithUser } from "@interfaces/auth.interface";
export declare class AuthController {
    authService: AuthService;
    signUp(userData: CreateUserDto): Promise<{
        data: User;
        message: string;
    }>;
    logIn(res: Response, userData: LoginUserDto): Promise<{
        data: UserResponse;
        message: string;
    }>;
    loginByPhone(phone: PhoneDTO, res: Response): Promise<{
        data: UserResponse;
        message: string;
    }>;
    authUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logOut(req: RequestWithUser, res: Response): Promise<{
        data: LoginUserDto;
        message: string;
    }>;
    checkPhoneExists(phone: PhoneDTO): Promise<{
        user: UserResponse;
        message: string;
    }>;
}
