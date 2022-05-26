import { UUIDColumn } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";
import { MissingImplementation } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";

import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysqlClient.ts";
import GeneralMapper from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/mapper/GeneralMapper.ts";
import EntryEntity from "../entity/EntryEntity.ts";
import GeneralRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/GeneralRepository.ts";
import EntryCollection from "../collection/EntryCollection.ts";
import InterfaceRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/InterfaceRepository.ts";

export default class EntryRepository implements InterfaceRepository {
  private generalMapper: GeneralMapper;
  private generalRepository: GeneralRepository;

  constructor(
    name: string,
  ) {
    this.generalMapper = new GeneralMapper(EntryEntity, EntryCollection);
    this.generalRepository = new GeneralRepository(
      name,
      EntryEntity,
      EntryCollection,
    );
  }

  public async getCollection(
    offset: number,
    limit: number,
    persons: string[],
  ): Promise<EntryCollection> {
    const list = persons.map(() => "UNHEX(REPLACE(?, '-', ''))");
    const fetch = `SELECT HEX(uuid) AS uuid, HEX(person) AS person, HEX(machine) AS machine, HEX(location) AS location, speed, weight, upgrade, created, updated FROM entry WHERE person IN (${list.join(',')}) ORDER BY created DESC LIMIT ? OFFSET ?`;
    const count = `SELECT COUNT(uuid) AS total FROM entry WHERE person IN (${list.join(',')})`

    const promises = [
      mysqlClient.execute(fetch, [...persons, limit, offset]),
      mysqlClient.execute(count, [...persons]),
    ];

    const data = await Promise.all(promises);
    const rows = data[0].rows!;
    const total = data[1].rows![0].total;

    return this.generalMapper.mapCollection(
      rows,
      offset,
      limit,
      total,
    ) as EntryCollection;
  }

  public async removeObject(uuid: string): Promise<void> {
    return await this.generalRepository.removeObject(uuid);
  }

  public async addObject(object: EntryEntity): Promise<EntryEntity> {
    return await this.generalRepository.addObject(object) as EntryEntity;
  }

  public updateObject(): Promise<EntryEntity> {
    throw new MissingImplementation();
  }

  public async getObject(uuid: UUIDColumn): Promise<EntryEntity> {
    return await this.generalRepository.getObject(uuid) as EntryEntity;
  }
}
