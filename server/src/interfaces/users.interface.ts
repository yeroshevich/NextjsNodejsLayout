export interface User extends UserResponse{
  idUser?: number;
  password: string;
}
export interface UserResponse{
  phoneNumber:string,
  name:string,
  surname:string,
  middleName:string,
  password:string,
  role:string
}
