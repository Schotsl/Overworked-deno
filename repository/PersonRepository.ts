import { UUIDColumn } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/other/Columns.ts";
import { MissingResource } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";
import { MissingImplementation } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";

import PersonEntity from "../entity/PersonEntity.ts";
import PersonCollection from "../collection/PersonCollection.ts";

import mysqlClient from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/services/mysqlClient.ts";
import GeneralMapper from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/mapper/GeneralMapper.ts";
import GeneralRepository from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/repository/GeneralRepository.ts";
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

  public async getCollectionByUsername(
    offset: number,
    limit: number,
    email: string,
    username: string,
  ): Promise<PersonCollection> {
    // Remove % from the query to prevent looking up everything
    username = username.replace('%', '');
    
    const fetch =
      `SELECT HEX(uuid) AS uuid, name, photo, email, created, updated, created, updated FROM person WHERE email LIKE CONCAT(?, '%') AND NOT email = ? AND uuid NOT IN (SELECT origin FROM friends INNER JOIN person ON friends.target = person.uuid WHERE person.email = ? UNION SELECT target FROM friends INNER JOIN person ON friends.origin = person.uuid WHERE person.email = ?) ORDER BY created DESC LIMIT ? OFFSET ?`;
    const count =
      `SELECT COUNT(uuid) AS total FROM person WHERE email LIKE CONCAT(?, '%') AND NOT email = ? AND uuid NOT IN (SELECT origin FROM friends INNER JOIN person ON friends.target = person.uuid WHERE person.email = ? UNION SELECT target FROM friends INNER JOIN person ON friends.origin = person.uuid WHERE person.email = ?)`;

    const promises = [
      mysqlClient.execute(fetch, [username, email, email, email, limit, offset]),
      mysqlClient.execute(count, [username, email, email, email]),
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

  public async getCollectionByFriends(
    offset: number,
    limit: number,
    email: string,
  ): Promise<PersonCollection> {
    // TODO: Refactor this too use state UUID
    const fetch =
      `SELECT HEX(uuid) AS uuid, name, photo, email, created, updated, created, updated FROM person WHERE uuid IN (SELECT origin FROM friends INNER JOIN person ON friends.target = person.uuid WHERE person.email = ? UNION SELECT target FROM friends INNER JOIN person ON friends.origin = person.uuid WHERE person.email = ?) ORDER BY created DESC LIMIT ? OFFSET ?`;
    const count =
      `SELECT COUNT(uuid) AS total FROM person WHERE uuid IN (SELECT origin FROM friends INNER JOIN person ON friends.target = person.uuid WHERE person.email = ? UNION SELECT target FROM friends INNER JOIN person ON friends.origin = person.uuid WHERE person.email = ?)`;

    const promises = [
      mysqlClient.execute(fetch, [email, email, limit, offset]),
      mysqlClient.execute(count, [email, email]),
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
