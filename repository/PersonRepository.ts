import { UUIDColumn } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";
import { MissingResource } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";
import { MissingImplementation } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";

import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysqlClient.ts";
import GeneralMapper from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/mapper/GeneralMapper.ts";
import PersonEntity from "../entity/PersonEntity.ts";
import GeneralRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/GeneralRepository.ts";
import PersonCollection from "../collection/PersonCollection.ts";
import InterfaceRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/InterfaceRepository.ts";

export default class PersonRepository implements InterfaceRepository {
  private generalName: string;
  private generalMapper: GeneralMapper;
  private generalRepository: GeneralRepository;

  constructor(
    name: string,
  ) {
    this.generalName = name;
    this.generalMapper = new GeneralMapper(PersonEntity, PersonCollection);
    this.generalRepository = new GeneralRepository(
      name,
      PersonEntity,
      PersonCollection,
    );
  }

  public async getCollection(
    offset: number,
    limit: number,
    persons: string[],
  ): Promise<PersonCollection> {
    const list = persons.map(() => "UNHEX(REPLACE(?, '-', ''))");
    const fetch =
      `SELECT HEX(uuid) AS uuid, name, photo, email, created, updated, created, updated FROM person WHERE uuid IN (${
        list.join(",")
      }) ORDER BY created DESC LIMIT ? OFFSET ?`;

    const count = `SELECT COUNT(uuid) AS total FROM person WHERE uuid IN (${
      list.join(",")
    })`;

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
    ) as PersonCollection;
  }

  public async removeObject(uuid: string): Promise<void> {
    return await this.generalRepository.removeObject(uuid);
  }

  public async addObject(object: PersonEntity): Promise<PersonEntity> {
    return await this.generalRepository.addObject(object) as PersonEntity;
  }

  public updateObject(): Promise<PersonEntity> {
    throw new MissingImplementation();
  }

  public async getObject(uuid: UUIDColumn): Promise<PersonEntity> {
    return await this.generalRepository.getObject(uuid) as PersonEntity;
  }

  public async getObjectByEmail(email: string): Promise<PersonEntity> {
    // TODO: Could probably use Querries fields here instead of hard coding row fields

    const query =
      "SELECT HEX(uuid) AS uuid, name, email, photo, created, updated, created, updated FROM person WHERE email = ?";
    const data = await mysqlClient.execute(query, [email]);

    if (typeof data.rows === "undefined" || data.rows.length === 0) {
      throw new MissingResource(this.generalName);
    }

    const row = data.rows![0];
    return this.generalMapper.mapObject(row) as PersonEntity;
  }
}
