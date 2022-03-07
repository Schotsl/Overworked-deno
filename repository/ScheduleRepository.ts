import { UUIDColumn } from "../../Uberdeno/other/Columns.ts";

import mysqlClient from "../../Uberdeno/services/mysqlClient.ts";
import GeneralMapper from "../../Uberdeno/mapper/GeneralMapper.ts";
import ScheduleEntity from "../entity/ScheduleEntity.ts";
import GeneralRepository from "../../Uberdeno/repository/GeneralRepository.ts";
import ScheduleCollection from "../collection/ScheduleCollection.ts";
import InterfaceRepository from "../../Uberdeno/repository/InterfaceRepository.ts";

export default class ScheduleRepository implements InterfaceRepository {
  private generalMapper: GeneralMapper;
  private generalRepository: GeneralRepository;

  constructor(
    name: string,
  ) {
    this.generalMapper = new GeneralMapper(ScheduleEntity, ScheduleCollection);
    this.generalRepository = new GeneralRepository(
      name,
      ScheduleEntity,
      ScheduleCollection,
    );
  }

  public async getCollection(
    offset: number,
    limit: number,
    person: string,
    day: number,
  ): Promise<ScheduleCollection> {
    const fetch =
      "SELECT HEX(uuid) AS uuid, `day`, HEX(person) AS person, HEX(machine) AS machine, created, updated FROM schedule WHERE person = UNHEX(REPLACE(?, '-', '')) AND `day` = ? ORDER BY created DESC LIMIT ? OFFSET ?";
    const count =
      "SELECT COUNT(uuid) AS total FROM schedule WHERE person = UNHEX(REPLACE(?, '-', '')) AND `day` = ?";

    const promises = [
      mysqlClient.execute(fetch, [person, day, limit, offset]),
      mysqlClient.execute(count, [person, day]),
    ];

    const data = await Promise.all(promises);
    const rows = data[0].rows!;
    const total = data[1].rows![0].total;

    return this.generalMapper.mapCollection(
      rows,
      offset,
      limit,
      total,
    ) as ScheduleCollection;
  }

  public async removeObject(uuid: string): Promise<void> {
    return await this.generalRepository.removeObject(uuid);
  }

  public async addObject(object: ScheduleEntity): Promise<ScheduleEntity> {
    return await this.generalRepository.addObject(object) as ScheduleEntity;
  }

  public async getObject(uuid: UUIDColumn): Promise<ScheduleEntity> {
    return await this.generalRepository.getObject(uuid) as ScheduleEntity;
  }
}
