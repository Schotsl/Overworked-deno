import OverviewEntity from "../entity/OverviewEntity.ts";
import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";

export default class OverviewCollection extends BaseCollection {
  public machines: OverviewEntity[] = [];
}
