import Server from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Server.ts";

import { authorizationHandler } from "./middleware.ts";

import scheduleRouter from "./router/scheduleRouter.ts";
import overviewRouter from "./router/overviewRouter.ts";
import locationRouter from "./router/locationRouter.ts";
import machineRouter from "./router/machineRouter.ts";
import friendRouter from "./router/friendRouter.ts";
import personRouter from "./router/personRouter.ts";
import entryRouter from "./router/entryRouter.ts";

const server = new Server();

server.use(authorizationHandler);

server.add(scheduleRouter);
server.add(overviewRouter);
server.add(locationRouter);
server.add(machineRouter);
server.add(friendRouter);
server.add(personRouter);
server.add(entryRouter);

server.listen();

console.log("Ruh-roh, I'm running!");