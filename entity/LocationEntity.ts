import {
  UUIDColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class LocationEntity extends BaseEntity {
  public image = new UUIDColumn("image", false);
  public title = new VarcharColumn("title");

  constructor() {
    super();
  }
}
