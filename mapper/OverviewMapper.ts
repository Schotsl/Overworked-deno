import InterfaceMapper from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/mapper/InterfaceMapper.ts";

import { ColumnInfo } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/types.ts";
import {
  generateColumns,
  populateInstance,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";

import OverviewEntity from "../entity/OverviewEntity.ts";
import OverviewCollection from "../collection/OverviewCollection.ts";

export default class OverviewMapper implements InterfaceMapper {
  private generalColumns: ColumnInfo[] = [];

  constructor() {
    this.generalColumns = generateColumns(OverviewEntity);
  }

  public mapObject(row: Record<string, never>): OverviewEntity {
    const entity = new OverviewEntity();

    // Transform strings and numbers into the column wrappers
    populateInstance(row, this.generalColumns, entity);

    return entity;
  }

  public mapArray(
    rows: Record<string, never>[],
  ): OverviewEntity[] {
    // Map the rows into an array of entities
    const entries = rows.map((row) => this.mapObject(row));
    return entries;
  }

  public mapCollection(
    rows: Record<string, never>[],
    offset: number,
    limit: number,
    total: number,
  ): OverviewCollection {
    const collection = this.mapArray(rows);

    return {
      machines: collection,
      total,
      limit,
      offset,
    };
  }
}
