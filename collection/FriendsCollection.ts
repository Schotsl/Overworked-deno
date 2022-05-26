import FriendsEntity from "../entity/FriendsEntity.ts";
import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";

export default class FriendsCollection extends BaseCollection {
  public friends: FriendsEntity[] = [];
}
