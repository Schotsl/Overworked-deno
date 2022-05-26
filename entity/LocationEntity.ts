import {
  LatColumn,
  LngColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class LocationEntity extends BaseEntity {
  public title = new VarcharColumn("title");
  public lat = new LatColumn("lat");
  public lng = new LngColumn("lng");

  constructor() {
    super();
  }
}
