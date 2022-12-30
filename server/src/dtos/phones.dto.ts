import {IsString} from "class-validator";

export class PhoneDTO{
  @IsString()
  public phone:string
}
