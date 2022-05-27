import {
  UrlColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  public photo = new UrlColumn("photo");
  public email = new VarcharColumn("email");
  public name = new VarcharColumn("name");

  constructor() {
    super();
  }
}
