import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";

import LocationEntity from "../entity/LocationEntity.ts";
import LocationCollection from "../collection/LocationCollection.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysql.ts";

const locationRouter = new Router({ prefix: "/v1/location" });
const locationController = new GeneralController(
  mysqlClient,
  "location",
  LocationEntity,
  LocationCollection,
);

const get = locationController.getCollection.bind(locationController);
const post = locationController.addObject.bind(locationController);
const remove = locationController.removeObject.bind(locationController);

locationRouter.get("/", get);
locationRouter.post("/", post);
locationRouter.delete("/:uuid", remove);

export default locationRouter;
