import { UUIDColumn, VarcharColumn } from "../../Uberdeno/other/Columns.ts";

import BaseEntity from "../../Uberdeno/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  public image = new UUIDColumn("image", false);
  public first = new VarcharColumn("first");
  public last = new VarcharColumn("last");

  constructor() {
    super();
  }
}
