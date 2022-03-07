import {
  SmallColumn,
  UUIDColumn,
} from "../../Uberdeno/other/Columns.ts";

import BaseEntity from "../../Uberdeno/entity/BaseEntity.ts";

export default class ScheduleEntity extends BaseEntity {
  public day = new SmallColumn("day");
  public person = new UUIDColumn("person");
  public machine = new UUIDColumn("machine");

  constructor() {
    super();
  }
}
