import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";

import { renderREST } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";
import { validateUUID } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/string.ts";

import MachineEntity from "../entity/MachineEntity.ts";
import MachineCollection from "../collection/MachineCollection.ts";
import MachineRepository from "../repository/MachineRepository.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import InterfaceController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/InterfaceController.ts";

export default class MachineController implements InterfaceController {
  private generalController: GeneralController;
  private machineRepository: MachineRepository;

  constructor(
    name: string,
  ) {
    this.machineRepository = new MachineRepository(name);
    this.generalController = new GeneralController(
      name,
      MachineEntity,
      MachineCollection,
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

    const params = request.url.searchParams;
    const persons = params.get(`persons`)?.trim().split(",");

    validateUUID(persons, "persons");

    const result = await this.machineRepository.getCollection(
      offset,
      limit,
      persons!,
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
