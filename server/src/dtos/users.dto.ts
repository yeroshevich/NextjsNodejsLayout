import {IsNotEmpty, IsString} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  public name:string;
  @IsNotEmpty()
  public surname:string;
  @IsNotEmpty()
  public middleName:string;
  @IsNotEmpty()
  public phoneNumber: string;
  @IsString()
  public password: string;
  @IsString()
  public againstPassword:string
}

export class LoginUserDto{
  @IsNotEmpty()
  public phoneNumber: string;
  @IsString()
  public password: string;
}
