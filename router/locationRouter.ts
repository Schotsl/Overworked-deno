import GeneralRouter from "../../Uberdeno/router/GeneralRouter.ts";
import GeneralController from "../../Uberdeno/controller/GeneralController.ts";

import LocationEntity from "../entity/LocationEntity.ts";
import LocationCollection from "../collection/LocationCollection.ts";

const projectController = new GeneralController(
  "location",
  LocationEntity,
  LocationCollection,
);

const projectRouter = new GeneralRouter(
  projectController,
  "location"
);

export default projectRouter.router;
