import GeneralRouter from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/router/GeneralRouter.ts";
import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";

import FriendsEntity from "../entity/FriendsEntity.ts";
import FriendsCollection from "../collection/FriendsCollection.ts";

const friendController = new GeneralController(
  "friend",
  FriendsEntity,
  FriendsCollection,
);

const friendRouter = new GeneralRouter(
  friendController,
  "friend",
);

export default friendRouter.router;
