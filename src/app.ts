import { envs } from "./config";
import { MongoConnect } from "./data";
import { Server } from "./presentation"
import { AppRouter } from "./presentation/routes";

(() => {
    main()
})()

async function main(){

    await MongoConnect.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.DB_NAME
    });

    const server = new Server({
        port: envs.PORT,
        routes: AppRouter.routes
    });
    server.start();
}