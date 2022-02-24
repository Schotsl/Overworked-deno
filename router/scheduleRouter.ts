import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import ScheduleEntity from "../entity/ScheduleEntity.ts";
import ScheduleCollection from "../collection/ScheduleCollection.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysql.ts";

const scheduleRouter = new Router({ prefix: "/v1/schedule" });
const scheduleController = new GeneralController(
  mysqlClient,
  "schedule",
  ScheduleEntity,
  ScheduleCollection,
);

const get = scheduleController.getCollection.bind(scheduleController);
const post = scheduleController.addObject.bind(scheduleController);
const remove = scheduleController.removeObject.bind(scheduleController);

scheduleRouter.get("/", get);
scheduleRouter.post("/", post);
scheduleRouter.delete("/:uuid", remove);

export default scheduleRouter;
