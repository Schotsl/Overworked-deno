import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import PersonController from "../controller/PersonController.ts";

const personController = new PersonController("person");
const personRouter = new GeneralRouter(
  personController,
  "person",
);

export default personRouter.router;
