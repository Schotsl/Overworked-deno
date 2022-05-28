import MachineEntity from "../entity/MachineEntity.ts";
import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";

export default class MachineCollection extends BaseCollection {
  public machines: MachineEntity[] = [];
}
