import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";

import { renderREST } from "../../Uberdeno/helper.ts";
import { validateUUID } from "../../Uberdeno/validation/string.ts";

import EntryEntity from "../entity/EntryEntity.ts";
import GeneralController from "../../Uberdeno/controller/GeneralController.ts";
import EntryCollection from "../collection/EntryCollection.ts";
import EntryRepository from "../repository/EntryRepository.ts";
import InterfaceController from "../../Uberdeno/controller/InterfaceController.ts";

export default class EntryController implements InterfaceController {
  private generalController: GeneralController;
  private entryRepository: EntryRepository;

  constructor(
    name: string,
  ) {
    this.entryRepository = new EntryRepository(name);
    this.generalController = new GeneralController(
      name,
      EntryEntity,
      EntryCollection,
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

    const person = request.url.searchParams.get(`person`)!;
    const machine = request.url.searchParams.get(`machine`)!;
    const location = request.url.searchParams.get(`location`)!;

    validateUUID(person, `person`);
    validateUUID(machine, `machine`);
    validateUUID(location, `location`);

    const result = await this.entryRepository.getCollection(
      offset,
      limit,
      person,
      machine,
      location,
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
