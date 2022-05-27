import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";

import LocationEntity from "../entity/LocationEntity.ts";
import LocationCollection from "../collection/LocationCollection.ts";

const locationController = new GeneralController(
  "location",
  LocationEntity,
  LocationCollection,
);

const locationRouter = new GeneralRouter(
  locationController,
  "location",
);

export default locationRouter.router;
