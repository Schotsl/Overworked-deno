import ScheduleEntity from "../entity/ScheduleEntity.ts";
import BaseCollection from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/collection/BaseCollection.ts";

export default class ScheduleCollection extends BaseCollection {
  public schedules: ScheduleEntity[] = [];
}
