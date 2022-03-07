import { UUIDColumn, VarcharColumn } from "../../Uberdeno/other/Columns.ts";

import BaseEntity from "../../Uberdeno/entity/BaseEntity.ts";

export default class LocationEntity extends BaseEntity {
  public image = new UUIDColumn("image", false);
  public title = new VarcharColumn("title");

  constructor() {
    super();
  }
}
