import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";

import PersonEntity from "../entity/PersonEntity.ts";
import PersonCollection from "../collection/PersonCollection.ts";

const projectController = new GeneralController(
  "person",
  PersonEntity,
  PersonCollection,
);

const projectRouter = new GeneralRouter(
  projectController,
  "person",
);

export default projectRouter.router;
