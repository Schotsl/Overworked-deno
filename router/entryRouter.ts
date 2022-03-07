import GeneralRouter from "../../Uberdeno/router/GeneralRouter.ts";
import GeneralController from "../../Uberdeno/controller/GeneralController.ts";

import EntryEntity from "../entity/EntryEntity.ts";
import EntryCollection from "../collection/EntryCollection.ts";

const projectController = new GeneralController(
  "entry",
  EntryEntity,
  EntryCollection,
);

const projectRouter = new GeneralRouter(
  projectController,
  "entry",
);

export default projectRouter.router;
