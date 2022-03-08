import {
  BooleanColumn,
  SmallColumn,
  UUIDColumn,
} from "../../Uberdeno/other/Columns.ts";

import BaseEntity from "../../Uberdeno/entity/BaseEntity.ts";

export default class LocationEntity extends BaseEntity {
  public person = new UUIDColumn("person");
  public machine = new UUIDColumn("machine");
  public location = new UUIDColumn("location");

  public speed = new SmallColumn("speed", false);
  public weight = new SmallColumn("weight", false);
  public upgrade = new BooleanColumn("upgrade", false, false);

  constructor() {
    super();
  }
}
