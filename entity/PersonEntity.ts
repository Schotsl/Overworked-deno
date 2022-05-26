import {
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  // TODO: Add URL column

  public name = new VarcharColumn("name");
  public photo = new VarcharColumn("photo");
  public email = new VarcharColumn("email");

  constructor() {
    super();
  }
}
