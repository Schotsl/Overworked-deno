import BaseCollection from "../../Uberdeno/collection/BaseCollection.ts";
import MachineEntity from "../entity/MachineEntity.ts";

export default class HistoryCollection extends BaseCollection {
  public machines: MachineEntity[] = [];
}
