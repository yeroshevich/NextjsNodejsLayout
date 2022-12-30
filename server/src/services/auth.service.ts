import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import {CreateUserDto, LoginUserDto} from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User,UserResponse } from '@interfaces/users.interface';
import {Role, User as UserRepository} from '@database/database';
import { isEmpty } from '@utils/util';
import {RoleInterface} from "@interfaces/role.interface";
import {PhoneDTO} from "@dtos/phones.dto";

class AuthService {
  public users = UserRepository;

  public async findPhone(phone:String):Promise<{user:UserResponse,message:string}>{
    const user = await this.users.findOne(
      {
        where:{phoneNumber:phone}
      })
    return {user,message:user?'User is exist':'User not found'}
  }

  public async signup(userData: CreateUserDto): Promise<UserResponse> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");
    const findUser: User = await this.users.findOne({
        where:{phoneNumber:userData.phoneNumber},raw:true
    });
    if (findUser) throw new HttpException(409, `This phone ${userData.phoneNumber} already exists`);

    const hashedPassword = await hash(userData.password, 10);

    const role:RoleInterface = await Role.findOne({
      where:{title:"USER_ROLE"}
    })

    const createUserData: UserResponse = {...userData, password: hashedPassword,role:role.title };

    await this.users.create({...createUserData,roleId:role.idRole})

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; findUser: UserResponse }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser = await this.users.findOne({
      where:{phoneNumber:userData.phoneNumber},raw:true
    });
    if (!findUser) throw new HttpException(409, `This phone ${userData.phoneNumber} was not found`);


    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

    const role:RoleInterface =await Role.findByPk(findUser.roleId)

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);


    return { cookie, findUser:{password:findUser.password,phoneNumber:findUser.phoneNumber,name:findUser.name,middleName:findUser.middleName,surname:findUser.surname,role:role.title}};
  }
  public async loginByCode(phone:PhoneDTO): Promise<{ cookie: string; findUser: UserResponse }>{
    if (isEmpty(phone)) throw new HttpException(400, "userData is empty");

    const findUser = await this.users.findOne({
      where:{phoneNumber:phone.phone},raw:true
    });
    if (!findUser) throw new HttpException(409, `This phone ${phone.phone} was not found`);
    const role:RoleInterface =await Role.findByPk(findUser.roleId)

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser:{password:findUser.password,phoneNumber:findUser.phoneNumber,name:findUser.name,middleName:findUser.middleName,surname:findUser.surname,role:role.title}};

  }
  public async logout(userData: LoginUserDto): Promise<UserResponse> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: UserResponse = await this.users.findOne({
        where:{phoneNumber:userData.phoneNumber},raw:true
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { idUser: user.idUser };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60*60 * 3;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

}

export default AuthService;
