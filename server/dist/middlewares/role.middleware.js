"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const HttpException_1 = require("@exceptions/HttpException");
const database_1 = require("@database/database");
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        try {
            const user = req.body;
            database_1.User.findOne({
                where: { idUser: user.idUser }
            }).then(loadedUser => {
                if (!loadedUser)
                    next(new HttpException_1.HttpException(409, 'User not found'));
                database_1.Role.findOne({
                    where: { idRole: req.body.roleId }
                }).then(role => {
                    if (!role)
                        next(new HttpException_1.HttpException(409, 'Permissions not found'));
                    if (roles.includes(role.title))
                        next();
                    else
                        next(new HttpException_1.HttpException(401, 'No access permissions'));
                });
            });
        }
        catch (error) {
            next(new HttpException_1.HttpException(401, 'Wrong getting roles'));
        }
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=role.middleware.js.map