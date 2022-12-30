import {NextFunction, Request, Response} from "express";
import {HttpException} from "@exceptions/HttpException";
import {Role as RoleRepository, User as UserRepository} from "@database/database";
import {User} from "@interfaces/users.interface";

export const roleMiddleware =  (roles:Array<string>)=>{
  return (req:Request,res,next)=>{
    try{
      const user:User = req.body
       UserRepository.findOne({
          where:{idUser:user.idUser}
        }).then(loadedUser=>{
        if(!loadedUser) next(new HttpException(409, 'User not found'));
        RoleRepository.findOne({
          where:{idRole:req.body.roleId}
        }).then(role=>{

          if(!role) next(new HttpException(409, 'Permissions not found'));

          if(roles.includes(role.title))
            next()
          else
            next(new HttpException(401, 'No access permissions'));
        })
      })





    }  catch (error) {
      next(new HttpException(401, 'Wrong getting roles'));
    }
  }
}
