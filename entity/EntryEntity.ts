import {
  BooleanColumn,
  SmallColumn,
  UUIDColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class LocationEntity extends BaseEntity {
  public person = new UUIDColumn("person");
  public machine = new UUIDColumn("machine");
  public location = new UUIDColumn("location");

  public time = new SmallColumn("time", false);
  public reps = new SmallColumn("reps", false);
  public sets = new SmallColumn("sets", false);
  public speed = new SmallColumn("speed", false);
  public weight = new SmallColumn("weight", false);
  public distance = new SmallColumn("distance", false);

  public upgrade = new BooleanColumn("upgrade", false, 0);

  constructor() {
    super();
  }
}
