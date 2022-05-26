import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";

import { renderREST } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";
import { validateUUID } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/string.ts";
import { validateSmall } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/number.ts";

import ScheduleEntity from "../entity/ScheduleEntity.ts";
import ScheduleCollection from "../collection/ScheduleCollection.ts";
import ScheduleRepository from "../repository/ScheduleRepository.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import InterfaceController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/InterfaceController.ts";

export default class ScheduleController implements InterfaceController {
  private generalController: GeneralController;
  private scheduleRepository: ScheduleRepository;

  constructor(
    name: string,
  ) {
    this.scheduleRepository = new ScheduleRepository(name);
    this.generalController = new GeneralController(
      name,
      ScheduleEntity,
      ScheduleCollection,
    );
  }

  async getCollection(
    { request, response, state }: {
      request: Request;
      response: Response;
      state: State;
    },
  ) {
    const { offset, limit } = state;

    const day = parseInt(request.url.searchParams.get(`day`)!);
    const person = request.url.searchParams.get(`person`)!;

    validateUUID(person, `person`);
    validateSmall(day, `day`);

    const result = await this.scheduleRepository.getCollection(
      offset,
      limit,
      person,
      day,
    );
    const parsed = renderREST(result);

    response.body = parsed;
  }

  getObject(
    { response, params }: {
      response: Response;
      params: { uuid: string };
    },
  ) {
    return this.generalController.getObject({ response, params });
  }

  removeObject(
    { response, params }: {
      response: Response;
      params: { uuid: string };
    },
  ) {
    return this.generalController.removeObject({ response, params });
  }

  addObject(
    { request, response }: { request: Request; response: Response },
  ) {
    return this.generalController.addObject({ request, response });
  }
}
