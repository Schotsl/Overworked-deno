import { MissingImplementation } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";

import OverviewEntity from "../entity/OverviewEntity.ts";
import OverviewCollection from "../collection/OverviewCollection.ts";
import OverviewMapper from "../mapper/OverviewMapper.ts";

import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysqlClient.ts";
import InterfaceRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/InterfaceRepository.ts";

export default class OverviewRepository implements InterfaceRepository {
  private overviewMapper: OverviewMapper;

  constructor() {
    this.overviewMapper = new OverviewMapper();
  }

  public async getCollection(
    offset: number,
    limit: number,
    persons: string[],
    day: number,
  ): Promise<OverviewCollection> {
    const list = persons.map(() => "UNHEX(REPLACE(?, '-', ''))");
    const fetch =
      `SELECT HEX(machine.uuid) as uuid, machine.time, machine.reps, machine.sets, machine.title, machine.created, machine.updated FROM machine INNER JOIN schedule ON machine.uuid = schedule.machine WHERE schedule.person IN (${
        list.join(",")
      }) AND schedule.day = ? ORDER BY machine.created DESC LIMIT ? OFFSET ?`;

    const count =
      `SELECT COUNT(machine.uuid) AS total FROM machine INNER JOIN schedule ON machine.uuid = schedule.machine WHERE schedule.person IN (${
        list.join(",")
      }) AND schedule.day = ?`;

    const promises = [
      mysqlClient.execute(fetch, [...persons, day, limit, offset]),
      mysqlClient.execute(count, [...persons, day]),
    ];

    const data = await Promise.all(promises);
    const rows = data[0].rows!;
    const total = data[1].rows![0].total;

    return this.overviewMapper.mapCollection(
      rows,
      offset,
      limit,
      total,
    );
  }

  public removeObject(): Promise<void> {
    throw new MissingImplementation();
  }

  public addObject(): Promise<OverviewEntity> {
    throw new MissingImplementation();
  }

  public updateObject(): Promise<OverviewEntity> {
    throw new MissingImplementation();
  }

  public getObject(): Promise<OverviewEntity> {
    throw new MissingImplementation();
  }
}
