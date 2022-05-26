import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";

import FriendsEntity from "../entity/FriendsEntity.ts";
import FriendsCollection from "../collection/FriendsCollection.ts";

const projectController = new GeneralController(
  "friends",
  FriendsEntity,
  FriendsCollection,
);

const projectRouter = new GeneralRouter(
  projectController,
  "friends",
);

export default projectRouter.router;
