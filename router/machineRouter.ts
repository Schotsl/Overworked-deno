import GeneralRouter from "../../Uberdeno/router/GeneralRouter.ts";
import GeneralController from "../../Uberdeno/controller/GeneralController.ts";

import MachineEntity from "../entity/MachineEntity.ts";
import MachineCollection from "../collection/MachineCollection.ts";

const projectController = new GeneralController(
  "machine",
  MachineEntity,
  MachineCollection,
);

const projectRouter = new GeneralRouter(
  projectController,
  "machine"
);

export default projectRouter.router;
