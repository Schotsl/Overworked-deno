import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";

import { renderREST } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";
import {
  validateUUID,
  validateString,
} from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/string.ts";

import PersonEntity from "../entity/PersonEntity.ts";
import PersonCollection from "../collection/PersonCollection.ts";
import PersonRepository from "../repository/PersonRepository.ts";

import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import InterfaceController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/InterfaceController.ts";

export default class PersonController implements InterfaceController {
  private generalController: GeneralController;
  private entryRepository: PersonRepository;

  constructor(
    name: string,
  ) {
    this.entryRepository = new PersonRepository(name);
    this.generalController = new GeneralController(
      name,
      PersonEntity,
      PersonCollection,
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
    const persons = params.get(`persons`)?.trim().split(",")!;

    validateUUID(persons, "persons");

    const result = await this.entryRepository.getCollection(
      offset,
      limit,
      persons,
    );
    const parsed = renderREST(result);

    response.body = parsed;
  }

  async getCollectionByUsername(
    { request, response, state }: {
      request: Request;
      response: Response;
      state: State;
    },
  ) {
    const { offset, limit, email } = state;

    const params = request.url.searchParams;

    let username = params.get(`username`);
    
    if (username) {
      username = username.replaceAll('%', '');
      username = username.trim();
    }
    
    validateString(username, "username");

    const result = await this.entryRepository.getCollectionByUsername(
      offset,
      limit,
      email,
      username!,
    );
    const parsed = renderREST(result);

    response.body = parsed;
  }

  async getCollectionByFriends(
    { response, state }: {
      response: Response;
      state: State;
    },
  ) {
    const { offset, limit, email } = state;

    const result = await this.entryRepository.getCollectionByFriends(
      offset,
      limit,
      email,
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

  async addObject(
    { request, response, state }: {
      request: Request;
      response: Response;
      state: State;
    },
  ) {
    const body = await request.body();
    const value = await body.value;

    // Prevent the user from hijacking someone's email address
    value.email = state.email;

    try {
      const person = await this.entryRepository.getObjectByEmail(value.email);
      const parsed = renderREST(person);

      response.body = parsed;
    } catch {
      return await this.generalController.addObject({
        request,
        response,
        value,
      });
    }
  }
}
