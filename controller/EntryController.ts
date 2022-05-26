import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";

import { renderREST } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";
import { CustomError } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";
import { validateUUID } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/string.ts";
import { InvalidProperty } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";

import EntryEntity from "../entity/EntryEntity.ts";
import GeneralController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/GeneralController.ts";
import EntryCollection from "../collection/EntryCollection.ts";
import EntryRepository from "../repository/EntryRepository.ts";
import InterfaceController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/InterfaceController.ts";

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

    const params = request.url.searchParams;
    const persons = params.get(`persons`)?.split(',');

    // TODO: Implement validation of persons array

    // TODO: Check if all persons are friends

    const result = await this.entryRepository.getCollection(
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

  async addObject(
    { request, response }: { request: Request; response: Response },
  ) {
    const body = await request.body();
    const value = await body.value;

    if (
      typeof value.time === "undefined" && typeof value.weight === "undefined"
    ) {
      throw new CustomError(
        "Property 'time' or 'weight' should be provided",
        400,
      );
    }

    if (
      typeof value.time !== "undefined" && typeof value.weight !== "undefined"
    ) {
      throw new CustomError(
        "Property 'time' and 'weight' can't both be used in the same entry.",
        400,
      );
    }

    await this.generalController.addObject({ request, response, value });
  }
}
