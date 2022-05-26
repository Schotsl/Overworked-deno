import LocationEntity from "../entity/LocationEntity.ts";
import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";

export default class LocationCollection extends BaseCollection {
  public locations: LocationEntity[] = [];
}
