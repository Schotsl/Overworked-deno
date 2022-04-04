import { UUIDColumn, VarcharColumn } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  public image = new UUIDColumn("image", false);
  public first = new VarcharColumn("first");
  public last = new VarcharColumn("last");

  constructor() {
    super();
  }
}
