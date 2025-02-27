"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("./routes/Routes"));
class App {
    constructor() {
        this.middlewares = () => {
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, morgan_1.default)("dev"));
            this.app.use((0, cookie_parser_1.default)());
        };
        this.settings = () => {
            this.app.use((0, cors_1.default)({
                origin: '*',
                credentials: true,
            }));
        };
        this.routes = () => {
            this.app.use("/api/v1", Routes_1.default.AuthRoute);
            this.app.use("/api/v1", Routes_1.default.HelloRoute);
            this.app.get("/", (_req, res) => {
                res.send("API RESTful Node.js with Express for Tienda by Cristian Cobaxin");
            });
        };
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            this.app.listen(this.port, () => {
                console.log(`Server on http://localhost:${this.port}`);
            });
        });
        this.port = process.env.PORT || 5000;
        this.app = (0, express_1.default)();
        this.middlewares();
        this.settings();
        this.routes();
    }
}
exports.App = App;
