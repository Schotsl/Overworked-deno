import {
  UUIDColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  public first = new VarcharColumn("first");
  public last = new VarcharColumn("last");

  public image = new UUIDColumn("image", false);

  constructor() {
    super();
  }
}
