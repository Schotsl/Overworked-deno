import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";

import { renderREST } from "../../Uberdeno/helper.ts";
import { validateUUID } from "../../Uberdeno/validation/string.ts";
import { validateSmall } from "../../Uberdeno/validation/number.ts";

import ScheduleEntity from "../entity/ScheduleEntity.ts";
import GeneralController from "../../Uberdeno/controller/GeneralController.ts";
import ScheduleCollection from "../collection/ScheduleCollection.ts";
import ScheduleRepository from "../repository/ScheduleRepository.ts";
import InterfaceController from "../../Uberdeno/controller/InterfaceController.ts";

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

  async removeObject(
    { response, params }: {
      response: Response;
      params: { uuid: string };
    },
  ) {
    return this.generalController.removeObject({ response, params });
  }

  async addObject(
    { request, response }: { request: Request; response: Response },
  ) {
    return this.generalController.addObject({ request, response });
  }
}
