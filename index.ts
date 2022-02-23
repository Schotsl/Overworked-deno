import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { Application } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import {
  errorHandler,
  limitHandler,
  postHandler,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/middleware.ts";

import locationRouter from "./router/locationRouter.ts";
import machineRouter from "./router/machineRouter.ts";
import personRouter from "./router/personRouter.ts";

const application = new Application();

application.use(oakCors());

application.use(errorHandler);
application.use(limitHandler);
application.use(postHandler);

application.use(locationRouter.routes());
application.use(machineRouter.routes());
application.use(personRouter.routes());

application.use(locationRouter.allowedMethods());
application.use(machineRouter.allowedMethods());
application.use(personRouter.allowedMethods());

application.listen({ port: 8080 });
