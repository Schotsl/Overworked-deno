import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";

import MachineEntity from "../entity/MachineEntity.ts";
import MachineCollection from "../collection/MachineCollection.ts";

const projectController = new GeneralController(
  "machine",
  MachineEntity,
  MachineCollection,
);

const projectRouter = new GeneralRouter(
  projectController,
  "machine",
);

export default projectRouter.router;
