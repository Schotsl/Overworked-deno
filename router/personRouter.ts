import GeneralRouter from "../../Uberdeno/router/GeneralRouter.ts";
import GeneralController from "../../Uberdeno/controller/GeneralController.ts";

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
