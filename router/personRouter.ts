import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import PersonEntity from "../entity/PersonEntity.ts";
import PersonCollection from "../collection/PersonCollection.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysql.ts";

const personRouter = new Router({ prefix: "/v1/person" });
const personController = new GeneralController(
  mysqlClient,
  "person",
  PersonEntity,
  PersonCollection,
);

const get = personController.getCollection.bind(personController);
const post = personController.addObject.bind(personController);
const remove = personController.removeObject.bind(personController);

personRouter.get("/", get);
personRouter.post("/", post);
personRouter.delete("/:uuid", remove);

export default personRouter;
