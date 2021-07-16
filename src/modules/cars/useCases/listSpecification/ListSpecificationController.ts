import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export default class ListSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationUseCase = container.resolve(
      ListSpecificationUseCase
    );
    const specification = await listSpecificationUseCase.execute();
    return response.json(specification);
  }
}
