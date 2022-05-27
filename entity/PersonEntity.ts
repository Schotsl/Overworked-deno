import {
  UrlColumn,
  UUIDColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

// TODO: Make property 'friend' readonly

// TODO: Rename friends to friend

export default class PersonEntity extends BaseEntity {
  public name = new VarcharColumn("name");
  public photo = new UrlColumn("photo");
  public email = new VarcharColumn("email");
  public friend = new UUIDColumn("friend", false);

  constructor() {
    super();
  }
}
