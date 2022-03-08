import { UUIDColumn } from "../../Uberdeno/other/Columns.ts";

import mysqlClient from "../../Uberdeno/services/mysqlClient.ts";
import GeneralMapper from "../../Uberdeno/mapper/GeneralMapper.ts";
import EntryEntity from "../entity/EntryEntity.ts";
import GeneralRepository from "../../Uberdeno/repository/GeneralRepository.ts";
import EntryCollection from "../collection/EntryCollection.ts";
import InterfaceRepository from "../../Uberdeno/repository/InterfaceRepository.ts";

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
    person: string,
    location: string,
  ): Promise<EntryCollection> {
    const fetch =
      "SELECT HEX(uuid) AS uuid, HEX(person) AS person, HEX(machine) AS machine, HEX(location) AS location, speed, weight, upgrade, created, updated FROM entry WHERE person = UNHEX(REPLACE(?, '-', '')) AND location = UNHEX(REPLACE(?, '-', '')) ORDER BY created DESC LIMIT ? OFFSET ?";
    const count =
      "SELECT COUNT(uuid) AS total FROM entry WHERE person = UNHEX(REPLACE(?, '-', '')) AND location = UNHEX(REPLACE(?, '-', ''))";

    const promises = [
      mysqlClient.execute(fetch, [person, location, limit, offset]),
      mysqlClient.execute(count, [person, location]),
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

  public async getObject(uuid: UUIDColumn): Promise<EntryEntity> {
    return await this.generalRepository.getObject(uuid) as EntryEntity;
  }
}
