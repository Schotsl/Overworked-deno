import BaseCollection from "../../Uberdeno/collection/BaseCollection.ts";
import PersonEntity from "../entity/PersonEntity.ts";

export default class HistoryCollection extends BaseCollection {
  public persons: PersonEntity[] = [];
}
