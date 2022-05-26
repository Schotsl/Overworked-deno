import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";
import FriendsEntity from "../entity/FriendsEntity.ts";

export default class FriendsCollection extends BaseCollection {
  public friends: FriendsEntity[] = [];
}
