import {
  UrlColumn,
  VarcharColumn,
} from "../../Uberdeno/other/Columns.ts";

import BaseEntity from "../../Uberdeno/entity/BaseEntity.ts";

export default class PersonEntity extends BaseEntity {
  public name = new VarcharColumn("name");
  public email = new VarcharColumn("email");

  public photo = new UrlColumn("photo");

  // TODO: Make property 'friend' readonly

  // public friend = new UUIDColumn("friend", false);

  constructor() {
    super();
  }
}
