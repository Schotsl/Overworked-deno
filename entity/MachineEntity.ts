import {
  SmallColumn,
  UUIDColumn,
  VarcharColumn,
} from "../../Uberdeno/other/Columns.ts";

import BaseEntity from "../../Uberdeno/entity/BaseEntity.ts";

export default class MachineEntity extends BaseEntity {
  public image = new UUIDColumn("image", false);
  public title = new VarcharColumn("title");

  public time = new SmallColumn("time", false);
  public reps = new SmallColumn("reps", false);
  public sets = new SmallColumn("sets", false);

  constructor() {
    super();
  }
}
