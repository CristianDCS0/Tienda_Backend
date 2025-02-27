import express, {Application} from "express";
import morgan from "morgan";
import Routes from "./routes/Routes"

export class App {
    private app: Application;
    private port;

    constructor() {
        this.port = process.env.PORT || 5000;
        this.app = express();
        this.middlewares();
        this.settings();
        this.routes();
    }

    middlewares = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(morgan("dev"));
    };

    settings = () => {
        
    };

    routes = () => {
        this.app.use("/api", Routes.HelloRoute);
        this.app.use("/api/v1", Routes.PruebaRoute);
        this.app.use("/api", Routes.dbPrueba);
        this.app.get("/", (_req, res) => {
            res.send("API RESTful Node.js con Express");
        });
    };

    start = async () => {
        this.app.listen(this.port, () => {
            console.log(`Server on http://localhost:${this.port}`);
        });
    };
}