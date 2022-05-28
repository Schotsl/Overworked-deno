import PersonEntity from "../entity/PersonEntity.ts";
import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";

export default class PersonCollection extends BaseCollection {
  public persons: PersonEntity[] = [];
}
