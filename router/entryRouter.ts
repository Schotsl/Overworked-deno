import GeneralRouter from "../../Uberdeno/router/GeneralRouter.ts";

import EntryController from "../controller/EntryController.ts";

const entryController = new EntryController(
  "entry",
);

const projectRouter = new GeneralRouter(
  entryController,
  "entry",
);

export default projectRouter.router;
