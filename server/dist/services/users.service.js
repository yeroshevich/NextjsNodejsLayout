"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_1 = require("@database/database");
class UserService {
    constructor() {
        this.users = database_1.User;
    }
    updateUser(userId, userData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map