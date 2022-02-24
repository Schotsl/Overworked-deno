import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";
import { ColumnInfo } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/types.ts";
import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { validateUUID } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/string.ts";
import { validateSmall } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/number.ts";
import { generateColumns, populateInstance, renderREST } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";

import ScheduleEntity from "../entity/ScheduleEntity.ts";
import ScheduleRepository from "../repository/ScheduleRepository.ts";
import InterfaceController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/InterfaceController.ts";

export default class ScheduleController implements InterfaceController {
  private scheduleColumns: ColumnInfo[] = [];
  private scheduleRepository: ScheduleRepository;

  constructor(
    mysqlClient: Client,
    name: string,
  ) {
    this.scheduleColumns = generateColumns(ScheduleEntity);
    this.scheduleRepository = new ScheduleRepository(
      mysqlClient,
      name,
    );
  }

  async getCollection(
    { response, request, state }: {
      response: Response;
      request: Request,
      state: State;
    },
  ) {
    const { offset, limit } = state;

    const day = parseInt(request.url.searchParams.get(`day`)!);
    const person = request.url.searchParams.get(`person`)!;

    validateUUID(person, `person`);
    validateSmall(day, `day`);

    const result = await this.scheduleRepository.getCollection(offset, limit, person, day);
    const parsed = renderREST(result);

    response.body = parsed;
  }

  async removeObject(
    { params, response }: {
      request: Request;
      params: { uuid: string };
      response: Response;
    },
  ) {
    const uuid = params.uuid;
    await this.scheduleRepository.removeObject(uuid);

    response.status = 204;
  }

  async addObject(
    { request, response }: { request: Request; response: Response },
  ) {
    const body = await request.body();
    const value = await body.value;
    const object = new ScheduleEntity();
    delete value.uuid;

    populateInstance(value, this.scheduleColumns, object);

    const result = await this.scheduleRepository.addObject(object);
    const parsed = renderREST(result);

    response.body = parsed;
  }
}