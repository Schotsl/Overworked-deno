import {
  UrlColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  public name = new VarcharColumn("name");
  public email = new VarcharColumn("email");
  
  public photo = new UrlColumn("photo");

  constructor() {
    super();
  }
}
