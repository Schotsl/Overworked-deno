import BaseCollection from "../../Uberdeno/collection/BaseCollection.ts";
import LocationEntity from "../entity/LocationEntity.ts";

export default class LocationCollection extends BaseCollection {
  public locations: LocationEntity[] = [];
}
