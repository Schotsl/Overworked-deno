import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import EntryEntity from "../entity/EntryEntity.ts";
import EntryCollection from "../collection/EntryCollection.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysql.ts";

const entryRouter = new Router({ prefix: "/v1/entry" });
const entryController = new GeneralController(
  mysqlClient,
  "entry",
  EntryEntity,
  EntryCollection,
);

const get = entryController.getCollection.bind(entryController);
const post = entryController.addObject.bind(entryController);
const remove = entryController.removeObject.bind(entryController);

entryRouter.get("/", get);
entryRouter.post("/", post);
entryRouter.delete("/:uuid", remove);

export default entryRouter;
