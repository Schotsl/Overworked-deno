import EntryEntity from "./EntryEntity.ts";
import {
  SmallColumn,
  VarcharColumn,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

interface Specific {
  person: string;
  entry: EntryEntity;
}

import BaseEntity from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/entity/BaseEntity.ts";

export default class OverviewEntity extends BaseEntity {
  public title = new VarcharColumn("title");
  public time = new SmallColumn("time", false);
  public reps = new SmallColumn("reps", false);
  public sets = new SmallColumn("sets", false);

  public specifics: Specific[] = [];

  constructor() {
    super();
  }
}
