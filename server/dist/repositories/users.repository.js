"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {sequelize} from "../database/database";
// import {DataTypes} from "sequelize";
// //import {RolesRepository} from "@/entities/roles.repository";
//
// // password: password
const userModel = [
    { id: 1, email: 'example1@email.com', password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC' },
    { id: 2, email: 'example2@email.com', password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC' },
    { id: 3, email: 'example3@email.com', password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC' },
    { id: 4, email: 'example4@email.com', password: '$2b$10$TBEfaCe1oo.2jfkBDWcj/usBj4oECsW2wOoDXpCa2IH9xqCpEK/hC' },
];
//
//
//  const UserRepository = sequelize.define('user',{
//   idUser:{
//     type:DataTypes.BIGINT,
//     primaryKey:true,
//     autoIncrement:true,
//     allowNull:false
//   },
//   name:{
//     type:DataTypes.STRING(100),
//     allowNull:false
//   },
//   surname:{
//     type:DataTypes.STRING(100),
//     allowNull:false
//   },
//   middleName:{
//     type:DataTypes.STRING(100),
//     allowNull:false
//   },
//   phoneNumber:{
//     type:DataTypes.STRING(150),
//     allowNull:false
//   },
//   password:{
//     type:DataTypes.STRING(150),
//     allowNull:false
//   }
// },{
//   freezeTableName:true,
//   timestamps:false
// })
//
// UserRepository.belongsTo(RolesRepository)
//
exports.default = userModel;
//# sourceMappingURL=users.repository.js.map
