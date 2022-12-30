"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const _config_1 = require("@config");
const HttpException_1 = require("@exceptions/HttpException");
const database_1 = require("@database/database");
const authMiddleware = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = _config_1.SECRET_KEY;
            const verificationResponse = (yield (0, jsonwebtoken_1.verify)(Authorization, secretKey));
            const userId = verificationResponse.idUser;
            const findUser = database_1.User.findByPk(userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.HttpException(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
    }
});
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map