import { UUIDColumn } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";

import MachineEntity from "../entity/MachineEntity.ts";
import MachineCollection from "../collection/MachineCollection.ts";

import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysqlClient.ts";
import GeneralMapper from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/mapper/GeneralMapper.ts";
import GeneralRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/GeneralRepository.ts";
import InterfaceRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/InterfaceRepository.ts";

export default class MachineRepository implements InterfaceRepository {
  private generalMapper: GeneralMapper;
  private generalRepository: GeneralRepository;

  constructor(
    name: string,
  ) {
    this.generalMapper = new GeneralMapper(MachineEntity, MachineCollection);
    this.generalRepository = new GeneralRepository(
      name,
      MachineEntity,
      MachineCollection,
    );
  }

  public async getCollection(
    offset: number,
    limit: number,
    persons: string[],
  ): Promise<MachineCollection> {
    const list = persons.map(() => "UNHEX(REPLACE(?, '-', ''))");
    const fetch =
      `SELECT HEX(uuid) as uuid, image, time, reps, sets, title, created, updated FROM machine INNER JOIN (SELECT DISTINCT schedule.machine FROM schedule WHERE schedule.person IN (${
        list.join(",")
      })) schedule ON machine.uuid = schedule.machine ORDER BY created DESC LIMIT ? OFFSET ?`;

    const count =
      `SELECT COUNT(uuid) AS total FROM machine INNER JOIN (SELECT DISTINCT schedule.machine FROM schedule WHERE schedule.person IN (${
        list.join(",")
      })) schedule ON machine.uuid = schedule.machine`;

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
    ) as MachineCollection;
  }

  public async removeObject(uuid: string): Promise<void> {
    return await this.generalRepository.removeObject(uuid);
  }

  public async addObject(object: MachineEntity): Promise<MachineEntity> {
    return await this.generalRepository.addObject(object) as MachineEntity;
  }

  public async updateObject(object: MachineEntity): Promise<MachineEntity> {
    return await this.generalRepository.updateObject(object) as MachineEntity;
  }

  public async getObject(uuid: UUIDColumn): Promise<MachineEntity> {
    return await this.generalRepository.getObject(uuid) as MachineEntity;
  }
}
