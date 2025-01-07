import { envs } from "./config";
import { Server } from "./presentation"
import { AppRouter } from "./presentation/routes";

(() => {
    main()
})()

function main(){

    const server = new Server({
        port: envs.PORT,
        routes: AppRouter.routes
    });
    server.start();
}