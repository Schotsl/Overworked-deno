import { SmallColumn, UUIDColumn } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class ScheduleEntity extends BaseEntity {
  public day = new SmallColumn("day");
  public person = new UUIDColumn("person");
  public machine = new UUIDColumn("machine");

  constructor() {
    super();
  }
}
