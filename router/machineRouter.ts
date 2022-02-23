import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import MachineEntity from "../entity/MachineEntity.ts";
import MachineCollection from "../collection/MachineCollection.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysql.ts";

const machineRouter = new Router({ prefix: "/v1/machine" });
const machineController = new GeneralController(
  mysqlClient,
  "machine",
  MachineEntity,
  MachineCollection,
);

const get = machineController.getCollection.bind(machineController);
const post = machineController.addObject.bind(machineController);
const remove = machineController.removeObject.bind(machineController);

machineRouter.get("/", get);
machineRouter.post("/", post);
machineRouter.delete("/:uuid", remove);

export default machineRouter;
