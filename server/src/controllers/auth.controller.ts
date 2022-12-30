import {Request, Response} from 'express';
import { Controller, Req, Body, Post, UseBefore, HttpCode, Res } from 'routing-controllers';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import {User, UserResponse} from '@interfaces/users.interface';
import authMiddleware from '@middlewares/auth.middleware';
import { validationMiddleware } from '@middlewares/validation.middleware';
import AuthService from '@services/auth.service';
import authService from "@services/auth.service";
import {PhoneDTO} from "@dtos/phones.dto";
import {RequestWithUser} from "@interfaces/auth.interface";

@Controller()
export class AuthController {
  public authService = new AuthService();

  @Post('/signup')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @HttpCode(201)
  async signUp(@Body() userData: CreateUserDto) {
    const signUpUserData: User = await this.authService.signup(userData);
    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/login')
  @UseBefore(validationMiddleware(LoginUserDto, 'body'))
  async logIn(@Res() res: Response, @Body() userData: LoginUserDto) {
    const { cookie, findUser } = await this.authService.login(userData);
    res.setHeader('Set-Cookie', [cookie]);
    return { data: findUser, message: 'login' };
  }
  @Post('/loginByPhone')
  @UseBefore(validationMiddleware(PhoneDTO,'body'))
  async loginByPhone(@Body() phone:PhoneDTO,@Res() res:Response){
    const {cookie,findUser} = await this.authService.loginByCode(phone)
    res.setHeader('Set-Cookie',[cookie])
    return {data:findUser,message:'loginByPhone'}
  }

  @Post('/auth')
  @UseBefore(authMiddleware)
  async authUser(@Req() req:Request,@Res() res:Response){
    console.log(req.cookies)
    return res.end()
  }

  @Post('/logout')
  @UseBefore(authMiddleware)
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    const userData: LoginUserDto = await req.user;
    const logOutUserData: LoginUserDto = await this.authService.logout(userData);

    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    return { data: logOutUserData, message: 'logout' };
  }
  @Post('/userphone')
  @UseBefore(validationMiddleware(PhoneDTO,'body'))
  async checkPhoneExists(@Body() phone:PhoneDTO) {
    const findResult = await this.authService.findPhone(phone.phone)
    return {user:findResult.user,message:findResult.message}
  }
}
