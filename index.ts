import Server from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Server.ts";

import { authenticationHandler } from "./middleware.ts";

import scheduleRouter from "./router/scheduleRouter.ts";
import locationRouter from "./router/locationRouter.ts";
import machineRouter from "./router/machineRouter.ts";
import friendsRouter from "./router/entryRouter.ts";
import personRouter from "./router/personRouter.ts";
import entryRouter from "./router/entryRouter.ts";

const server = new Server();

server.use(authenticationHandler);

server.add(scheduleRouter);
server.add(locationRouter);
server.add(machineRouter);
server.add(friendsRouter);
server.add(personRouter);
server.add(entryRouter);

server.listen();
