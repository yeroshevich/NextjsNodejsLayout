"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("@config");
const HttpException_1 = require("@exceptions/HttpException");
const database_1 = require("@database/database");
const util_1 = require("@utils/util");
class AuthService {
    constructor() {
        this.users = database_1.User;
    }
    findPhone(phone) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.users.findOne({
                where: { phoneNumber: phone }
            });
            return { user, message: user ? 'User is exist' : 'User not found' };
        });
    }
    signup(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userData))
                throw new HttpException_1.HttpException(400, "userData is empty");
            const findUser = yield this.users.findOne({
                where: { phoneNumber: userData.phoneNumber }, raw: true
            });
            if (findUser)
                throw new HttpException_1.HttpException(409, `This phone ${userData.phoneNumber} already exists`);
            const hashedPassword = yield (0, bcrypt_1.hash)(userData.password, 10);
            const role = yield database_1.Role.findOne({
                where: { title: "USER_ROLE" }
            });
            const createUserData = Object.assign(Object.assign({}, userData), { password: hashedPassword, role: role.title });
            yield this.users.create(Object.assign(Object.assign({}, createUserData), { roleId: role.idRole }));
            return createUserData;
        });
    }
    login(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userData))
                throw new HttpException_1.HttpException(400, "userData is empty");
            const findUser = yield this.users.findOne({
                where: { phoneNumber: userData.phoneNumber }, raw: true
            });
            if (!findUser)
                throw new HttpException_1.HttpException(409, `This phone ${userData.phoneNumber} was not found`);
            const isPasswordMatching = yield (0, bcrypt_1.compare)(userData.password, findUser.password);
            if (!isPasswordMatching)
                throw new HttpException_1.HttpException(409, "Password is not matching");
            const role = yield database_1.Role.findByPk(findUser.roleId);
            const tokenData = this.createToken(findUser);
            const cookie = this.createCookie(tokenData);
            return { cookie, findUser: { password: findUser.password, phoneNumber: findUser.phoneNumber, name: findUser.name, middleName: findUser.middleName, surname: findUser.surname, role: role.title } };
        });
    }
    loginByCode(phone) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(phone))
                throw new HttpException_1.HttpException(400, "userData is empty");
            const findUser = yield this.users.findOne({
                where: { phoneNumber: phone.phone }, raw: true
            });
            if (!findUser)
                throw new HttpException_1.HttpException(409, `This phone ${phone.phone} was not found`);
            const role = yield database_1.Role.findByPk(findUser.roleId);
            const tokenData = this.createToken(findUser);
            const cookie = this.createCookie(tokenData);
            return { cookie, findUser: { password: findUser.password, phoneNumber: findUser.phoneNumber, name: findUser.name, middleName: findUser.middleName, surname: findUser.surname, role: role.title } };
        });
    }
    logout(userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if ((0, util_1.isEmpty)(userData))
                throw new HttpException_1.HttpException(400, "userData is empty");
            const findUser = yield this.users.findOne({
                where: { phoneNumber: userData.phoneNumber }, raw: true
            });
            if (!findUser)
                throw new HttpException_1.HttpException(409, "User doesn't exist");
            return findUser;
        });
    }
    createToken(user) {
        const dataStoredInToken = { idUser: user.idUser };
        const secretKey = _config_1.SECRET_KEY;
        const expiresIn = 60 * 60 * 60 * 3;
        return { expiresIn, token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map