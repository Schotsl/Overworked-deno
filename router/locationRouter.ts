import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";

import LocationEntity from "../entity/LocationEntity.ts";
import LocationCollection from "../collection/LocationCollection.ts";

const projectController = new GeneralController(
  "location",
  LocationEntity,
  LocationCollection,
);

const projectRouter = new GeneralRouter(
  projectController,
  "location",
);

export default projectRouter.router;
