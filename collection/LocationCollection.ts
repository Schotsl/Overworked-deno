import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";
import LocationEntity from "../entity/LocationEntity.ts";

export default class HistoryCollection extends BaseCollection {
  public locations: LocationEntity[] = [];
}
