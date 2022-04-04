import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";

import ScheduleController from "../controller/ScheduleController.ts";

const scheduleController = new ScheduleController(
  "schedule",
);

const projectRouter = new GeneralRouter(
  scheduleController,
  "schedule",
);

export default projectRouter.router;
