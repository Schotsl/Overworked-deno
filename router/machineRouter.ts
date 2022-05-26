import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import MachineController from "../controller/MachineController.ts";

const machineController = new MachineController("machine");
const machineRouter = new GeneralRouter(
  machineController,
  "machine",
);

export default machineRouter.router;
