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
const Routes_1 = __importDefault(require("./routes/Routes"));
class App {
    constructor() {
        this.middlewares = () => {
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: true }));
            this.app.use((0, morgan_1.default)("dev"));
        };
        this.settings = () => {
        };
        this.routes = () => {
            this.app.use("/api", Routes_1.default.HelloRoute);
            this.app.use("/api/v1", Routes_1.default.PruebaRoute);
            this.app.get("/", (_req, res) => {
                res.send("API RESTful Node.js con Express");
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
