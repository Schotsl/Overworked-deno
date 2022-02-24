import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import ScheduleController from "../controller/ScheduleController.ts";

import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysql.ts";

const scheduleRouter = new Router({ prefix: "/v1/schedule" });
const scheduleController = new ScheduleController(
  mysqlClient,
  "schedule",
);

const get = scheduleController.getCollection.bind(scheduleController);
const post = scheduleController.addObject.bind(scheduleController);
const remove = scheduleController.removeObject.bind(scheduleController);

scheduleRouter.get("/", get);
scheduleRouter.post("/", post);
scheduleRouter.delete("/:uuid", remove);

export default scheduleRouter;
