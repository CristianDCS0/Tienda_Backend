"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_route_1 = __importDefault(require("./hello.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
exports.default = { HelloRoute: hello_route_1.default, AuthRoute: auth_route_1.default };
