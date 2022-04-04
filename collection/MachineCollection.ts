import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";
import MachineEntity from "../entity/MachineEntity.ts";

export default class HistoryCollection extends BaseCollection {
  public machines: MachineEntity[] = [];
}
