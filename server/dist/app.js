"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers");
const _config_1 = require("@config");
const error_middleware_1 = tslib_1.__importDefault(require("@middlewares/error.middleware"));
const logger_1 = require("@utils/logger");
//import {defaultMetadataStorage} from "class-transformer/types/storage";
class App {
    constructor(Controllers) {
        this.app = (0, express_1.default)();
        this.env = _config_1.NODE_ENV || 'development';
        this.port = _config_1.PORT || 8080;
        this.initializeMiddlewares();
        this.initializeRoutes(Controllers);
        //this.initializeSwagger(Controllers);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`=================================`);
            logger_1.logger.info(`======= ENV: ${this.env} =======`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(_config_1.LOG_FORMAT, { stream: logger_1.stream }));
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
    }
    initializeRoutes(controllers) {
        (0, routing_controllers_1.useExpressServer)(this.app, {
            cors: {
                origin: _config_1.ORIGIN,
                credentials: _config_1.CREDENTIALS,
            },
            controllers: controllers,
            defaultErrorHandler: false,
        });
    }
    //
    // private initializeSwagger(controllers: Function[]) {
    //   const schemas = validationMetadatasToSchemas({
    //     classTransformerMetadataStorage: defaultMetadataStorage,
    //     refPointerPrefix: '#/components/schemas/',
    //   });
    //
    //   const routingControllersOptions = {
    //     controllers: controllers,
    //   };
    //
    //   const storage = getMetadataArgsStorage();
    //   const spec = routingControllersToSpec(storage, routingControllersOptions, {
    //     components: {
    //       schemas,
    //       securitySchemes: {
    //         basicAuth: {
    //           scheme: 'basic',
    //           type: 'http',
    //         },
    //       },
    //     },
    //     info: {
    //       description: 'Generated with `routing-controllers-openapi`',
    //       title: 'A sample API',
    //       version: '1.0.0',
    //     },
    //   });
    //
    //   this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
    // }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map