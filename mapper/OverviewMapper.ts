import EntryRepository from "../repository/EntryRepository.ts";
import { ColumnInfo } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/types.ts";
import {
  generateColumns,
  populateInstance,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";

import EntryEntity from "../entity/EntryEntity.ts";
import OverviewEntity from "../entity/OverviewEntity.ts";
import OverviewCollection from "../collection/OverviewCollection.ts";

export default class OverviewMapper {
  private generalColumns: ColumnInfo[] = [];
  private entryRepository: EntryRepository;

  constructor() {
    this.generalColumns = generateColumns(OverviewEntity);
    this.entryRepository = new EntryRepository("entry");
  }

  // TODO: Allow interface to add any random mapper parameters

  public async mapObject(
    row: Record<string, never>,
    persons: string[],
  ): Promise<OverviewEntity> {
    const entity = new OverviewEntity();

    // Transform strings and numbers into the column wrappers
    populateInstance(row, this.generalColumns, entity);

    const uuidColumn = entity.uuid;
    const uuidString = uuidColumn.getValue();

    const promiseArray = await persons.map(async (person) => {
      try {
        return await this.entryRepository.getObjectByPerson(
          person,
          uuidString!,
        );
      } catch {
        return;
      }
    });

    const promiseResults = await Promise.all(promiseArray);
    const promiseFiltered = promiseResults.filter((result) =>
      result !== undefined
    );

    // Since we've filtered out the undefineds we can safely cast to EntryEntity
    entity.entries = promiseFiltered as EntryEntity[];

    return entity;
  }

  public async mapArray(
    rows: Record<string, never>[],
    persons: string[],
  ): Promise<OverviewEntity[]> {
    // Map the rows into an array of entities
    const overviewsPromise = rows.map((row) => this.mapObject(row, persons));
    const overviewsResult = await Promise.all(overviewsPromise);

    return overviewsResult;
  }

  public async mapCollection(
    rows: Record<string, never>[],
    offset: number,
    limit: number,
    total: number,
    persons: string[],
  ): Promise<OverviewCollection> {
    const collection = await this.mapArray(rows, persons);

    return {
      machines: collection,
      total,
      limit,
      offset,
    };
  }
}
