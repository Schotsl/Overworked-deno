import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";

import EntryController from "../controller/EntryController.ts";

const entryController = new EntryController(
  "entry",
);

const projectRouter = new GeneralRouter(
  entryController,
  "entry",
);

export default projectRouter.router;
