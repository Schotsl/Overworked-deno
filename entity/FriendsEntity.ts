import {
  BooleanColumn,
  UUIDColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class FriendsEntity extends BaseEntity {
  public origin = new UUIDColumn("origin");
  public target = new UUIDColumn("target");
  public approved = new BooleanColumn("approved");

  constructor() {
    super();
  }
}
