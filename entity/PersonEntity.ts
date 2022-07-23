import {
  UrlColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  public photo = new UrlColumn("photo");
  public name = new VarcharColumn("name");
  public email = new VarcharColumn("email");

  // The friend property isn't stored in the database
  public friend?: string;

  constructor() {
    super();
  }
}
