import OverviewController from "../controller/OverviewController.ts";
import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";

const overviewController = new OverviewController();
const overviewRouter = new GeneralRouter(
  overviewController,
  "overview",
);

export default overviewRouter.router;
