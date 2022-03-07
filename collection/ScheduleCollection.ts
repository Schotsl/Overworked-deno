import BaseCollection from "../../Uberdeno/collection/BaseCollection.ts";
import ScheduleEntity from "../entity/ScheduleEntity.ts";

export default class ScheduleCollection extends BaseCollection {
  public schedules: ScheduleEntity[] = [];
}
