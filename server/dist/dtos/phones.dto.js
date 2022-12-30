"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneDTO = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class PhoneDTO {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PhoneDTO.prototype, "phone", void 0);
exports.PhoneDTO = PhoneDTO;
//# sourceMappingURL=phones.dto.js.map