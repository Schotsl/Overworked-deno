import {
  Request,
  Response,
  State,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";

import { renderREST } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/helper.ts";
import { validateUUID } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/string.ts";
import { validateSmall } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/validation/number.ts";
import { MissingImplementation } from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/errors.ts";

import OverviewRepository from "../repository/OverviewRepository.ts";
import InterfaceController from "https://raw.githubusercontent.com/Schotsl/Uberdeno/main/controller/InterfaceController.ts";

export default class OverviewController implements InterfaceController {
  private entryRepository: OverviewRepository;

  constructor() {
    this.entryRepository = new OverviewRepository();
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
    const day = parseInt(params.get(`day`)!);

    validateUUID(persons, `person`);
    validateSmall(day, `day`);

    const result = await this.entryRepository.getCollection(
      offset,
      limit,
      persons!,
      day!,
    );

    const parsed = renderREST(result);

    response.body = parsed;
  }

  getObject() {
    throw new MissingImplementation();
  }

  updateObject() {
    throw new MissingImplementation();
  }

  removeObject() {
    throw new MissingImplementation();
  }

  addObject() {
    throw new MissingImplementation();
  }
}
